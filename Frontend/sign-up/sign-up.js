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

        if (this.validateSignUp(userfirst, userlast, userVar, userPassword, userPasswordTwo)) {
            auth.createUserWithEmailAndPassword(userEmail, userPassword)
                .then(cred => {
                    
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
                })
                .catch(error => {
                    this.setTimeout(function() {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                $(".Perror").text(userEmail + ' already in use, try to login or reset password');
                                break;
                            case 'auth/invalid-email':
                                $(".Perror").text(userEmail + ' is not a valid email, try re-entering your email');
                                break;
                            case 'auth/weak-password':
                                $(".Perror").text('The password you entered is too weak');
                                break;
                            default:
                                console.log(error);
                        }
                    }, 0);
                });
        }
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
            $(".Perror").text('Your first name is invalid, may only contain letters or numbers');
            return false;
        }
        else if (!lastNameValid) {
            $(".Perror").text('Your last name is invalid, may only contain letters or numbers');
            return false;
        }
        else if (!experienceValid) {
            $(".Perror").text('You must select an option from the dropdown');
            return false;
        }
        else if (!passwordValid) {
            $(".Perror").text('Your passwords must match');
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
