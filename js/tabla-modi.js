var Nusuario = document.querySelector('.Nuser')
const TTA=document.querySelector(".TTA")
const db = firebase.firestore();
const storage = firebase.storage();
var tabla = document.getElementById('datosTabla')
var FormProduct=document.querySelector('.ModiProductos')
var Pexiste

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
db.collection('Productos').onSnapshot((snapshot) => {
    tabla.innerHTML = '';
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tabla.innerHTML += `
        <tr>
                <td> ${doc.id} </td>
                <td> ${doc.data().Nombre} </td>
                <td> ${doc.data().Precio} </td>
                <td id="accionT"> <button class="material-icons btnEditar" data-id="${doc.id}" title="Editar">mode_edit_outline</button>
                <button class="material-icons btnBorrar" data-id="${doc.id}" title="Borrar">delete_forever</button></td>
        </tr>
        `;

        const btn_edit = document.querySelectorAll('.btnEditar')
        btn_edit.forEach(btn =>{
        btn.addEventListener('click', (e)=>{
        console.log("Npro", e.target.getAttribute('data-id'))
        Modificarprod(e.target.dataset.id);
        })
    })

        const btn_borrar = document.querySelectorAll('.btnBorrar')
        btn_borrar.forEach(btn =>{
            btn.addEventListener('click', (e)=>{
            console.log("Npro", e.target.dataset.id)
            Borrarprod(e.target.dataset.id);
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

function verificarP(){
    db.collection('Productos').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            if(IdPro.value == doc.id)
                Pexiste=true;
        })
        if(Pexiste)
            alert("El id de producto ya existe")
        else{
            console.log("Guardar producto")
            agregarproducto();
        }
    })
}

FormProduct.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(AProcucto==true){
        Pexiste=false
        verificarP();
    }
    else
    {
        console.log("Actualizar producto ", id_producto)
        actualizarP();
        if(selecionarch.value=="")
        console.log("No arc")
    }
})