window.onload= function (){
    const signUpForm = document.querySelector('#sign-in-form');

    const btnSignUp = document.getElementById("buttonSignUp");

    btnSignUp.addEventListener('click', (e) => {
        const userfirst = signUpForm['firstName'].value;
        const userlast = signUpForm['last'].value;
        const userUsername = signUpForm['username'].value;
        var userExp = document.getElementById('experience');
        const userVar = userExp.options[userExp.selectedIndex].text;
        const userEmail = signUpForm['email'].value;
        const userPassword = signUpForm['password'].value;

        var user = {
            FirstName =  userfirst,
            LastName = userlast,
            Username = userUsername,
            ExperienceLevel = userVar,
            Email = userEmail,
            Password = userPassword
        }


        auth.createUserWithEmailAndPassword(userEmail, userPassword)
            .then(cred => {
                console.log(cred.user);
                window.open('../home/home.html','_self', false);
            });
    });

}