const PORT = 8000;

const express = require ('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.patch('/:id_contacto', (req, res) => {
    const tag = 'patchService';

    console.log(`${tag} body`, req.body);
    console.log(`${tag} headers`, req.headers);

    console.log(`${tag} id_contacto ${req.params.id_contacto}`);
    res.status(200).send({
        message: 'recurso actualizado',
        //recibido: req.body
    });
});

app.post('/', (req, res) => {
    const tag = 'postService';

    console.log(`${tag} headers`, req.headers);
    console.log(`${tag} body`, req.body);

    //error provocado
    //let val = "dasd";
    //console.log(`${tag} valor calculado ${JSON.parse(val)}`);

    res.status(200).send({
        message: 'recurso actualizado',
        //recibido: req.body
    });
});

//status http 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocurrio algun error, consulte con su administrador');
});


//status http 404
app.use(function(req, res, next) {
    res.status(404).send('Recurso no encontrado, favor de verificarlo');
});



app.listen(PORT, () => {
    console.log(`Aplicacion iniciada en puerto ${PORT}`);

});