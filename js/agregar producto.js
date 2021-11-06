const imgproduct = document.querySelector('#idimagen')
const selecionarch = document.querySelector('#btnimagen')
const NProduct = document.querySelector('#btnNuevo')
var AProcucto

NProduct.addEventListener('click',(e)=>{
    AProcucto = true;
    imPro.src= "https://via.placeholder.com/200";
    btiPro.required=true;
    IdPro.value = "";
    IdPro.disabled= false;
    NomPro.value="";
    PrePro.value="";
    document.getElementById("desmodal").value="";
    $('#ModalAgre').modal('show');
})

selecionarch.addEventListener('change', (e) => {
    e.preventDefault();
const archivo=selecionarch.files[0]
imgproduct.src=URL.createObjectURL(archivo);
})