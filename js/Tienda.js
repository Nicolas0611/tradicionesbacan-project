//------------------------------------ Datos de la tabla---------------------------------

var db = firebase.firestore();

var tabla = document.getElementById('producto')

db.collection('Productos').get().then((snapshot) => {
    tabla.innerHTML = '';
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tabla.innerHTML += `
        <div class="contenido">
            <img class="imgproduct" src="${doc.data().Imagen}" alt="">
            <h4>${doc.data().Nombre}</h4> 
            <h5>$${doc.data().Precio}</h5> 
            <form class="agregar"><input type="number" id="cantidad" name="cantidad" min="1" placeholder="Cantidad">
            <a type="submit"><span class="material-icons">add_shopping_cart</span></a></form>
        </div>
        `
    })
});