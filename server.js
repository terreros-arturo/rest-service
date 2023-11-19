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

    res.status(200).send({
        message: 'recurso actualizado',
        recibido: req.body
    });
});



app.listen(PORT, () => {
    console.log(`Aplicacion iniciada en puerto ${PORT}`);

});