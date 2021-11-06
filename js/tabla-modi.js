var Nusuario = document.querySelector('.Nuser')
const TTA=document.querySelector(".TTA")
const db = firebase.firestore();
var tabla = document.getElementById('datosTabla')
var FormProduct=document.querySelector('.ModiProductos')

const loginchec = user =>{
    if(user){
        obtenerifuser()
        console.log(email, uid)
        Nusuario.innerHTML = '';
        Nusuario.innerHTML += `
            <h2>Hola ${user.email}</h2>
        `;
        TTA.hidden=false;
    }
    else{
    Nusuario.innerHTML = '';
    Nusuario.innerHTML += `
        <h1>No ha iniciado sesion</h1>
    `;
    TTA.hidden=true;
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        obtenerifuser();
        loginchec(user);
        llenartabla();
    } else {
        loginchec(user);
    }
})

//------------------------------------ Datos de la tabla---------------------------------

function llenartabla(){
db.collection('Productos').get().then((snapshot) => {
    tabla.innerHTML = '';
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tabla.innerHTML += `
        <tr>
                <td> ${doc.id} </td>
                <td> ${doc.data().Nombre} </td>
                <td> ${doc.data().Precio} </td>
                <td id="accionT"> <button class="btnEditar" data-id="${doc.id}" ><ion-icon name="create-outline"></ion-icon></button> 
                <button class="btnBorrar" data-id="${doc.id}""><ion-icon name="trash-outline"></ion-icon></button> </td>
        </tr>
        `;

        const btn_edit = document.querySelectorAll('.btnEditar')
        btn_edit.forEach(btn =>{
            btn.addEventListener('click', (e)=>{
            console.log("Npro", e.target.dataset.id)
            id_producto=e.target.dataset.id;
            Modificarprod(e.target.dataset.id);
            })
        })
    })
});
}

$(document).ready(function() {
    $("#Codigo").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#datosTabla tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

FormProduct.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(AProcucto==true){
        console.log("Guardar producto")
    }
    else
    {
        console.log("Actualizar producto ", id_producto)
    }
})