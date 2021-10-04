//------------------------------------ Datos de la tabla---------------------------------

var db = firebase.firestore();

var tabla = document.getElementById('producto')



window.addEventListener('DOMContentLoaded', (e) =>{
    db.collection('Productos').get().then((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            tabla.innerHTML += `
            <div class="contenido">
                <img class="imgproduct" src="${doc.data().Imagen}" alt="">
                <h4>${doc.data().Nombre}</h4> 
                <h5>$${doc.data().Precio}</h5> 
                <a class="detalles">Detalles</a>
                <button class="boton_agregar" data-id="${doc.id}">Agregar al carrito</button>
            </div>
            `;

            const btn_agregar = document.querySelectorAll('.boton_agregar')
                btn_agregar.forEach(btn =>{
                    btn.addEventListener('click', (e)=>{
                    console.log(e.target.dataset.id)
                })
            })

        })
    });
})



