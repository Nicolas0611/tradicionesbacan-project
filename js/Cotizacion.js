var db = firebase.firestore();
const FormCotizacion = document.querySelector('#FormularioCotizacion');

document.addEventListener('DOMContentLoaded', leerLocalStorageCotizacion());
const ContenedoresDeItems2 = document.getElementById('Carrito3');

FormCotizacion.addEventListener('submit', (e) => {
    e.preventDefault();
    var newCotizacion = {
        nombre: document.querySelector('.Nombre').value,
        apellido: document.querySelector('.Apellido').value,
        telefono: document.querySelector('.Telefono').value,
        email: document.querySelector('.Email').value,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    };
    FormCotizacion.reset();
    db.collection("Cotizaciones").doc().set(newCotizacion).then(() => {
        console.log(newCotizacion);
    }).catch((err) => {
        console.log("error");
    })
});

function leerLocalStorageCotizacion() {
    const elementsTitle2 = ContenedoresDeItems2.getElementsByClassName('ItemTitulo');
    for (let i = 0; i < elementsTitle2.length; i++) {
        if (elementsTitle2[i].innerText === itemTitulo) {
            const elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector('.ItemCantidad');
            elementQuantity.value++;
            ActualizarTotal();
            return;
        }
    }
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
        const FilaCarrito = document.createElement('div');
        const ContenidoCarrito = `
    <table class= "lista-carrito">
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>X</th>
            </tr>
        </thead>
        <tbody>
            <tr class ="ItemCarrito">
                <td>
                    <img src=${producto.itemImagen} width="100px">
                </td>
                <td class="ItemTitulo">${producto.itemTitulo}</td>
                <td class="ItemPrecio">${producto.itemPrecio}</td>
                <td><input class="ItemCantidad" type="number" min= "1" max="100" value="1"></td>
                <td><a href="javascript:void(0);" data-id="${producto.itemID}" class="borrar-producto">X</a></td>
            </tr>
        </tbody>
    </table>
    `;
        FilaCarrito.innerHTML = ContenidoCarrito;
        ContenedoresDeItems2.append(FilaCarrito);
        FilaCarrito.querySelector('.borrar-producto').addEventListener('click', removeShoppingCartItem);
        FilaCarrito.querySelector('.ItemCantidad').addEventListener('change', quantityChanged)
        ActualizarTotal();
    });
}
