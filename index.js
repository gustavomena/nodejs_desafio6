const axios = require('axios')
const url = require('url')
const fs = require('fs')
const http = require('http')

  
const getPokemones = async () => {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=10');            
        return data.results;
    } catch (error) {
        console.log(error);
    }
};
const getPokemonImg = async (nombre) => {
    try {
        const imagen = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${nombre}`);
        const img=imagen.data.sprites.front_default;
        return img;
    } catch (error) {
        console.log(error);
    }     
};


    let pokeData = [] 
    getPokemones().then((data) => {
        data.forEach(e => {
            getPokemonImg(e.name).then((r) => {
                let pokeInfo = new Object()
                pokeInfo.nombre = e.name
                pokeInfo.img = r
                pokeData.push(pokeInfo)
                fs.writeFile("poke.json", JSON.stringify(pokeData), "utf-8", () => {                    
                })

            })

           
        })
    })


http.createServer((req, res) => {
   
    if (req.url == '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        fs.readFile('index.html', 'utf-8', (err, data) => {
            res.end(data)
        })
    }
        if (req.url==('/pokemones')) {
            res.writeHead(200, {'Content-type' : 'text/html'})
            fs.readFile('poke.json', 'utf-8', (err, data) => {
                res.end(data)
            })
        }
}).listen(3000,()=>console.log('UP!'))
