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
    else if (window.location.pathname === "/frontend/login.html" || window.location.pathname === "/frontend/register.html") {
        navbarLogin.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.text;
            listItem.setAttribute('id', item.id);
            listItem.addEventListener('click', (e) => handleNavItemClick(e, listItem.id));
            navbarList.appendChild(listItem);
        });
    }
    else if (window.location.pathname === "/frontend/profile.html" || window.location.pathname === "/frontend/playlist.html") {
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

    if (id === "register") {
        window.location.href = "./register.html"
    }

    if (id === "login") {
        window.location.href = "./login.html"
    }
    if (id === "index") {
        window.location.href = "./index.html"
    }
    if (id === "playlist") {
        window.location.href = "./playlist.html"
    }
    if (id === "logout") {
        window.localStorage.clear()
        window.location.href = "./index.html"
    }
}

document.addEventListener('DOMContentLoaded', createNavbar);


