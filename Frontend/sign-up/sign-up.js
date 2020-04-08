window.onload= function (){
    const signUpForm = document.querySelector('#sign-in-form');

    const btnSignUp = document.getElementById("buttonSignUp");

    btnSignUp.addEventListener('click', (e) => {
        const userfirst = signUpForm['firstName'].value;
        const userlast = signUpForm['lastName'].value;
        const userUsername = signUpForm['username'].value;
        var userExp = document.getElementById('experience');
        const userVar = userExp.options[userExp.selectedIndex].text;
        const userEmail = signUpForm['email'].value;
        const userPassword = signUpForm['password'].value;
        const userPasswordTwo = signUpForm['re-enter'].value;

        auth.createUserWithEmailAndPassword(userEmail, userPassword)
            .then(cred => {
                if (this.validateSignUp(userfirst, userlast, userExp, userPassword, userPasswordTwo)) {
                    db.collection("users").add({
                        FirstName:  userfirst,
                        LastName: userlast,
                        Username: userUsername,
                        ExperienceLevel: userVar,
                        Email: userEmail,
                    })
                    .then(user => {
                        window.open('../home/home.html','_self', false);
                    });
                }
                else {
                    auth.stop();
                }
            })
            .catch(error => {
                this.setTimeout(function() {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            // alert('${userEmail} already in use, try to login or reset password');
                            $(".error").append('<p>' + userEmail + ' already in use, try to login or reset password' + '</p>');
                            auth.stop();
                        case 'auth/invalid-email':
                            $(".error").append('<p>' + userEmail + ' is not a valid email, try re-entering your email' + '</p>');
                            auth.stop();
                        case 'auth/weak-password':
                           $(".error").append('<p> The password you entered is too weak. </p>');
                           auth.stop();
                        default:
                            console.log(error);
                    }
                }, 0);
            });
    });
}

function validateSignUp(userfirst, userlast, userExp, password1, password2) {
    var firstNameValid = alphaNumCheck(userfirst);
    var lastNameValid = alphaNumCheck(userlast);
    var experienceValid = checkBlank(userExp);
    var passwordValid = passwordMatch(password1, password2);

    if (firstNameValid && lastNameValid && experienceValid && passwordValid) {
        return true;
    }
    else {
        if (!firstNameValid) {
            $(".error").append('<p>Your first name is invalid, may only contain letters or numbers</p>');
            return false;
        }
        else if (!lastNameValid) {
            $(".error").append('<p>Your last name is invalid, may only contain letters or numbers</p>');
            return false;
        }
        else if (!experienceValid) {
            $(".error").append('<p>You must select an option from the dropdown</p>');
            return false;
        }
        else if (!passwordValid) {
            $(".error").append('<p>Your passwords must match</p>');
            return false;
        }
    }
}

/*
    Checks the appropriate regex for if a character is only a number or a alphabet character
*/
function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

/*
    Checks if the option from the dropdown is blank or not by checking for empty space character
*/
function checkBlank(entry) {
    if (entry === "") {
        return false;
    }
    else {
        return true;
    }
}

function passwordMatch(entryOne, entryTwo) {
    return entryOne === entryTwo;
}
