const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const bloggListName = document.querySelector(".spesificblog-list");

console.log(id);

const postContainer = document.querySelector(".blog-post-site");

const wpRestApiPosts = "https://unipop.no/bloggapi/wp-json/wp/v2/posts/" + id;



function createImageElement(url) {
    const img = document.createElement('img');
    img.src = url;
    img.classList.add('blog-image');
    return img;
  } 

  function showModal(url) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <span class="close">&times;</span>
      <img class="modal-content" src="${url}">
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

async function blogPost() {
    try {
        const blogResponse = await fetch(wpRestApiPosts);
        const blogJson = await blogResponse.json();

        postContainer.innerHTML += `<div class="spesific-page"><h2>${blogJson.title.rendered}</h2><div class="spesific-content">${blogJson.content.rendered}</div></div>`;

        bloggListName.innerHTML += `<li>${blogJson.title.rendered}</li>`;
        
        console.log(blogJson);
    } catch(error) {
        console.log(error);
    }

    const images = postContainer.querySelectorAll('img');
    images.forEach(image => {
      image.addEventListener('click', function() {
        const imageUrl = image.src;
        showModal(imageUrl);
      });
    });
}
blogPost();
