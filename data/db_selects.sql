SELECT * FROM db_hospital.pacientes;

SELECT * FROM Citas WHERE FK_ID_Paciente = 1;

SELECT Pacientes.Nombre, Doctores.Nombre, Citas.Fecha, Citas.Hora
    FROM Citas
    JOIN Pacientes ON Citas.FK_ID_Paciente = Pacientes.ID_Paciente
    JOIN Doctores ON Citas.FK_ID_Doctor = Doctores.ID_Doctor;
    
SELECT Tratamientos.Nombre, Pacientes.Nombre
    FROM Tratamientos
    JOIN Pacientes ON Tratamientos.FK_ID_Paciente = Pacientes.ID_Paciente;
    
SELECT COUNT(*) FROM Pacientes;

SELECT Doctores.Nombre AS NombreDoctor, COUNT(*) AS Nºpacientes
    FROM Citas
    JOIN Doctores ON Citas.FK_ID_Doctor = Doctores.ID_Doctor
    GROUP BY Doctores.Nombre;

SELECT * FROM Pacientes ORDER BY Fecha_Nacimiento ASC;

SELECT * FROM Pacientes ORDER BY Fecha_Nacimiento DESC;

SELECT * FROM Pacientes WHERE Alergias IS NOT NULL AND Alergias != '';

SELECT * FROM Pacientes WHERE Nombre LIKE '%Ana%';

SELECT * FROM Doctores WHERE Especialidad = 'Cardiología';

SELECT Nombre, Fecha_Nacimiento FROM Pacientes;

SELECT Tratamientos.Nombre, Pacientes.Nombre
FROM Tratamientos
JOIN Pacientes ON Tratamientos.FK_ID_Paciente = Pacientes.ID_Paciente;

SELECT * FROM Tratamientos WHERE FK_ID_Paciente = 3;

SELECT * FROM Tratamientos WHERE Medicamentos LIKE '%Ibuprofeno%';

SELECT Pacientes.Nombre, COUNT(*) AS NumeroTratamientos
FROM Tratamientos
JOIN Pacientes ON Tratamientos.FK_ID_Paciente = Pacientes.ID_Paciente
GROUP BY Pacientes.Nombre;

SELECT Tratamientos.Nombre, Tratamientos.Descripcion, Pacientes.Nombre
FROM Tratamientos
JOIN Pacientes ON Tratamientos.FK_ID_Paciente = Pacientes.ID_Paciente
WHERE Pacientes.Alergias IS NOT NULL AND Pacientes.Alergias != '';

SELECT * FROM Tratamientos WHERE Medicamentos IS NULL OR Medicamentos = '';