var quejas=[];



function addquejaToSystem(pnombre, pcelular, pcorreo, pasunto, pdescripcion){
var newqueja={
nombre : pnombre,
celular : pcelular,
correo : pcorreo,
asunto : pasunto,
descripcion : pdescripcion
};

console.log(newqueja);

quejas.push(newqueja);
}