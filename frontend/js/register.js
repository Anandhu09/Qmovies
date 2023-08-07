
const form = document.getElementById('form_register');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if(!validation(username,password,confirmPassword))return
    const data = {
        name:name,
        email: username,
        password: password
    };
    fetch(`${config.backendEndpoint}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("HI")
            if (data.user) {
                alert("Registered Successfully");
                window.location.href="./login.html"
            }else{
                alert(data.message)
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.message)
            window.location.reload()
        });
});

const validation = (username, password, confirmPassword) => {
    if (!username.length) {
        alert("Username can't be empty")
        return false
    }
    if (password.length<=5) {
        document.querySelector(".helper-text").style.color="red"
        alert("Password must be at least 6 characters length");  
        return false
    }
    if (password !== confirmPassword) {
        alert("Passwords don't match")
        return false
    }
    return true
}
