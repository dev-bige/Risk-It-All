window.onload= function (){
    const loginForm = document.querySelector('#login-form');

    const btnLogin = document.getElementById("loginBtn");

    btnLogin.addEventListener('click', (e) => {
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then(cred => {
                window.open('../home/home.html','_self', false);
            })
            .catch(function(error) {
                alert("Invalid email and password combination! Please try again.")
            });
    });

}

