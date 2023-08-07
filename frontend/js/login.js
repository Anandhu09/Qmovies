const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        email: username,
        password: password
    };
    fetch(`${config.backendEndpoint}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.message){
            alert(data.message)
        }
        else{
        persistLogin(data.user.name, data.tokens.access.token , data.user.email)
        window.location.href ="profile.html"
        }
    })
    .catch(error => {
        alert(`${error.statusCode}`)
    });
});
const persistLogin = (name,token, username) => {
    localStorage.setItem("name", name);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };
