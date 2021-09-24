var visibilidad = 1;
function mostrarCarrito() {
    if (visibilidad == 1) {
        visibilidad =2;
        document.getElementById('Carrito').style.display = 'block';
    }
    else if(visibilidad == 2){
        visibilidad = 1;
        document.getElementById('Carrito').style.display = 'none';    
    }
}