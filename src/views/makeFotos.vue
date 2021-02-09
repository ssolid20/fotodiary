<template>
  <nav class="nav-wrapper white center flow-text black-text "> <p class="fa">Add Photo</p> </nav>

  <div class="container">
    <button @click='takePhoto'>takePhoto</button>
    <ul>
      <li v-for="x in photos" :key="x">
        <img :src="x.webviewPath" alt="image">
      </li>
    </ul>

  </div>

    <div class="container">
      <div class="fixed-action-btn ">
        <router-link to="/"  class="btn-floating waves-effect waves-light btn-large hoverable blue">
          <i class="large  material-icons">keyboard_backspace</i>
        </router-link>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
Capacitor, FilesystemDirectory } from "@capacitor/core";
import { ref, onMounted, watch } from 'vue';
import { isPlatform } from '@ionic/vue';
  
export default {
  name: 'Home',
  setup(){
      const PHOTO_STORAGE = "photos";

      const photos = ref([]);

      const { Camera,Filesystem,Storage } = Plugins;

      const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100
        });
        const fileName = new Date().getTime() + '.jpeg';
        /*const savedFileImage = {
          filepath: fileName,
          webviewPath: cameraPhoto.webPath
        };*/
        const savedFileImage = await savePicture(cameraPhoto, fileName);

        photos.value = [savedFileImage, ...photos.value];
        console.log(photos.value[0].filepath,'?????', photos.value[0].webviewPath)
      };



      const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });



        const savePicture = async (photo, fileName) => {
          let base64Data;
          // "hybrid" will detect mobile - iOS or Android
          if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
              path: photo.path
            });
            base64Data = file.data;
          } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath);
            const blob = await response.blob();
            base64Data = await convertBlobToBase64(blob) ;
          }
          const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
          });

          if (isPlatform('hybrid')) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
              filepath: savedFile.uri,
              webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
          }
          else {
            // Use webPath to display the new image instead of base64 since it's 
            // already loaded into memory
            return {
              filepath: fileName,
              webviewPath: photo.webPath
            };
          }
        };


        const cachePhotos = () => {
          Storage.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photos.value)
          });
        }

       watch(photos, cachePhotos);

        const loadSaved = async () => {
          const photoList = await Storage.get({ key: PHOTO_STORAGE });
          const photosInStorage = photoList.value ? JSON.parse(photoList.value) : [];

          // If running on the web...
          if (!isPlatform('hybrid')) {
            for (const photo of photosInStorage) {
              const file = await Filesystem.readFile({
                path: photo.filepath,
                directory: FilesystemDirectory.Data
              });
              // Web platform only: Load the photo as base64 data
              photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
          }

          photos.value = photosInStorage;
        }

      onMounted(loadSaved);

      return {PHOTO_STORAGE,cachePhotos,loadSaved,
        takePhoto,photos,savePicture,convertBlobToBase64
      };
  },


}
</script>
<style>
.fa{
font-family: 'Hammersmith One', sans-serif;
}
</style>