import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload'

const firebaseConfig = {
   apiKey: "AIzaSyCqQFE14H0EBEWrZ8jCkVs8o7SMR3nw7dI",
   authDomain: "fe-upload-e44e3.firebaseapp.com",
   projectId: "fe-upload-e44e3",
   storageBucket: "fe-upload-e44e3.appspot.com",
   messagingSenderId: "491238994264",
   appId: "1:491238994264:web:9fb81d76c9ed8638d8f52d"
}
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

console.log(storage)


upload('#file', {
   multi: true,
   accept: ['.png', '.jpg', '.jpeg', '.gif'],
   onUpload(files, blocks) {
      files.forEach((file, index) => {
         const ref = storage.ref(`images/${file.name}`)
         const task = ref.put(file)

         task.on('state_changed', snapshot => {
            const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
            const block = blocks[index].querySelector('.preview-info-progress')
            block.textContent = percentage
            block.style.width = percentage
         }, error => {
            console.log(error)
         }, () => {
            task.snapshot.ref.getDownloadURL().then(url => {
               console.log('Download URL = ', url)
            })
         })
      })
   }
})