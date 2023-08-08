const navbarItems = [
    { text: 'LOGIN', id: 'login' },
    { text: 'REGISTER', id: 'register' },
];
const navbarLogin = [
    { text: 'Back to Home', id: 'index' },
];
const profile = [

    { text: `${localStorage.getItem("name")}`, id: "usernameOne", },
    { text: 'My Playlists', id: 'playlist' },
    { text: 'Logout', id: 'logout' },
]

function createNavbar() {
    const navbarDiv = document.querySelector('.navbar');
    const navbarList = document.createElement('ul');
    navbarList.classList.add('navbar-items'); // Add a class to style navbar items
    if (window.location.pathname === "/frontend/index.html" || window.location.pathname === "/frontend/") {
        if (localStorage.getItem("username")) {
            profile.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.text;
                listItem.setAttribute('id', item.id);
                listItem.addEventListener('click', (e) => handleNavItemClick(e, listItem.id));
                navbarList.appendChild(listItem);
            });
        } else {
            navbarItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.text;
                listItem.setAttribute('id', item.id);
                listItem.addEventListener('click', (e) => handleNavItemClick(e, listItem.id));
                navbarList.appendChild(listItem);
            });
        }

    }
    else if (window.location.pathname === "/frontend/pages/login/index.html" || window.location.pathname === "/frontend/pages/register/index.html") {
        navbarLogin.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.text;
            listItem.setAttribute('id', item.id);
            listItem.addEventListener('click', (e) => handleNavItemClick(e, listItem.id));
            navbarList.appendChild(listItem);
        });
    }
    else if (window.location.pathname === "/frontend/pages/profile/index.html" || window.location.pathname === "/frontend/pages/playlist/index.html") {
        if (localStorage.getItem("username")) {
            profile.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.text;
                listItem.setAttribute('id', item.id);
                listItem.addEventListener('click', (e) => handleNavItemClick(e, listItem.id));
                navbarList.appendChild(listItem);
            });
        } else {
            navbarItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.text;
                listItem.setAttribute('id', item.id);
                listItem.addEventListener('click', (e) => handleNavItemClick(e, listItem.id));
                navbarList.appendChild(listItem);
            });

        }
    }
    navbarDiv.appendChild(navbarList);
}


const handleNavItemClick = (event, id) => {

    if (id === "register" && window.location.pathname == "/frontend/pages/profile/index.html") {
        window.location.href = "../register/index.html"
    }
    else if(id === "register" && window.location.pathname == "/frontend/pages/playlist/index.html"){
        window.location.href = "../register/index.html"
    }
    else if (id === "register") {
        window.location.href = "./pages/register/index.html"
    }

    if (id === "login" && window.location.pathname == "/frontend/pages/profile/index.html") {
        console.log("JEHE")
        window.location.href = "../login/index.html"
    }
    else if(id === "login" && window.location.pathname == "/frontend/pages/playlist/index.html"){
        window.location.href = "../login/index.html"
    }
    
    else if (id === "login") {
        window.location.href = "./pages/login/index.html"
    }

    if (id === "index") {
        window.location.href = "../../index.html"
    }
    if (id === "playlist") {
        window.location.href = "../playlist/index.html"
    }
    
     if( id == "logout" && window.location.pathname =="/frontend/pages/playlist/index.html"){
        window.localStorage.clear()
        window.location.href = "../../index.html"
     }
     else if (id === "logout") {
        window.localStorage.clear()
        window.location.href = "./index.html"
    }
}

document.addEventListener('DOMContentLoaded', createNavbar);


