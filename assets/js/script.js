const getPokemon = async () => {
    const ApiRouter = "https://mindicador.cl/api";
    const response = await fetch(ApiRouter);
    const DataConversorMoneda = await response.json();
   
  
    console.log(DataConversorMoneda);
  };
  getPokemon();
  