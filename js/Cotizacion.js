var db = firebase.firestore();
const FormCotizacion = document.querySelector('#FormularioCotizacion');

FormCotizacion.addEventListener('submit', (e) => {
    e.preventDefault();
    var newCotizacion = {
        nombre: document.querySelector('.Nombre').value,
        apellido: document.querySelector('.Apellido').value,
        telefono: document.querySelector('.Telefono').value,
        email: document.querySelector('.Email').value,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    };
    FormCotizacion.reset();
    db.collection("Cotizaciones").doc().set(newCotizacion).then(() => {
        console.log(newCotizacion);
    }).catch((err) => {
        console.log("error");
    })
})
