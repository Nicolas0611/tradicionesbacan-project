var Nusuario = document.querySelector('.Nuser')
const TTA=document.querySelector('#divcotiza')
const db = firebase.firestore();
var tabla = document.getElementById('datosTabla')

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
        llenartabla()
    } else {
        loginchec(user);
    }
})


//------------------------------------ Datos de la tabla---------------------------------

function llenartabla(){
    db.collection('Cotizaciones').onSnapshot((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            tabla.innerHTML += `
            <tr>
                    <td class="IDC"> ${doc.id} </td>
                    <td> ${doc.data().nombre} </td>
                    <td> ${doc.data().apellido} </td>
                    <td> ${doc.data().email} </td>
                    <td> ${doc.data().telefono} </td>
                    <td id="CanP${doc.id}"></td>
                    <td> ${doc.data().precio} </td>
                    <td id="F${doc.id}"></td>
            </tr>
            `;
            var fecha = new Date(doc.data().fecha.seconds * 1000);
            var fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
            var hora = new Date(doc.data().fecha.seconds * 1000);
            var horaFormateada = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
            var mensaje=fechaFormateada+" "+horaFormateada;
            var HoraT=document.getElementById("F"+doc.id);
            HoraT.innerHTML=`${mensaje}`;
            var productos = document.getElementById("CanP"+doc.id);
            for(x=0;x<doc.data().CantidadProductos.length;x++)
            {
                if(x!=doc.data().CantidadProductos.length-1)
                    productos.innerHTML +=`${doc.data().ProductosTotal[x]}: 
                    ${doc.data().CantidadProductos[x]}</br>`;
                else
                    productos.innerHTML +=`${doc.data().ProductosTotal[x]}: 
                    ${doc.data().CantidadProductos[x]}`;
            }
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