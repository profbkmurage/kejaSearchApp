import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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


window.addEventListener('load', async function() {
    const blogRef = collection(db, 'agroBiasharaBlogs')
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
    await addDoc(collection(db, 'agroBiasharaBlogs'), { email,phoneNumber, name, profession, img, titlle, content, createdAt })
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

onSnapshot(collection(db, 'agroBiasharaBlogs'), function (data) {
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