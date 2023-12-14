const PORT = 8000;

const path = require('path');
const fs = require('fs');

const express = require ('express');
const app = express();

const multipart = require('connect-multiparty');
const mdUpload = multipart({uploadDir: __dirname + path.sep + 'tmp' + path.sep});

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


app.post('/file', mdUpload, (req, res) => {
    const tag = 'saveFile';
    console.log(`${tag} guardando archivo`, req.body);

    if (!req.files) {
        return res.status(400).send({
            status: 'error',
            message: 'No se recibio archivo'
        });
    }

    //console.log(`${tag} file`, req.files.file);

    let filePath = req.files.file.path;
    //filePath = __dirname + path.sep + filePath;

    const fileName = req.files.file.name;
    const extFile = path.extname(fileName);

    //console.log(`${tag} fileName: '${fileName}', extFile: '${extFile}' `);

    //Ruta para el archivo
    const newPathDir = `${__dirname + path.sep + 'upload' + path.sep}`;
    //const newPath = `${newPathDir + id_nodo.replace(/\s/g,'-') + extFile}`;
    const newPath = `${newPathDir + fileName}`;
    
    //console.log(`${tag} newPath '${newPath}'`);

    try{
        //Se crea el arbol de directorios si no existe
        if (!fs.existsSync(newPathDir)) {
            fs.mkdirSync(newPathDir, {recursive:true});
        }

        //Se mueve de ruta el archivo cargado
        fs.renameSync(filePath, newPath);

        let id_file = Math.random() * 1000;
        res.status(200).send({
            success: 'true',
            id_file: id_file
        });
    }catch(error){
        console.log(`${tag} error producido al cargar archivo`, error);
        res.status(500).send({'message': error});
    };
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