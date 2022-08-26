import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyBCGOy1qIP_DyfHgEW5s9SO2VgexvY3a0I',
  authDomain: 'clone-57226.firebaseapp.com',
  projectId: 'clone-57226',
  storageBucket: 'clone-57226.appspot.com',
  messagingSenderId: '816941034347',
  appId: '1:816941034347:web:2c7a9fd7a26a04d6a0fa2e',
  measurementId: 'G-N8C5MMZFGL',
}
// For Checking if it is not already Initialze
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
const db = app.firestore()
export { firebase }
export default db
