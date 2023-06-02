import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAsNHhT9-phSsWDrykUCwaGkiH-G7HPVE",
    authDomain: "agro-biashara2023.firebaseapp.com",
    projectId: "agro-biashara2023",
    storageBucket: "agro-biashara2023.appspot.com",
    messagingSenderId: "1072107286840",
    appId: "1:1072107286840:web:1aa3b885ba0a5a1b1e51cd"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)



/** 
 * @param {string} selector 
 * @returns {NodeListOf<Element> | Element}
 */
// function to selecting the html elements
function $(selector) {
    const elements = document.querySelectorAll(selector)
    if (elements.length === 1) {
        return elements[0]
    }
    return elements

}

$('#contactForm').addEventListener('submit', async function(e){
    e.preventDefault()
    alert('submission in progress...');
    const name = $('#name').value
    const email = $('#email').value
    const subject = $('#subject').value
    const message = $('#message').value
    const createdAt = new Date().toISOString();

    $('#sendMessageButton').textmessage = 'submission in progress...'
    // posting to db
    await addDoc(collection(db, 'agroBiasharaContacts'), { email, name, subject, message, createdAt })
    $('#sendMessageButton').textmessage = 'submit'
    alert('product created successfully')

    // clear the form
    $('#email').value = ''
    $('#name').value = ''
    $('#subject').value = ''
    $('#message').value = ''
})

