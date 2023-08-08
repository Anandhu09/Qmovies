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
    fetch(`${config.backendEndpoint}/playlist`, {
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
            if(window.location.pathname=="/frontend/index.html" || window.location.pathname=="/frontend/pages/profile/index.html"){
            alert("Login to add movie to playlist");
            // window.location.href="./pages/login/index.html"
            }
        }
        else if(data.status==201){
            alert("Added to Playlist Successfully");
            window.location.reload()
        }
        else{
            alert("Something Went Wrong")
        }
    })
    .catch(error => {
        console.log(error);
        alert("An error occurred while adding the movie to the playlist.");
    });
};

