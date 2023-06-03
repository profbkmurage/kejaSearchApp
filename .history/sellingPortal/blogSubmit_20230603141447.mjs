import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAw0uxlFLIc7iaUPSDHw6KVJmjaML1Amzk",
    authDomain: "kejasearchapp.firebaseapp.com",
    projectId: "kejasearchapp",
    storageBucket: "kejasearchapp.appspot.com",
    messagingSenderId: "1018711007275",
    appId: "1:1018711007275:web:ec80a94353c90c3ed58a6e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


window.addEventListener('load', async function() {
    const blogRef = collection(db, 'kejasearchBlogs')
    const blogData = await getDocs(query(blogRef, orderBy('createdAt', 'desc')))
    const blogs = blogData.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })

    renderBlogs(blogs);
})

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

$('#blogSubmit').addEventListener('submit', async function(e){
    e.preventDefault()
    alert('submission in progress...');
    const name = $('#name').value
    const email = $('#email').value
    const phoneNumber = $('#phoneNumber').value
    const profession = $('#profession').value
    const img = $('#img').value
    const titlle = $('#titlle').value
    const content = $('#content').value
    const createdAt = new Date().toISOString();

    $('#blog').textContent = 'submission in progress...'
    // posting to db
    await addDoc(collection(db, 'kejasearchBlogs'), { email,phoneNumber, name, profession, img, titlle, content, createdAt })
    $('#blog').textContent = 'submit'
    alert('product created successfully')

    // clear the form
    $('#email').value = ''
    $('#phoneNumber').value = ''
    $('#name').value = ''
    $('#profession').value = ''
    $('#img').value = ''
    $('#titlle').value = ''
    $('#content').value = ''
    $('#createdAt').value = ''
})

$('input#img').addEventListener('change', function(e){
    $('img#preview').src = e.target.value
})

onSnapshot(collection(db, 'kejasearchBlogs'), function (data) {
    const blogs = data.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
    })

    renderBlogs(blogs);
})



function renderBlogs(blogs) {
    $('#blogData').innerHTML = blogs.map((blog) =>
    `           <div class="col-lg-4 col-md-6 col-sm-12 ">
                    <div class="card mb-5 shadow-sm">
                        <img style="height:30vh; " src="${blog.img}" class="img-fluid">
                        <div class="card-body">
                            <div class="card-title">
                                <h4>${blog.titlle}</h4> 
                                <div class="d-flex flex-row justify-content-space-between">
                                    <p style="margin-right: 1rem;">${blog.createdAt.substring(0, 10)}</p>        
                                    <p class="card-text">By ${blog.name}</p>
                                </div>                
                            </div>
                            <div class="card-text">
                                <p>${blog.content}</p>
                            </div>
                            <hr>
                            <button type="button" class="btn btn-primary btn-outline-success text-center" >Agro-Biashara Blogs</button>
                    </div>
                </div>
                </div>
    `).join('');
}