const PORT = 8000;

const express = require ('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.patch('/', (req, res) => {
    const tag = 'patchService';

    console.log(`${tag} iniciando`, req.body);

    res.status(200).send({
        message: 'recurso actualizado',
        recibido: req.body
    });
});

app.post('/', (req, res) => {
    const tag = 'postService';

    console.log(`${tag} iniciando`, req.body);

    //error provocado
    let val = "dasd";
    console.log(`${tag} valor calculado ${JSON.parse(val)}`);

    res.status(200).send({
        message: 'recurso actualizado',
        recibido: req.body
    });
});

//capturar una excepcion no manejada
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocurrio algun error, consulte con su administrador');
});


//Cualquier servicio no existente
app.use(function(req, res, next) {
    res.status(404).send('Recurso no encontrado, favor de verificarlo');
});



app.listen(PORT, () => {
    console.log(`Aplicacion iniciada en puerto ${PORT}`);

});