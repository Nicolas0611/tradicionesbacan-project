//------------------------------------ Datos de la tabla---------------------------------

var db = firebase.firestore();

var tabla = document.getElementById('producto')

db.collection('Productos').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        /*console.log(doc.id, '=>', doc.data());*/
        tabla.innerHTML += `
        <div class="contenido">
            <img class="imgproduct" src="${doc.data().Imagen}" alt="">
            <h4>${doc.data().Nombre}</h4> 
            <h5>$${doc.data().Precio}</h5> 
            <a class="detalles" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles</a>
            <button class="boton_agregar" data-id="${doc.id}">Agregar al carrito</button>
        </div>`
        ;
    })
});