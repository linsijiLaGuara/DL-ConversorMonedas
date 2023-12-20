const selectMonedaOrigen = document.getElementById("moneda_origen");
const btnCalcular = document.getElementById("botonCalcular");
const inputCantidadUno = document.getElementById("cantidad_uno");
const inputResultadoDivisa = document.getElementById("resultado");

const obtenerTasaDeCambio = async () => {
  const monedaOrigen = selectMonedaOrigen.value;

  const ApiRouter = `https://mindicador.cl/api/${monedaOrigen}`;
  const response = await fetch(ApiRouter);
  const dataConversorMoneda = await response.json();
  return dataConversorMoneda.serie[0].valor;
};

const calcular = async () => {
  const monedaOrigen = selectMonedaOrigen.value;
  const cantidadUno = parseFloat(inputCantidadUno.value);
  const tasaDeCambio = await obtenerTasaDeCambio(monedaOrigen);
  const resultado = cantidadUno * tasaDeCambio;

  inputResultadoDivisa.innerHTML = resultado.toFixed(2);
};

btnCalcular.addEventListener("click", calcular);
