
$(document).ready(function () {
    var dataSet = [];
    x = 1
    let db = firebase.firestore();
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

    db.collection("Productos").get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            dataSet.push([doc.id, doc.data().Nombre, doc.data().Precio])
            x++
        });
        $('#table_modi').dataTable({
            destroy: true,

            "data": dataSet,
            "columnDefs": [
                { "width": "80px", "targets": 0 }
            ],
            columns: [
                /* {
                    targets: [0], 
                     visible: false, //ocultamos la columna de ID que es la [0]                        
                },*/
                { title: "id" },
                { title: "Nombre" },
                { title: "Precio" },
                {
                    title: "Acciones",
                    targets: -1,
                    defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div>"
                }
            ]
        });

        $('#btnNuevo').click(function () {
            $('#Numerokit').val('');
            $('#NombreProducto').val('');
            $('#DescripcionProducto').val('');
            $('#Precio').val('');
            $("form").trigger("reset");
            $('#modalAltaEdicion').modal('show');
        });

        $('form').submit(function (e) {
            e.preventDefault();
            let Numerokit = $.trim($('#Numerokit').val());
            let DescripcionProductoArray = $.trim($('#DescripcionProducto').val());
            let Nombre = $.trim($('#NombreProducto').val());
            let Precio = $.trim($('#Precio').val());
            let Descripcion = DescripcionProductoArray.split(".");
            let Imagen = "";
            data = { Descripcion: Descripcion, Imagen: Imagen, Nombre: Nombre, Precio: Precio };
            db.collection("Productos").doc(Numerokit).set(data)
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            $("form").trigger("reset");
            $('#modalAltaEdicion').modal('hide');
        });
    }
    )
});

