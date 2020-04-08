window.onload= function (){

    const forgotForm = document.querySelector('#forgot-password');
    const btnEmail = document.getElementById('send-email');
    // var authEmail = firebase.auth();

    btnEmail.addEventListener('click', (e) => {
        email = forgotForm['email'].value;

        auth.sendPasswordResetEmail(email).then(function() {
            window.open('email-sent.html','_self', false);
        })
        .catch(function(error) {
            console.log(error);
        }) 
    })
}