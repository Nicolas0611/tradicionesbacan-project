function escribirmodal(id_producto) {
    console.log("id producto", id_producto);
    titulomodal.innerHTML = '';
    modalcontenidoI.innerHTML = '';
    modaldescripcion.innerHTML = '';
    precio.innerHTML = '';
    db.collection("Productos").doc(id_producto).get().then((doc) => {
        titulomodal.innerHTML = `
        ${doc.id}: ${doc.data().Nombre}
        `;
        modalcontenidoI.innerHTML = `
            <img class="imgproductD" src="${doc.data().Imagen}" alt="">
        `;

        precio.innerHTML = `
            <b>Precio: ${doc.data().Precio}</b>
        `

        botonesdetalles.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="boton_agregar btn btn-primary" data-id="${doc.id}" data-bs-dismiss="modal">Agregar al carrito</button>
        `

        const btn_agregar = document.querySelectorAll('.boton_agregar')
        btn_agregar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.dataset.id)
            })
        })

        console.log(doc.data().Descripcion.length)

        for (var i = 0; i < doc.data().Descripcion.length; i++) {
            modaldescripcion.innerHTML += `
                <li>
                ${doc.data().Descripcion[i]}
                </li>
            `
        }
    });
}