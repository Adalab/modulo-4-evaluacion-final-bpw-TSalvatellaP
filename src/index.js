//imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

//crear el servidor
const server = express();
require("dotenv").config();

// configurar el servidor
server.use(cors());
server.use(express.json());

//conectarse a la base de datos, es asincrona

async function getDBconnection(){
  const connection = await mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: "db_hospital",
   });
  await connection.connect();
  
  return connection;
 
}

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});


//endpoint para buscar todas las citas
server.get('/citas', async (req, res)=>{
  try {
    const conn = await getDBconnection ();
    //crear el sql
    const select = "SELECT * FROM citas";
    const [results] = await conn.query(select);
    conn.end();

    res.status (200).json({
      info: {count: results.length},
      results: results,

    });

  } catch (error) {
    res.status(500).json(error)
  }
});

//endpoint para buscar por doctores
server.get("/doctores", async (req, res)=>{
  try {
    const conn = await getDBconnection ();
    const selectDoc = "SELECT * FROM doctores";
    const [results] = await conn.query (selectDoc);
    conn.end();
    res.status (200).json(results);

  } catch (error) {
    res.status(500).json(error)
  }
});


//endpoint para buscar por id de doctores
server.get("/doctores/:idDoctor", async (req, res)=>{
  try {
    const conn = await getDBconnection ();
    const {idDoctor} = req.params;
    const selectDocID = 'SELECT * FROM doctores WHERE ID_Doctor = ? ';
    const [result] = await conn.query (selectDocID, [idDoctor]);
    conn.end();
    res.status (200).json(result);

  } catch (error) {
    res.status(500).json(error)
  }
});
