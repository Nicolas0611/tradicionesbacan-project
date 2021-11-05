var Nusuario = document.querySelector('.Nuser')


const loginchec = user =>{
    if(user){
        obtenerifuser()
        console.log(email, uid)
        Nusuario.innerHTML = '';
        Nusuario.innerHTML += `
            <h2>Hola ${user.email}</h2>
        `;
        $('#card-container').show();
    }
    else{
    Nusuario.innerHTML = '';
    Nusuario.innerHTML += `
        <h1>No ha iniciado sesion</h1>
    `;
    $('#card-container').hide();
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        obtenerifuser();
        loginchec(user);
    } else {
        loginchec(user);
    }
})