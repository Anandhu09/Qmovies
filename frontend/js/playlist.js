const fetchData = () => {
    fetch(`${config.backendEndpoint}/playlist/${localStorage.getItem("username")}`)
        .then(data => data.json()).then((data) => {
            if (data.publicPlaylists.length === 0) {
                document.getElementById("publicData").innerHTML = `<div style="padding-left:20px;color:red"><h2>No Public Playlist found</h2></div>`
            } else {
                data.publicPlaylists.forEach(element => {
                    addMovieToDOMPublic(element, element.Title, element.Director, element.Poster);
                });
            }

            if (localStorage.getItem("username")) {
                if (data.privatePlaylists.length === 0) {
                    document.getElementById("privateData").innerHTML = `<div style="color:red"><h2>No Private Playlist found</h2></div>`
                } else {
                    data.privatePlaylists.forEach(element => {
                        addMovieToDOMprivate(element, element.Title, element.Director, element.Poster)
                    });
                }
            }
        })
}

const addMovieToDOMPublic = (element, title, description, image) => {
    let Element = document.createElement("div");
    Element.className = "MovieList"
    Element.style.height = "400px"
    Element.style.margin = "10px"
    let innerHTML = `
        <div class="movie-card ">
            <img style="height:200px ;width:250px"src=${image}>
            <h2 class="movie-title">${title}</h2>
            <p class="movie-description">${description}</p>
            <button class="login addToPrivate" id=${element._id}>Add to Private Playlist</button> 
        </div>
    `;
    Element.innerHTML = innerHTML;
    document.getElementById("publicData").appendChild(Element);
};

const handlePrivate = (event) => {
    if (localStorage.getItem('username')) {
        fetch(`${config.backendEndpoint}/movePrivate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ Id: event.target.id })
        }).then((res) => res.json()).then((data) => {
            
                data.privatePlaylists.forEach(element => {
                    addMovieToDOMprivate(element, element.Title, element.Director, element.Poster)
                });
            
            
            if (data.publicPlaylists.length === 0) {
                document.getElementById("publicData").innerHTML = `<div style="padding-left:20px;color:red"><h2>No Movies found in Public Playlist</h2></div>`
            } else {
                data.publicPlaylists.forEach(element => {
                    addMovieToDOMPublic(element, element.Title, element.Director, element.Poster);
                });
            }
        })
    } else {
        alert("Login to add movies to private playlist")
    }
}

const handlePublic = (event) => {
    fetch(`${config.backendEndpoint}/movePublic`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ Id: event.target.id })
    }).then((res) => res.json()).then((data) => {
        // if(!data.publicPlaylists){}
        data.publicPlaylists.forEach(element => {
            addMovieToDOMPublic(element, element.Title, element.Director, element.Poster);
        })
        if (data.privatePlaylists.length === 0) {
            document.getElementById("privateData").innerHTML = `<div style="color:red"><h2>No Movies found in Private Playlist</h2></div>`
        } else {
            data.privatePlaylists.forEach(element => {
                addMovieToDOMprivate(element, element.Title, element.Director, element.Poster)
            });
        }
    })
}

const addMovieToDOMprivate = (element, title, description, image) => {
    let Element = document.createElement("div");
    Element.className = "MovieList"
    Element.style.height = "400px"
    Element.style.margin = "10px"
    let innerHTML = `
        <div class="movie-card ">
            <img style="height:200px; width:250px "src=${image}>
            <h2 class="movie-title">${title}</h2>
            <p class="movie-description">${description}</p>
            <button class="login removeFromPrivate" id=${element._id}>Add to Public Playlist</button> 
        </div>
    `;
    Element.innerHTML = innerHTML;
    document.getElementById("privateData").appendChild(Element);
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('username')) {
        fetchData();
    } else {
        const currentURL = window.location.href;
        const urlParams = new URLSearchParams(new URL(currentURL).search);
        const uQueryParam = urlParams.get('u');

        fetch(`${config.backendEndpoint}/playlist/public?u=${uQueryParam}`)
            .then((res) => res.json()) // Parse the response data as JSON
            .then((data) => {
                data.publicPlaylists.forEach(element => {
                    addMovieToDOMPublic(element, element.Title, element.Director, element.Poster)
                });

            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            });
    }
});


document.addEventListener('click', function (event) {
    if (event.target.matches('.addToPrivate')) {
        
        document.getElementById("privateData").innerHTML=""
        document.getElementById("publicData").innerHTML=""
        handlePrivate(event);
        // fetchData()
    }
    // window.location.reload()
});

document.addEventListener('click', function (event) {
    if (event.target.matches('.removeFromPrivate')) {

       
        document.getElementById("privateData").innerHTML=""
        document.getElementById("publicData").innerHTML=""
        handlePublic(event);
        // fetchData()

    }
    // window.location.reload()
});


const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', () => {
    const currentURL = `${config.frontendEndpoint}/playlist.html?u=${localStorage.getItem("username")}`;
    const tempInput = document.createElement('input');
    tempInput.value = currentURL;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Public Playlist Link copied to clipboard!');
})