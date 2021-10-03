document.querySelector('#btnSaveEnviar').addEventListener('click', saveQueja);


function saveQueja(){

    snombre = document.querySelector('#txtnombre').value,
    scelular = document.querySelector('#txtcelular').value,
    scorreo = document.querySelector('#txtcorreo').value,
    sasunto = document.querySelector('#txtasunto').value,
    sdescripcion = document.querySelector('#txtdescripcion').value;

   addquejaToSystem(snombre,scelular, scorreo, sasunto, sdescripcion);


}