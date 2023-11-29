const wpRestApi = "https://unipop.no/bloggapi/wp-json/wp/v2/posts";
const postsContainer = document.getElementById("blogg-liste");
const loadMoreButton = document.getElementById("loadMoreButton");
const toTopButton = document.getElementById("toTopButton");

const perPage = 20;
let visiblePosts = 0;
let postJsonData = []; 

async function getFirstPosts() {
    try {
        postsContainer.innerHTML = "";

        const respons = await fetch(`${wpRestApi}?per_page=${perPage}`);
        const postJson = await respons.json();
        postJsonData = postJson; 

        console.log(postJson);

        for (let i = 0; i < postJson.length && visiblePosts < 10; i++) {
            const content = postJson[i].content.rendered;
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, 'text/html');
            const imageSrc = htmlDoc.querySelector('img') ? htmlDoc.querySelector('img').getAttribute('src') : '';

            const postDiv = document.createElement('div');
            postDiv.classList.add('blogg-item', 'show');

            postDiv.innerHTML = `<a href="spesificblog.html?id=${postJson[i].id}">
                                <h3>${postJson[i].title.rendered}</h3>
                                <img src="${imageSrc}"></a>`;

            postsContainer.appendChild(postDiv);
            visiblePosts++;
        }

        if (visiblePosts >= 10) {
            loadMoreButton.style.display = "block";
            loadMoreButton.addEventListener('click', loadMorePosts);

            toTopButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "none";
        }

    } catch (error) {
        console.log(error);
    }
}

function loadMorePosts() {
    if (postJsonData.length > visiblePosts) {
        for (let i = visiblePosts; i < visiblePosts + 10 && i < postJsonData.length; i++) {
            const content = postJsonData[i].content.rendered;
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, 'text/html');
            const imageSrc = htmlDoc.querySelector('img') ? htmlDoc.querySelector('img').getAttribute('src') : '';

            const postDiv = document.createElement('div');
            postDiv.classList.add('blogg-item', 'show');

            postDiv.innerHTML = `<a href="spesificblog.html?id=${postJsonData[i].id}">
                                <h3>${postJsonData[i].title.rendered}</h3>
                                <img src="${imageSrc}"></a>`;

            postsContainer.appendChild(postDiv);
            visiblePosts++;
        }
    }

    if (postJsonData.length <= visiblePosts) {
        loadMoreButton.style.display = "none";

        toTopButton.style.display = "block";
        toTopButton.addEventListener('click', () => window.scrollTo({
            top: 0,
            behavior: 'smooth',
          }))
    }
}

getFirstPosts();

