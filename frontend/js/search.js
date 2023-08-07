const input = document.querySelector('.hero-input');
let debounceTimer;
let movieData

input.addEventListener('input', () => {
    document.getElementById("data").innerHTML = `<div><b>LOADING . . .</b></div>`;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        if (input.value) {
            fetch(`${config.searchAPI}&t=${input.value}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.Response === "False") {
                        document.getElementById("data").innerHTML = "";
                        document.getElementById("data").innerHTML = `<div>No search result found</div>`;
                    } else {
                        document.getElementById("data").innerHTML = "";
                        movieData = data
                        addMovieToDOM(data.Title, data.Director, data.Poster);
                    }
                });
        } else {
            document.getElementById("data").innerHTML = ``;
        }
    }, 700);
});

const addMovieToDOM = (title, description, image) => {

    let Element = document.createElement("div");
    let innerHTML = `
        <div class="movie-card">
            <img src=${image}>
            <h2 class="movie-title">${title}</h2>
            <p class="movie-description">${description}</p>
            <button onclick="addToPlaylist()" id="addPlaylist"><b>ADD TO PLAYLIST</b></button> 
        </div>
    `;
    Element.innerHTML = innerHTML;
    document.getElementById("data").appendChild(Element);
};

const addToPlaylist = async () => {
    fetch("http://localhost:8082/v1/auth/playlist", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(movieData)
    })
    .then(data => {
        if ( data.status == 400) {
            alert("Movie already in Playlist");
 
        } 
        else if(data.status == 401){

            alert("Login to add movie to playlist");
            window.location.href="/frontend/login.html"
        }
        else {
            alert("Added to Playlist Successfully");
            window.location.reload()
        }
    })
    .catch(error => {
        console.log(error);
        alert("An error occurred while adding the movie to the playlist.");
    });
};
