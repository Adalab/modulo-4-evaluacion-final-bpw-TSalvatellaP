//imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt')

//crear el servidor
const server = express();
require("dotenv").config();

// CONFIGURAR EL SERVIDOR
server.use(cors());
server.use(express.json({limit: '50mb'}));

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

//API RESTful
//endpoints CITAS
//Listado
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

//añadir
server.post ('/citas', async (req, res)=>{
  try {
    const conn = await getDBconnection ();
    const {Fecha, Hora, Motivo, FK_ID_Paciente, FK_ID_Doctor} = req.body;
    //guardar en la base de datos
    const sqlInsert =
    'INSERT INTO citas (Fecha, Hora, Motivo, FK_ID_Paciente, FK_ID_Doctor) VALUES (?, ?, ?, ?, ?)';

    const [result] = await conn.query(sqlInsert, [
      Fecha, 
      Hora, 
      Motivo, 
      FK_ID_Paciente,
      FK_ID_Doctor
    ]);
    if (result) {
      res.status (201).json({
        success: true,
        id: result.insertId, //nuevo id que se inserta en la fila de mysql
      });
    } else {
      res.status (400).json({
        success: false,
        id: "No se ha podido añadir al nuevo paciente",
    });
   } 
   conn.end();
  } catch (error) {
    res.status(500).json(error)
  }
});

//eliminar citas
server.delete('/citas/:idCitas', async (req, res)=>{
  const { idCitas } = req.params;
  try {
    const conn = await getDBconnection();
    const sqlDelete = 'DELETE FROM citas WHERE  ID_Cita = ?';
    const [result] = await conn.query(sqlDelete, [idCitas]);
    if (result.affectedRows >0){
      res.status(200).json({success: true});
    } else {
      res.status(400).json({
        success: false,
        message: 'Cita no encontrado. '
      })
    }
    conn.end(); 
  } catch (error) {
    console.error("Error al eliminar la cita", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }

} )


//endpointS DOCTORES
//listado
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

// buscar por ID
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

//endpoints PACIENTES
//listado
server.get("/pacientes", async (req, res)=>{
  try {
    const conn = await getDBconnection ();
    const selectPacientes = "SELECT * FROM pacientes";
    const [results] = await conn.query (selectPacientes);
    conn.end();
    res.status (200).json(results);

  } catch (error) {
    res.status(500).json(error)
  }
});

//añadir
server.post ('/pacientes', async (req, res)=>{
  try {
    const conn = await getDBconnection ();
    const {Nombre, Fecha_Nacimiento, Direccion, Numero_Telefono, Historial_Medico, Alergias} = req.body;
    //guardar en la base de datos
    const sqlInsert =
    'INSERT INTO pacientes (Nombre, Fecha_Nacimiento, Direccion, Numero_Telefono, Historial_Medico, Alergias) VALUES (?, ?, ?, ?, ?, ?)';

    const [result] = await conn.query(sqlInsert, [
      Nombre,
      Fecha_Nacimiento, 
      Direccion, 
      Numero_Telefono, 
      Historial_Medico, 
      Alergias,     
    ]);
    if (result) {
      res.status (201).json({
        success: true,
        id: result.insertId, //nuevo id que se inserta en la fila de mysql
      });
    } else {
      res.status (400).json({
        success: false,
        id: "No se ha podido añadir al nuevo paciente",
    });
   } 
   conn.end();
  } catch (error) {
    res.status(500).json(error)
  }
});

//actualizar datos del paciente
server.put('/pacientes/:idPaciente', async (req, res) => {
  const { idPaciente } = req.params;
  const { Nombre, Fecha_Nacimiento, Direccion, Numero_Telefono, Historial_Medico, Alergias } = req.body;

  try {
      const conn = await getDBconnection();
      const updatePaciente = 'UPDATE pacientes SET Nombre=?, Fecha_Nacimiento=?, Direccion=?, Numero_Telefono=?, Historial_Medico=?, Alergias=? WHERE ID_Paciente = ?';
      const [result] = await conn.query(updatePaciente, [Nombre, Fecha_Nacimiento, Direccion, Numero_Telefono, Historial_Medico, Alergias, idPaciente]);

      if (result.affectedRows > 0) {
          res.status(200).json({ success: true });
      } else {
          res.status(404).json({
              success: false,
              message: "No se encontró el paciente o no se realizaron cambios.",
          });
      }
      conn.end();
  } catch (error) {
      console.error("Error al actualizar el paciente:", error);
      res.status(500).json({
          success: false,
          message: "Error interno del servidor.",
      });
  }
});

//eliminar paciente
server.delete('/pacientes/:idPaciente', async (req, res)=>{
  const { idPaciente } = req.params;
  try {
    const conn = await getDBconnection();

    const sqlDelete = 'DELETE FROM pacientes WHERE  ID_Paciente = ?';
    const [result] = 
    await conn.query(sqlDelete, [idPaciente]);
    if (result.affectedRows >0){
      res.status(200).json({success: true});
    } else {
      res.status(400).json({
        success: false,
        message: "Paciente no encontrado."
      })
    }
    conn.end(); 
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }

} )

//AUTENTICACIÓN 
//endpoint crear usuario
server.post('/register', async (req, res) => {
  try {
    const conn = await getDBconnection();
    const { email, nombre, pass, FK_ID_Paciente } = req.body;

    // Verificar si el usuario ya existe
    const selectEmail = 'SELECT email FROM usuarios WHERE email = ?';
    const [emailResult] = await conn.query(selectEmail, [email]);

    if (emailResult.length === 0) {
      // Hashear la contraseña
      const passwordHashed = await bcrypt.hash(pass, 10);

      // Insertar usuario en la base de datos
      const insertUser = 'INSERT INTO usuarios (email, nombre, password, FK_ID_Paciente) VALUES (?, ?, ?, ?)';
      const [result] = await conn.query(insertUser, [email, nombre, passwordHashed, FK_ID_Paciente]);

      conn.end();
      res.status(201).json({ success: true, id: result.insertId });
    } else {
      conn.end();
      res.status(400).json({ success: false, message: "Usuario ya existe." });
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor." });
  }
});

//LOGGING usuario

server.post('/login', async (req, res) =>{
try {
  const conn = await getDBconnection();
  const {email, pass} = req.body;
     // Verificar si el usuario ya existe
  const selectEmail = 'SELECT * FROM usuarios WHERE email = ?';
  const [resultUser] = await conn.query(selectEmail, [email]);
  //comprobar contraseña
  if (resultUser.length !== 0){
    const passwordDB = resultUser [0].password;
    const isSamePassword = await bcrypt.compare(pass,passwordDB );

    if (isSamePassword){
      //si son iguales se crea el token
      const infoToken = {email: resultUser[0].email, id: resultUser[0].id_usuario}
      const token = jwt.sign(infoToken, "pepino", {expiresIn: '5min'});
      res.status (200).json({success: true, token: token});
    } else{
      res.status (400).json({success: false, message: "Contraseña incorrecta"});
    }
  } else{
    res.status(400).json({success: false, message: "El email que se ha introducido no existe"})
  }

  
} catch (error) {
   console.error(error);
    res.status(500).json({ success: false, message: "Error interno del servidor." });
}

})



