var db = firebase.firestore();
var tabla = document.getElementById('Carrito');
var visibilidad = 1;
const Carrito = document.getElementById('carritoFinal');
const Prods = db.collection('Productos').get();
const listaProd = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBoton = document.getElementById('vaciar-carrito');
cargarEventListeners();

function cargarEventListeners(){
    Prods.addEventListener('click',comprarProducto);
    Carrito.addEventListener('click',eliminarProducto);
    vaciarCarritoBoton.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLaoded', leerLocalStorage);
}
function comprarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}
function leerDatosProducto(producto){
    const infoProducto={
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('h5').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoProducto);
}
function insertarCarrito(producto){
    const row = document.createElement('tr')
    row.innerHTML=`
        <td>
            <img src"${producto.imagen}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${producto.id}">X</a>
        </td>
    `;
    listaProd.appendChild(row);
    guardarProductosLocalStorage(producto);
}
function eliminarProducto(e){
    e.preventDefault();
    let producto,
    prductoId;
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        producto= e.target.parentElement.parentElement;
        productoId
    }
}
/*function mostrarCarrito() {
    if (visibilidad == 1) {
        visibilidad = 2;
        document.getElementById('Carrito').style.display = 'block';
    }
    else if (visibilidad == 2) {
        visibilidad = 1;
        document.getElementById('Carrito').style.display = 'none';
    }
}*/


/*db.collection('Productos').get().then((snapshot) => {
    //tabla.innerHTML = '';
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tabla.innerHTML += `
        <div class="FotoCarrito">
            <img src="${doc.data().Imagen}" alt=""/>
            <h5> ${doc.data().Nombre}<br>$ ${doc.data().Precio}</h5>
            <div class="Contador">
                <form class="agregar"><input type="number" id="cantidad" name="cantidad" min="1" placeholder="Cantidad">
            </div>
            <h5>Total:<br>$100000</h5>
        </div>
        `
    })
});*/