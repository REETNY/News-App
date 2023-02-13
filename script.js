const NEWSURL = `http://api.mediastack.com/v1/news?countries=us&access_key=14783d0998c4fbd01f613303512cc120&categories=`;

let categories = [
    "general", "business", "entertainment", "health", "science", "sports", "technology" 
]


let dummyImg = `/imgs/dummy.png`

// getting dom elements
const categorySlideEl = document.querySelector(".cate-slider");
const newsBodyEl = document.querySelector(".newsBody");
const appContainer = document.querySelector(".app-container");
const fullNewsCont = document.querySelector(".fullNews");




// looping to show the categoies
categories.forEach( (cate) => {
    const div = document.createElement("div");
    div.innerText = `${cate}`;
    if(cate == "general"){
        div.classList.add("eachCate");
        div.classList.add("active");
    }else{
        div.classList.add("eachCate");
        div.classList.add("not-active")
    }
    div.addEventListener("click", (e) => {
        const current = [...document.querySelectorAll(".eachCate")];
        current.forEach( (cate) => {
            cate.classList.remove("active");
            cate.classList.add("not-active");
        })
        div.classList.add("active");
        const value = e.target.textContent;
        getNews(value);
    })
    categorySlideEl.appendChild(div);
})

// function to get news 
async function getNews(value){
    let serverResponse = await fetch(`${NEWSURL}${value}`);
    let resp = await serverResponse.json();
    let datas = resp.data;
    renderNews(datas);
    console.log(datas)
}


function renderNews(datas){
    const rawData = datas;
    newsBodyEl.innerHTML = ``;

    rawData.forEach( (data) => {
        const div = document.createElement("div");
        div.classList.add("eachNews");
        div.innerHTML = `

            <div class="newsImg">
                <img src="${data.image || dummyImg}" alt="">
            </div>

            <div class="newsTitle">${data.title}</div>

            <div class="newsContent">
                <span class="content">
                    ${data.description}
                </span>
            </div>
        `
        div.addEventListener("click", () => {
            showFullNews(data.title, data.url);
        })
        newsBodyEl.appendChild(div);
    })
}

// get general news on loading
window.onload = () => {
    getNews(categories[0]);
}


function showFullNews(title, url){
    hideAppCont();
    showNews();

    document.querySelector(".fullTitle").innerText = `${title}`;
    document.querySelector("#currNews").src = ``;
    document.querySelector("#currNews").src = `${url}`;

    document.querySelector("#backBtn").addEventListener("click", () => {
        showAppCont();
        hideNews();
    })
}

function hideAppCont(){
    appContainer.style.display = `none`;
}

function showAppCont(){
    appContainer.style.display = `block`;
}

function showNews(){
    fullNewsCont.style.display = `block`;
}

function hideNews(){
    fullNewsCont.style.display = `none`;
}