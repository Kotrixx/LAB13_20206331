
const express = require('express');
var cors = require('cors')
const mysql = require("mysql2");
const app = express();
app.use(cors())

const port = 3000;
const conn = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bicicentro"
});
conn.connect(function(err){
    if(err) throw err;
    console.log("Conexión exitosa a base de datos");
});

app.get('/prueba',function(req,res){
    res.send('Página de inicio');

});



app.get('/trabajadores',function(req,res){
    let sql = "select * from  bicicentro.trabajadores;"
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/trabajadores/:dni",(req,res) => {

    let dni = req.params["dni"];

    let sql = "SELECT * FROM bicicentro.trabajadores where bicicentro.trabajadores.dni = ?";

    conn.query(sql,[dni], (err, result, fields) => {
        if(err) throw err;
        res.json(result);
    });

});

app.get("/trabajadores/ventas/:dni",(req,res) => {

    let dni = req.params["dni"];

    let sql = "SELECT * FROM bicicentro.trabajadores t INNER JOIN bicicentro.ventas v ON t.dni = v.dniTrabajador WHERE t.dni = ?";

    conn.query(sql,[dni], (err, result, fields) => {
        if(err) throw err;
        res.json(result);
    });

});

app.get('/sedes',function(req,res){
    let sql = "SELECT * FROM bicicentro.sedes;"
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;

        res.json({
            //horaActual: horaActual,
            jobs: result
        });
    });

});

app.get("/sedes/:idsede",(req,res) => {

    let dni = req.params["idsede"];

    let sql = "SELECT * FROM bicicentro.sedes WHERE bicicentro.sedes.idsede = ?";

    conn.query(sql,[dni], (err, result, fields) => {
        if(err) throw err;
        res.json(result);
    });

});

app.get("/sedes/trabajadores/:idsede",(req,res) => {

    let dni = req.params["idsede"];

    let sql = "SELECT * FROM bicicentro.trabajadores t INNER JOIN bicicentro.sedes s ON s.idsede = t.idsede;";

    conn.query(sql,[dni], (err, result, fields) => {
        if(err) throw err;
        res.json(result);
    });

});

app.listen(port,function(){
    console.log("Servidor desplegado correctamente");
});