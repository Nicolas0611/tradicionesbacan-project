var db = firebase.firestore();
const FormCotizacion = document.querySelector('#FormularioCotizacion');
var ProductosTotal=[];
var CantidadProductos=[];
function productoCotizacion(){
    let ArrayCantidad=document.querySelectorAll('.ItemCantidad2');
    let ArrayProductos=document.querySelectorAll('.borrar-producto2');
    for(i = 0;i < ArrayCantidad.length; i++){
        ProductosTotal[i]=ArrayProductos[i].dataset.id;
        CantidadProductos[i]=ArrayCantidad[i].value;
    }
}
FormCotizacion.addEventListener('submit', (e) => {
    e.preventDefault();
    productoCotizacion();
    console.log(ProductosTotal);
    console.log(CantidadProductos);
    var newCotizacion = {
        nombre: document.querySelector('.Nombre').value,
        apellido: document.querySelector('.Apellido').value,
        telefono: document.querySelector('.Telefono').value,
        email: document.querySelector('.Email').value,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        ProductosTotal,
        CantidadProductos,
        precio: document.querySelector('.ItemPrecio2').textContent,
        cantidad: document.querySelector('.ItemCantidad2').value
    };
    console.log(newCotizacion);
    FormCotizacion.reset();
    db.collection("Cotizaciones").doc().set(newCotizacion).then(() => {
        console.log(newCotizacion);
    }).catch((err) => {
        console.log("error");
    })
});

