var db = firebase.firestore();
var Carrito = document.getElementById('Carrito');
var tabla = document.getElementById('producto');

const ContenedoresDeItems = document.querySelector('#Carrito2');
var button;
var item;
var itemTitulo;
var itemPrecio;
var itemImagen;
function btn_agregar_detalles(event) {
    button = event.target;
    item = button.closest('.modal-content');
    itemTitulo = item.querySelector('.modal-title2').textContent;
    itemPrecio = item.querySelector('.precio').textContent;
    itemImagen = item.querySelector('.imgproductD').src;
    addItemAlCarrito(itemTitulo, itemPrecio, itemImagen);
}
function btn_agregar_clicked(event) {
    button = event.target;
    item = button.closest('.contenido');
    itemTitulo = item.querySelector('.TituloP').textContent;
    itemPrecio = item.querySelector('.Precio').textContent;
    itemImagen = item.querySelector('.imgproduct').src;
    addItemAlCarrito(itemTitulo, itemPrecio, itemImagen);
}
function addItemAlCarrito(itemTitulo, itemPrecio, itemImagen) {
    const elementsTitle = ContenedoresDeItems.getElementsByClassName('ItemTitulo');
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitulo) {
            const elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector('.ItemCantidad');
            elementQuantity.value++;
            ActualizarTotal();
            return;
        }
    }
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
                    <img src=${itemImagen} width="100px">
                </td>
                <td class="ItemTitulo">${itemTitulo}</td>
                <td class="ItemPrecio">${itemPrecio}</td>
                <td><input class="ItemCantidad" type="number" min= "1" max="100" value="1"></td>
                <td><a href="javascript:void(0);" data-id= "" class="borrar-producto">X</a></td>
            </tr>
        </tbody>
    </table>
    `;
    var producto = {
        itemTitulo,
        itemPrecio,
        itemImagen
    }
    FilaCarrito.innerHTML = ContenidoCarrito;
    ContenedoresDeItems.append(FilaCarrito);
    this.guardarLocalStorage(producto);
    FilaCarrito.querySelector('.borrar-producto').addEventListener('click', removeShoppingCartItem);
    FilaCarrito.querySelector('.ItemCantidad').addEventListener('change', quantityChanged)
    ActualizarTotal();
}
function ActualizarTotal() {
    let Total = 0;
    const TotalCarrito = document.querySelector('.total-carrito');
    const ItemsCarrito = document.querySelectorAll('.ItemCarrito');

    ItemsCarrito.forEach(ItemCarrito => {
        const shoppingCartItemPriceElement = ItemCarrito.querySelector('.ItemPrecio');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('Precio: $', ''));
        const shoppingCartItemQuantityElement = ItemCarrito.querySelector('.ItemCantidad');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        Total = Total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    TotalCarrito.innerHTML = `Precio: $${Total.toFixed(2)}`
}
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.lista-carrito').remove();
    eliminarLocalStorage();
    ActualizarTotal();
}
function quantityChanged(event) {
    const input = event.target;
    if (input.value <= 0) {
        input.value = 1;
    }
    input.value <= 0 ? (input.value = 1) : null;
    ActualizarTotal();
}
function guardarLocalStorage(producto) {
    let productos;
    if (localStorage.getItem('productos') === null) {
        productos = [];
    }
    else {
        productos = JSON.parse(localStorage.getItem('productos'));
    }
    console.log(productos);
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
}
function eliminarLocalStorage(productoID) {
    let productos;
    if (localStorage.getItem('productos') === null) {
        productos = [];
    }
    else {
        productos = JSON.parse(localStorage.getItem('productos'));
    }
    productos.forEach(function (producto, index) {
        if (productos.id === productoID) {
            productos.splice(index, 1);
        }
    });
    localStorage.setItem('productos', JSON.stringify(productos));
}