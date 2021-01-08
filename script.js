var apikey={
    key: 'b4d486e1-1893-49ea-8d6f-79a22711ba12'
}

function getLogo(symbol){
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?&symbol='+symbol+'&CMC_PRO_API_KEY='+apikey.key)
    .then((response)=>{
        if(!response.ok)
//            if(response.status == "429")
//                console.error('Muitas requisições, aguarde algum tempo');
            throw new Error(response.status);
        return response.json();
    })
    .then((api)=>{
        var [symbol] = Object.keys(api.data);
        var {[symbol]: info} = api.data;
        document.getElementById(symbol+"-logo").src = info.logo;
    })
    .catch((error)=>{
        if (error.message == "429")
            console.error("erro 429: Muitas requisições, tente novamente mais tarde");
        else
            console.error("Erro ao buscar o logo da moeda " + error.message);
    })
}
//GET Fectch Requisition
let inicio = 11;
let fim = 20;
fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?start='+inicio+'&limit='+fim+'&CMC_PRO_API_KEY='+apikey.key)
.then(
    (response)=>{
        if(!response.ok)
            throw new Error('Erro ao executar a requisição, status '+ response.status);
        return response.json();
    }
)
.then(
    (api)=>{
        var texto = "";
        //exibir as moedas
        for(let i =inicio-1; i<fim; i++){
            //Mostrar informação da api
            texto = texto + `
                <div class="media">
                    <img src="" id="${api.data[i].symbol}-logo" class="coin-logo" alt="${api.data[i].symbol}-logo" width="100" height="60">
                    <div class="media-body">
                        <h5 class="mt-2">${api.data[i].name}</h5
                        <p>${api.data[i].symbol}</p>
                        <p>${api.data[i].first_historical_data}</p>
                    </div>
                </div>
            `;
            document.getElementById("coins").innerHTML = texto;
            var srcimg = getLogo(api.data[i].symbol);
        }
    }
)
.catch(
    (error)=>{
        console.error(error.message);
    }
)
//<img src="logos/${api.data[i].name}.png" class="coin-logo" alt="coin" width="100" height="60">
