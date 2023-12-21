const selectMonedaOrigen = document.getElementById("moneda_origen");

const btnCalcular = document.getElementById("botonCalcular");
const inputCantidadUno = document.getElementById("cantidad_uno");
const inputResultadoDivisa = document.getElementById("resultado");
const api_url = "https://mindicador.cl/api/";

async function getTipoMoneda(url) {
  try {
    const monedas = await fetch(url);
    const { dolar, ivp, euro, uf, utm } = await monedas.json();
    return [dolar, ivp, euro, uf, utm];
  } catch (error) {
    throw new Error(error);
  }
}

async function rederizaInfoMoneda(url) {
  try {
    const select_container = document.getElementById("moneda_origen");
    const tipoMoneda = await getTipoMoneda(url);

    tipoMoneda.forEach((info_moneda) => {
      const option = document.createElement("option");
      option.value = info_moneda["codigo"];
      option.innerText = info_moneda["nombre"];

      select_container.appendChild(option);
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function getMonedaId(url, IdTipoMoneda) {
  try {
    if (IdTipoMoneda) {
      const coin = await fetch(`${url}${IdTipoMoneda}`);
      const { serie } = await coin.json();
      const [{ valor: valorMoneda }] = serie;

      return valorMoneda;
    } else {
      alert("Seleciona tipo moneda");
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function calcular() {
  const monedaOrigen = selectMonedaOrigen.value;
  const cantidadUno = parseFloat(inputCantidadUno.value);
  const calcularMoneda = await getMonedaId(api_url, monedaOrigen);
  const resultado = cantidadUno / parseFloat(calcularMoneda);

  inputResultadoDivisa.innerHTML = resultado.toFixed(2);
}
btnCalcular.addEventListener("click", calcular);
rederizaInfoMoneda(api_url);
