var imPro = document.querySelector('#idimagen')
var btiPro = document.querySelector('#btnimagen')
var IdPro = document.querySelector('#iDmodal')
var NomPro = document.querySelector('#nombremodal')
var PrePro = document.querySelector('#presmodal')

function Modificarprod(id_producto) {
    console.log("id producto", id_producto);
    db.collection("Productos").doc(id_producto).get().then((doc) => {
        AProcucto=false;
        imPro.src=doc.data().Imagen;
        btiPro.required=false;
        IdPro.value = doc.id;
        IdPro.disabled= true;
        NomPro.value=doc.data().Nombre;
        PrePro.value=doc.data().Precio;
        document.getElementById("desmodal").value="";
        for(x=0;x<doc.data().Descripcion.length;x++)
        {
            document.getElementById("desmodal").value+=doc.data().Descripcion[x]+"\n";
        }
        $('#ModalAgre').modal('show');
    });
}