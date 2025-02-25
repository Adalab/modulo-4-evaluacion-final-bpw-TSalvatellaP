CREATE SCHEMA IF NOT EXISTS `db_hospital` DEFAULT CHARACTER SET utf8;
USE `db_hospital`;

CREATE TABLE IF NOT EXISTS `db_hospital`.`Pacientes` (
    `ID_Paciente` INT NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(45) NOT NULL,
    `Fecha_Nacimiento` DATE NOT NULL,
    `Direccion` TEXT NULL,
    `Numero_Telefono` VARCHAR(20) NOT NULL,
    `Historial_Medico` LONGTEXT NOT NULL,
    `Alergias` TEXT NULL,
    PRIMARY KEY (`ID_Paciente`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_hospital`.`Doctores` (
    `ID_Doctor` INT NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(45) NOT NULL,
    `Apellido` VARCHAR(45) NOT NULL,
    `Especialidad` VARCHAR(60) NOT NULL,
    `Dia_Semana` VARCHAR(15) NULL,
    `Hora_Inicio` TIME NULL,
    `Hora_Fin` TIME NULL,
    PRIMARY KEY (`ID_Doctor`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_hospital`.`Citas` (
    `ID_Cita` INT NOT NULL AUTO_INCREMENT,
    `Fecha` DATE NOT NULL,
    `Hora` TIME NOT NULL,
    `Motivo` TEXT NOT NULL,
    `FK_ID_Paciente` INT NOT NULL,
    `FK_ID_Doctor` INT NOT NULL,
    PRIMARY KEY (`ID_Cita`),
    INDEX `fk_Citas_Pacientes1_idx` (`FK_ID_Paciente` ASC) VISIBLE,
    INDEX `fk_Citas_Doctores1_idx` (`FK_ID_Doctor` ASC) VISIBLE,
    CONSTRAINT `fk_Citas_Pacientes1`
        FOREIGN KEY (`FK_ID_Paciente`)
        REFERENCES `db_hospital`.`Pacientes` (`ID_Paciente`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_Citas_Doctores1`
        FOREIGN KEY (`FK_ID_Doctor`)
        REFERENCES `db_hospital`.`Doctores` (`ID_Doctor`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_hospital`.`Tratamientos` (
    `ID_Tratamiento` INT NOT NULL AUTO_INCREMENT,
    `Nombre` TEXT NULL,
    `Descripcion` LONGTEXT NULL,
    `Medicamentos` TEXT NULL,
    `FK_ID_Paciente` INT NOT NULL,
    PRIMARY KEY (`ID_Tratamiento`),
    INDEX `fk_Tratamientos_Pacientes_idx` (`FK_ID_Paciente` ASC) VISIBLE,
    CONSTRAINT `fk_Tratamientos_Pacientes`
        FOREIGN KEY (`FK_ID_Paciente`)
        REFERENCES `db_hospital`.`Pacientes` (`ID_Paciente`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

INSERT INTO pacientes (Nombre, Fecha_Nacimiento, Direccion, Numero_Telefono, Historial_Medico, Alergias) VALUES
('Ana García', '1985-03-15', 'Calle Mayor, 10. Madrid', '612345678', 'Historial de alergia a la penicilina, cirugía de apendicitis en 2010', 'Penicilina'),
('Roberto Sánchez', '1978-09-22', 'Avenida del Sol, 10. Madrid', '654987321', 'Hipertensión, diabetes tipo 2.', 'Ninguna'),
('Elena Martínez', '2002-05-10', 'Calle Luna, 23, 45. Madrid', '687123456', 'Asma bronquial desde la infancia.', 'Polen'),
('Javier Fernandez', '1960-11-01', 'Calle Toledo, 15. Madrid', '698741253', 'Operación de cadera en 2020.', 'Ninguna'),
('Sofia Ruiz', '1995-07-28', 'Calle Alcala, 57. Madrid', '641258963', 'Migrañas cronicas.', 'Aines');


INSERT INTO db_hospital.doctores (Nombre, Apellido, Especialidad, Dia_Semana, Hora_Inicio, Hora_Fin) VALUES
('Carlos', 'López', 'Cardiología', 'Lunes a Viernes', '09:00:00', '17:00:00');
INSERT INTO db_hospital.doctores (Nombre, Apellido, Especialidad, Dia_Semana, Hora_Inicio, Hora_Fin) VALUES
('Marta', 'Sánchez', 'Pediatría', 'Lunes a Viernes', '08:00:00', '15:00:00');
INSERT INTO db_hospital.doctores (Nombre, Apellido, Especialidad, Dia_Semana, Hora_Inicio, Hora_Fin) VALUES
('Raúl', 'Pérez', 'Traumatología', 'Lunes, miércoles y viernes', '16:00:00', '20:00:00');
INSERT INTO db_hospital.doctores (Nombre, Apellido, Especialidad, Dia_Semana, Hora_Inicio, Hora_Fin) VALUES
('Anacleta', 'Pepino', 'Dermatología', 'Martes y jueves', '09:00:00', '13:00:00');

INSERT INTO db_hospital.Tratamientos (Nombre, Descripcion, Medicamentos, FK_ID_Paciente) VALUES
('Electrocardiograma (ECG)','Prueba para evaluar la actividad eléctrica del corazón.','Ninguno.','1'),
('Análisis de sangre completo','Análisis para evaluar los niveles de células sanguíneas y otros parámetros.','Ninguno.','2'),
('Inhalador de salbutamol','Medicamento para aliviar los síntomas del asma.','Salbutamol.','3'),
('Radiografía de cadera','Imagen de rayos X para evaluar la estructura ósea de la cadera.','Ninguno','4'),
('Tratamiento para la migraña','Medicamentos para aliviar los síntomas de la migraña','Ibuprofeno, triptanos.','5');

INSERT INTO db_hospital.Citas (Fecha, Hora, Motivo, FK_ID_Paciente, FK_ID_Doctor) VALUES
('2024-11-20','10:30:00','Revisión anua','1','9'),
('2024-11-21','16:00:00','Control de diabetes','2','10'),
('2024-11-22','09:00:00','Consulta por asma','3','11'),
('2024-11-23','11:30:00','Seguimiento de operación de cadera','4','12'),
('2024-11-24','15:00:00','Tratamiento de migraña','5','13');


