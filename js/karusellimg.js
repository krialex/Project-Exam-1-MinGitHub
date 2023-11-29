const wpRestApiPosts = "https://unipop.no/bloggapi/wp-json/wp/v2/posts";
const carouselContainer = document.querySelector(".carusell-images");

const perPage = 20;
let visiblePosts = 0;

async function getImages() {
    try {
        const mediaResponse = await fetch(`${wpRestApiPosts}?per_page=${perPage}`);
        const mediaJson = await mediaResponse.json();

        console.log(mediaJson);

        for (let i = 0; i < mediaJson.length; i++) {
            const content = mediaJson[i].content.rendered;
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, 'text/html');
            const imageSrc = htmlDoc.querySelector('img') ? htmlDoc.querySelector('img').getAttribute('src') : '';

            const postId = mediaJson[i].id;

            carouselContainer.innerHTML += `<a href="spesificblog.html?id=${postId}"><img src="${imageSrc}" class="karusell-img"></a>`;
        }
    } catch (error) {
        console.log(error);
    }
}

getImages();
