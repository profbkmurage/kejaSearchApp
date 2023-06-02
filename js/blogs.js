const articles =[
    {
        title:"Cabbage Production  1",
         name:"Brian Murage",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022" ,
         id: '1',
         imgUrl:'../img/cat-1.jpg'
    },
    {
        title:"Goat rearing can be easy 2",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022",
         id: '2'  
    },
    {
        title:"Land Reclamation 3",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022",
         id: '3'  
    },
    {
        title:"Automation in Agriculture 4",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022",
         id: '4'  
    },
    {
        title:"Maize in Low atittudes 5",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022" ,
         id: '5' 
    },
    {
        title:"AgroEconomics 6",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022",
         id: '6'  
    },
    {
        title:"Agriculture malpractices 7",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022"  ,
         id: '7'
    },
    {
        title:"Pigs and pigs Production 8",
         name:"mk yoh",
         content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis eum mollitia hic? Nostrum similique veniam, impedit iure rem, fugit ipsum harum itaque modi voluptatem non quisquam aut. Distinctio, magni.",
         date:"6TH April 2022",
         id: '8'  
    }

]

// const a=articles[0];
// console.log(a.content)    
let outputter = '';


for (let i = 0; i < (articles.length); i++) {
    let contentt= articles[i].content.slice(0,75);
        outputter += `
		<div class="article_card" id="article_card">
                <div class="article_nav bg-primary">
                <img src="${blog.img}" alt="blog post" class="blog-post-thumbnail">
                    <div class="title text-dark">${articles[i].title}</div>
                    <Small class="author text-dark">${articles[i].name}</Small>
                </div>
                 <div class="content">${contentt}</div>                 
                 <button class="bttn bg-dark text-white" id=${articles[i].id}>Read More</button>                
                 <div class="date bg-dark text-white  badge badge-secondary badge-pill badge-light”>">${articles[i].date}</div>
        </div>`;
        const container = document.querySelector('.article_container');
        container.innerHTML = outputter;       
}



for (let i = 0; i < articles.length; i++) {
    const btn = document.getElementById(articles[i].id)
    console.log(btn);
    btn.addEventListener('click', function(e) {
        alert(articles[i].title)
    })
}