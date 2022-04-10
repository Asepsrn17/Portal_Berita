const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

const API_KEY = "fab9b25774bb469eae3043fa2f425106";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=id&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";



window.onload = function() {
    newsType.innerHTML="";
    fetchHeadlines();
};

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="";
    fetchQueryNews();
});

newsQuery.addEventListener("input", e => {
    newsType.innerHTML="";
    fetchQueryNews();
});


const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5> No data found.</h5>"
        return;
    }
    displayNews();
}


const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        (response.status, response.statusText);
        newsdetails.innerHTML = "<h5>data not found.</h5>"
        return;
    }

    displayNews();
}


function displayNews() {
     newsdetails.innerHTML="";
        newsDataArr.forEach(news => {
        let date = news.publishedAt.split("T");

        let col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        let card = document.createElement('div');
        card.className = "p-2";

        let image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src=news.urlToImage;

        let cardBody = document.createElement('div');

        let newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        let discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        let link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Lihat Details";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);

    });

}