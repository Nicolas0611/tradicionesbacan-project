var db = firebase.firestore();
var Carrito = document.getElementById('Carrito');
var tabla = document.getElementById('producto');

db.collection('Productos').get().then((snapshot) => {
    const btn_agregar = document.querySelectorAll('.boton_agregar')
    btn_agregar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.dataset.id)
        })
    })
    btn_agregar.forEach(btn_agregar_carro => {
        btn_agregar_carro.addEventListener('click', btn_agregar_clicked);
    })
});
const ContenedoresDeItems = document.querySelector('#Carrito2');
function btn_agregar_clicked(event) {
    const button = event.target;
    const item = button.closest('.contenido');
    const itemTitulo = item.querySelector('.contenido h4').textContent;
    const itemPrecio = item.querySelector('.contenido h5').textContent;
    const itemImagen = item.querySelector('.contenido img').src;
    addItemAlCarrito(itemTitulo, itemPrecio, itemImagen);
}
function addItemAlCarrito(itemTitulo, itemPrecio, itemImagen) {

    const elementsTitle = ContenedoresDeItems.getElementsByClassName('ItemTitulo')
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
    <table class= "lista-carrito" class="u-full-width">
        <thead>
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
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
            <td><a href="javascript:void(0);" class="borrar-producto">X</a></td>
        </tr>
        </tbody>
    </table>
    `;
    FilaCarrito.innerHTML = ContenidoCarrito;
    ContenedoresDeItems.append(FilaCarrito);

    FilaCarrito.querySelector('.borrar-producto').addEventListener('click', removeShoppingCartItem);
    FilaCarrito.querySelector('.ItemCantidad').addEventListener('change',quantityChanged)
    ActualizarTotal();
}
function ActualizarTotal() {
    let Total = 0;
    const TotalCarrito = document.querySelector('.total-carrito');
    const ItemsCarrito = document.querySelectorAll('.ItemCarrito');


    ItemsCarrito.forEach(ItemCarrito => {
        const shoppingCartItemPriceElement = ItemCarrito.querySelector('.ItemPrecio');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));
        const shoppingCartItemQuantityElement = ItemCarrito.querySelector('.ItemCantidad');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        Total = Total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    TotalCarrito.innerHTML = `$${Total.toFixed(2)}`
}
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.lista-carrito').remove();
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