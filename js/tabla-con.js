
$(document).ready(function () {
    var dataSet =[];
    x = 1
    let db = firebase.firestore();
    db.collection("Contactenos").get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            var fecha = new Date(doc.data().fecha.seconds * 1000);
            var fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
            var hora = new Date(doc.data().fecha.seconds * 1000);
            var horaFormateada = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
            var mensaje=fechaFormateada+" "+horaFormateada;
            dataSet.push([doc.id, doc.data().nombre, doc.data().celular, doc.data().correo, doc.data().asunto, doc.data().descripcion, mensaje])
        
      
            x++
        
        });
        $('#table_con').dataTable({
            destroy: true,
            searching: false,
            "data":dataSet,
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
                { title: "celular" },
                { title: "correo" },
                { title: "asunto" },
                { title: "descripcion","width": "1515px" },
                { title: "fecha" }
            ]
        });

    }

    )


 
});

