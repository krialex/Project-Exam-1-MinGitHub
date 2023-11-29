


function sendComments() {
    const commentName = document.getElementById("CommentName");
    const commentNameError = document.getElementById("commentName-error");
    const commentEmail = document.getElementById("commentEmail");
    const commentEmailError = document.getElementById("commentEmail-error");
    const commentMessage = document.getElementById("commentMessage");
    const commentMessageError = document.getElementById("commentMessage-error");

    const data = {
        author_name: commentName,
        author_email: commentEmail,
        content: commentMessage
    };

    const url = 'https://unipop.no/bloggapi/wp-json/wp/v2/comments';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Typpe': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('kommentar er lagt til', data);
    })
    .catch((error) => {
        console.log('feil:', error);

        commentNameError.style.display = 'block';
        commentEmailError.style.display = 'block';
        commentMessageError.style.display = 'block';
    })
}

