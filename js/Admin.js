const card = document.getElementById("card-carrito")
const cardaj = document.getElementById("card-ajustes")
const cardco = document.getElementById("card-consultas")

//carta carrito
card.addEventListener('mouseover', () => {
    card.classList.add('card-activo');
});
card.addEventListener('mouseout', () => {
    card.classList.remove('card-activo');
});
$(document).ready(function(){
    $('#card-carrito').click(function(){
    $('#detalleCarrito').show();
    $('#card-container').hide();
});
    $('#btnvolver').click(function(){
    $('#card-container').show();
    $('#detalleCarrito').hide();
});
});

//carta ajustes
cardaj.addEventListener('mouseover', () => {
    cardaj.classList.add('card-activo');
});
cardaj.addEventListener('mouseout', () => {
    cardaj.classList.remove('card-activo');
});
$(document).ready(function(){
    $('#card-ajustes').click(function(){
    $('#detalleajustes').show();
    $('#card-container').hide();
});
    $('#btnvolveraj').click(function(){
    $('#card-container').show();
    $('#detalleajustes').hide();
});
});

//carta consultas
cardco.addEventListener('mouseover', () => {
    cardco.classList.add('card-activo');
});
cardco.addEventListener('mouseout', () => {
    cardco.classList.remove('card-activo');
});
$(document).ready(function(){
    $('#card-consultas').click(function(){
    $('#detalleconsultas').show();
    $('#card-container').hide();
});
    $('#btnvolverco').click(function(){
    $('#card-container').show();
    $('#detalleconsultas').hide();
});
});
