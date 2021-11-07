var db = firebase.firestore();
var tabla = document.getElementById('producto');

const ContenedoresDeItems = document.getElementById('Carrito2');

var button;
var item;
var itemTitulo;
var itemPrecio;
var itemImagen;
cargarEventos();
function cargarEventos() {
    document.addEventListener('DOMContentLoaded', leerLocalStorage());
    console.log("Leer local storage");
}
function btn_agregar_detalles(event, ItemID) {
    button = event.target;
    item = button.closest('.modal-content');
    itemTitulo = item.querySelector('.modal-title2').textContent;
    itemPrecio = item.querySelector('.precio').textContent;
    itemImagen = item.querySelector('.imgproductD').src;
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    console.log(ItemID);
    productosLS.forEach(function (productoLS) {

        if (productoLS.itemID === ItemID) {
            productosLS = productoLS.itemID;
        }
    });

    if (productosLS === ItemID) {
        console.log("Ya esta egregado el producto");
    }

    else {
        addItemAlCarrito(itemTitulo, itemPrecio, itemImagen, ItemID);
    }
}
function btn_agregar_clicked(event, ItemID) {
    button = event.target;
    item = button.closest('.contenido');
    itemTitulo = item.querySelector('.TituloP').textContent;
    itemPrecio = item.querySelector('.Precio').textContent;
    itemImagen = item.querySelector('.imgproduct').src;
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    console.log(ItemID);
    productosLS.forEach(function (productoLS) {

        if (productoLS.itemID === ItemID) {
            productosLS = productoLS.itemID;
        }
    });

    if (productosLS === ItemID) {
        console.log("Ya esta egregado el producto");
    }
    else {
        addItemAlCarrito(itemTitulo, itemPrecio, itemImagen, ItemID);
    }
}
function addItemAlCarrito(itemTitulo, itemPrecio, itemImagen, itemID) {
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
                <td><a href="javascript:void(0);" data-id="${itemID}" class="borrar-producto">X</a></td>
            </tr>
        </tbody>
    </table>
    `;
    var producto = {
        itemTitulo,
        itemPrecio,
        itemImagen,
        itemID
    }
    FilaCarrito.innerHTML = ContenidoCarrito;
    ContenedoresDeItems.append(FilaCarrito);

    guardarProductosLocalStorage(producto);
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
function removeShoppingCartItem(e) {
    let producto, productoID;
    const buttonClicked = e.target;
    buttonClicked.closest('.lista-carrito').remove();
    if (e.target.classList.contains('borrar-producto')) {
        //e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoID);
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
function guardarProductosLocalStorage(producto) {
    let productos;
    //Toma valor de un arreglo con datos del LS
    productos = obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    productos.push(producto);
    //Agregamos al LS
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerProductosLocalStorage() {
    let productoLS;

    //Comprobar si hay algo en LS
    if (localStorage.getItem('productos') === null) {
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

function eliminarProductoLocalStorage(productoID) {
    let productosLS;
    //Obtenemos el arreglo de productos

    productosLS = obtenerProductosLocalStorage();
    //Comparar el id del producto borrado con LS
    productosLS.forEach(function (productoLS, index) {
        if (productoLS.itemID === productoID) {
            productosLS.splice(index, 1);
        }
    });

    //Añadimos el arreglo actual al LS
    localStorage.setItem('productos', JSON.stringify(productosLS));
}
function leerLocalStorage() {
    const elementsTitle = ContenedoresDeItems.getElementsByClassName('ItemTitulo');
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitulo) {
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
        ContenedoresDeItems.append(FilaCarrito);
        FilaCarrito.querySelector('.borrar-producto').addEventListener('click', removeShoppingCartItem);
        FilaCarrito.querySelector('.ItemCantidad').addEventListener('change', quantityChanged)
        ActualizarTotal();
    });
}