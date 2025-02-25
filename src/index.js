//imports
const express = require('express');
const cors = require('cors');

//crear el servidor
const server = express();

// configurar el servidor
server.use(cors());
server.use(express.json());

const PORT = 5005;
server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
