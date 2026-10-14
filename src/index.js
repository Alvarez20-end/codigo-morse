import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';
import { textoAMorse, morseATexto, validarTexto, validarMorse } from './morse.js';

const entrada = document.getElementById('entrada');
const salida = document.getElementById('salida');
const etiquetaEntrada = document.getElementById('etiquetaEntrada');
const etiquetaSalida = document.getElementById('etiquetaSalida');
const modos = document.querySelectorAll('input[name="modo"]');

const modoActual = () => document.querySelector('input[name="modo"]:checked').value;

const msjError = (msj) => {
  Swal.fire({ icon: 'warning', title: 'Error', text: msj });
};

const actualizarModo = () => {
  const aMorse = modoActual() === 'texto';
  etiquetaEntrada.textContent = aMorse ? 'Texto' : 'Código morse';
  etiquetaSalida.textContent = aMorse ? 'Código morse' : 'Texto';
  entrada.placeholder = aMorse ? 'Escribe tu texto aquí...' : 'Ej: .... --- .-.. .- / -- ..- -. -.. ---';
  entrada.value = '';
  salida.value = '';
};

const convertir = () => {
  const aMorse = modoActual() === 'texto';
  const error = aMorse ? validarTexto(entrada.value) : validarMorse(entrada.value);
  if (error) return msjError(error);
  salida.value = aMorse ? textoAMorse(entrada.value) : morseATexto(entrada.value);
};

const copiar = async () => {
  if (!salida.value) return msjError('No hay resultado para copiar.');
  await navigator.clipboard.writeText(salida.value);
  Swal.fire({ icon: 'success', title: 'Copiado', showConfirmButton: false, timer: 1000 });
};

const limpiar = () => {
  entrada.value = '';
  salida.value = '';
};

modos.forEach((modo) => modo.addEventListener('change', actualizarModo));
document.getElementById('btnConvertir').addEventListener('click', convertir);
document.getElementById('btnCopiar').addEventListener('click', copiar);
document.getElementById('btnLimpiar').addEventListener('click', limpiar);

actualizarModo();