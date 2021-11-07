function Borrarprod(IDborrar){
    if(IDborrar != undefined){
        TConf.innerHTML = '';
        TConf.innerHTML = `Confirmar producto a borrar: ${IDborrar}`
        BConfir.innerHTML = '';
        BConfir.innerHTML =`Va a borrar el producto: ${IDborrar} <br>Escriba confirmar y oprima el boton para borrar el producto
                            <br><input type="text" id="confborrar" placeholder="confirmar">
                            <br><button type="button" class="btn-conf-borrar" disabled>Borrar producto</button>`;
        var confbo = document.querySelector('#confborrar')
        var btnborr = document.querySelector('.btn-conf-borrar')
        confbo.addEventListener('input', (e)=> {
            if(confbo.value == "confirmar")
                btnborr.disabled = false;
            else
                btnborr.disabled = true;
        })
        btnborr.addEventListener('click',(e)=>{
            e.preventDefault();
            borrardefirebase(IDborrar);
        })
        $('#Confirmacion').modal('show');
    }
}

function borrardefirebase(IDborrar){
        db.collection("Productos").doc(IDborrar).delete().then(() => {
            var desertRef = storage.ref('Imagenes productos/' + IDborrar);
            desertRef.delete().then(function() {
                // File deleted successfully
            }).catch(function(error) {
                // Uh-oh, an error occurred!
            });
            console.log("Document successfully deleted!"); 
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}