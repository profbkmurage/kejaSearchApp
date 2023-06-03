import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

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
const storage = getStorage();
const db = getFirestore(app)



window.addEventListener('load', async function() {
    const blogRef = collection(db, 'agroBiasharaProductSale')
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

// get image url first.
var fileText = document.querySelector('.fileText');
var uploadPercentage = document.querySelector('.uploadPercentage');
var progressBar = document.querySelector('.progress');
let percentageVal;
let fileName;
let fileItem;
const form = document.querySelector('#sellingForm');
form.style.display= "none";


document.querySelector('.fileUpload').addEventListener('change',function getfile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML= fileName;

});

document.querySelector('.uploadBtn').addEventListener('click', function uploadImage(e){   
   const storageRef = sref(storage, 'images/' + fileName);
   let uploadTask = uploadBytesResumable(storageRef, fileItem);

    uploadTask.on("state_changed", (snapshot)=>{
        percentageVal = ((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        uploadPercentage.innerHTML= percentageVal+" %";
        progressBar.style.Width= percentageVal;  
        if (percentageVal== 100) {
            form.style.display= "block";
            
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            alert('image uploaded successfully, now post the details of your product in the form attached');

            // upload the biodata of the product to db
            $('#sellingForm').addEventListener('submit', async function(e){
                e.preventDefault()
                
                const name = $('#name').value
                const email = $('#email').value
                const phoneNumber = $('#phoneNumber').value
                const productName = $('#productName').value
                const quantity = $('#productQuantity').value
                const price = $('#price').value
                const location = $('#location').value
                const createdAt = new Date().toISOString();
                
                $('#productSale').textContent = 'submission in progress...'
                // posting to db
                await addDoc(collection(db, 'agroBiasharaProductSale'), { email,phoneNumber, name, productName, quantity, price, location, createdAt, downloadURL })
                $('#productSale').textContent = 'submit'
                alert('product created successfully')
            
                // clear the form
                $('#email').value = ''
                $('#phoneNumber').value = ''
                $('#name').value = ''
                $('#productName').value = ''
                $('#preview').value = ''
                $('#quantity').value = ''
                $('#price').value = ''
                $('#location').value = ''
                $('#createdAt').value = ''
            })
            
            
            onSnapshot(collection(db, 'agroBiasharaProductSale'), function (data) {
                const blogs = data.docs.map((doc) => {
                    return {...doc.data(), id: doc.id}
                })
            
                renderBlogs(blogs);
            })
            // data upload end
            
        });

        }
    }),(error)=>{
        console.log('we have this error ', error);
    }
});



function renderBlogs(blogs) {
    $('#products').innerHTML = blogs.map((blog) => `
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
        <img  class="img-fluid w-100" style="height:30vh; !important;" src="${blog.downloadURL}" />
        </div>
        <div class="text-center py-4">
           <h6 class="text-decoration-none text-truncate" >Product: ${blog.productName} <br> Location: ${ blog.location} </h6>
            <h6 class=" ml-2"><a href="tel:${ blog.phoneNumber}">Contact: ${ blog.phoneNumber}</a></h6>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>@${ blog.price}/=</h5> <h6 class=" ml-2">${new Date(blog.createdAt).toDateString()}</h6>
            </div>
        </div>
        </div>
    </div>
    `).join('');
}

