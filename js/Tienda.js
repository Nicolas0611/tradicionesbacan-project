//------------------------------------ Datos de la tabla---------------------------------

var db = firebase.firestore();

var tabla = document.getElementById('producto')
var titulomodal = document.querySelector('.modal-title')
var titulomodal2 = document.querySelector('.modal-title2')
var modalcontenidoI = document.querySelector('.modal-bodyI')
var modaldescripcion = document.querySelector('.descripcion')
var precio = document.querySelector('.precio')
var botonesdetalles = document.querySelector('.modal-footer')

window.addEventListener('DOMContentLoaded', (e) =>{
    db.collection('Productos').get().then((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            //console.log(doc.id, '=>', doc.data());
            tabla.innerHTML += `
            <div class="contenido">
                <img class="imgproduct" src="${doc.data().Imagen}" alt="">
                <h4 class="TituloP">${doc.data().Nombre}</h4> 
                <h5 class="Precio">Precio: $${doc.data().Precio}</h5> 
                <a class="detalles" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles</a>
                <button class="boton_agregar" data-id="${doc.id}">Agregar al carrito</button>
            </div>
            `;

            const btn_agregar = document.querySelectorAll('.boton_agregar')
                btn_agregar.forEach(btn =>{
                    btn.addEventListener('click', (e)=>{
                    console.log(e.target.dataset.id)
                    btn_agregar_clicked(e,e.target.dataset.id);
                })
            })

            const btn_detalles = document.querySelectorAll('.detalles')
                btn_detalles.forEach(btn =>{
                    btn.addEventListener('click', (e)=>{
                    console.log("detalles", e.target.dataset.id)
                    escribirmodal(e.target.dataset.id);
                })
            })

        })
    });
    
})