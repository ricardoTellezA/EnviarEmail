//VARIABLES
const formulario = document.querySelector('#enviar-mail');
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const btn = document.querySelector('#enviar');
const btnResetear = document.querySelector('#resetBtn');


eventsListeners();
function eventsListeners(){

    document.addEventListener('DOMContentLoaded',inicioApp);
    email.addEventListener('blur',validar);
    asunto.addEventListener('blur',validar);
    mensaje.addEventListener('blur',validar);
    formulario.addEventListener('submit',envioFormulario);
    btnResetear.addEventListener('click',resetForm);
}


function inicioApp(){
    btn.disabled = true;   
    btn.classList.add('cursor-not-allowed','opacity-50'); 
}


function validar(e){

    if(e.target.value.length < 2){
        const error = document.querySelector('p.error');
       if(error){
           error.remove()
       }
        
        e.target.classList.remove('border','border-green-500');

        e.target.classList.add('border','border-red-500');

        envioMensaje('Todos los campos son necesarios');

    }else{
        
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');

        
    }

    if(e.target.type === 'email'){

        if(er.test(e.target.value)){
            e.target.classList.remove('border','border-red-500');   
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');   
            
            envioMensaje('El correo electrónico no es valido');
           
        }
    }

    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        btn.disabled = false;   
        btn.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function envioMensaje(mensaje){
    const mensajeError = document.createElement('p');

    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('p.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }

}


function envioFormulario(e){
    e.preventDefault();
   
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex'; 
   
    setTimeout(() => {
        const p = document.createElement('p');
        spinner.style.display = 'none'; 
        p.classList.add('border', 'border-green-500', 'background-red-100', 'text-green-500', 'p-4', 'mt-4', 'mb-4', 'text-center', 'error');
        p.textContent = 'El mensaje se envio correctamente';

        formulario.insertBefore(p,spinner);


        setTimeout(() =>{
          p.remove();

          formulario.reset();
          e.target.classList.remove('border','border-green-500');

          inicioApp();
        },3000);
    }, 3000);


}


function resetForm(e){
e.preventDefault();
formulario.reset();
inicioApp();

}