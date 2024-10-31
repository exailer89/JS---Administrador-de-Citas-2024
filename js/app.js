// Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');

// Eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomas.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita);


// Objeto de Cita
const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}


class Notificacion {
    constructor({texto, tipo}) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }

    mostrar() {
        // Crear la notificacion
        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        // Eliminar alertas duplicadas
        const alertaPrevia = document.querySelector('.alert');
        /* if (alertaPrevia) { // Forma comun de validar y remover
            alertaPrevia.remove();
        } */
        alertaPrevia?.remove(); // Forma nueva de validar y remover, el ? pregunta si el elemento existe, en caso positivo elimina dicho elemento.

        // Si es de tipo error, agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        // Mensaje de error
        alerta.textContent = this.texto;

        // Insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);

        // Quitar notificaciones despues de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000)
    }
}

class AdminCitas {
    constructor() {
        this.citas = [];
    }
    
    agregar(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }
}


function datosCita(e) {
    citaObj[e.target.name] = e.target.value; // Con e.target.name tomamos el name del target donde nos encontramos.
    console.log(citaObj);
}

// Primera forma de validar formularios
/* function submitCita(e) {
    e.preventDefault();
    
    const {paciente, propietario, email, fecha, sintomas} = citaObj;

    if (paciente.trim() === '' || propietario.trim() === '' || email.trim() === '') {
        console.log('Todos los campos son obligatorios');
        return;
    }
} */

const citas = new AdminCitas();

// Simplificar la validación del formulario
function submitCita(e) {
    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === '')) { // Object.values() nos permite traer todos los valores de un objeto.
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        });
        return
    }

    citas.agregar(citaObj);
}