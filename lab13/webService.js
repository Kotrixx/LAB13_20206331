const express = require('express');
const app = express();
const port = 3000;
app.get('/prueba',function(req,res){
    res.send('Página de inicio');
});


app.listen(port,function(){
    console.log("Servidor desplegado correctamente");
});