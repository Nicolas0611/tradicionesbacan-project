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

//------------------------------------ Datos de la tabla---------------------------------

const db = firebase.firestore();

var tabla = document.getElementById('datosTabla')

db.collection('Productos').get().then((snapshot) => {
    tabla.innerHTML = '';
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tabla.innerHTML += `
         <tr>
                <td> ${doc.id} </td>
                <td> ${doc.data().Nombre} </td>
                <td> ${doc.data().Precio} </td>
                <td id="accionT"> <button class="btnEditar" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#ModalAgre"><ion-icon name="create-outline"></ion-icon></button> 
                <button class="btnBorrar" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#ModalAgre"><ion-icon name="trash-outline"></ion-icon></button> </td>
         </tr>
        `;

        const btn_edit = document.querySelectorAll('.btnEditar')
        btn_edit.forEach(btn =>{
            btn.addEventListener('click', (e)=>{
            console.log("detalles", e.target.dataset.id)
            escribirmodal(e.target.dataset.id);
        })
    })

    })
});

$(document).ready(function() {
    $("#Codigo").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#datosTabla tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

var imPro = document.querySelector('#idimagen')
var btiPro = document.querySelector('#btnimagen')
var IdPro = document.querySelector('#iDmodal')
var NomPro = document.querySelector('#nombremodal')
var PrePro = document.querySelector('#presmodal')

function escribirmodal(id_producto) {
    console.log("id producto", id_producto);
    db.collection("Productos").doc(id_producto).get().then((doc) => {
        imPro.src=doc.data().Imagen;
        btiPro.required=false;
        IdPro.value = doc.id;
        IdPro.disabled= true;
        NomPro.value=doc.data().Nombre;
        PrePro.value=doc.data().Precio;
        });
}