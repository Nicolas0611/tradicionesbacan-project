const imgproduct = document.querySelector('#idimagen')
const selecionarch = document.querySelector('#btnimagen')

selecionarch.addEventListener('change', (e) => {
    e.preventDefault();
const archivo=selecionarch.files[0]
imgproduct.src=URL.createObjectURL(archivo);

})