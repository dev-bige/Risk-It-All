function logout() {
    const btnLogout = document.getElementById('logout');

    btnLogout.addEventListener('click', (e) => {
        firebase.auth().signOut()
        .then(function() {
            window.open('../login/login.html','_self', false);
        })
        .catch(function(error) {
            console.log(error);
        });
    });
}