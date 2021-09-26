var db = firebase.firestore();
var tabla = document.getElementById('Carrito')
var visibilidad = 1;
function mostrarCarrito() {
    if (visibilidad == 1) {
        visibilidad = 2;
        document.getElementById('Carrito').style.display = 'block';
    }
    else if (visibilidad == 2) {
        visibilidad = 1;
        document.getElementById('Carrito').style.display = 'none';
    }
}

db.collection('Productos').get().then((snapshot) => {
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
});