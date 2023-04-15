-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Creación de la tabla usuarios
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
CREATE TABLE `cancha_sintetica`.`usuarios` (
  `IdUsuario` CHAR(36) NOT NULL DEFAULT (UUID()) COMMENT 'Identificador principal de la tabla',
  `Usuario` VARCHAR(200) NOT NULL COMMENT 'Nombre del usuario.',
  `Password` VARCHAR(200) NOT NULL COMMENT 'Contrasena del usuario.',
  `Celular` VARCHAR(50) NULL COMMENT 'Telefono del usuario.',
  `Correo` VARCHAR(200) NULL COMMENT 'Celular del usuario.',
  `IndicadorHabilitado` TINYINT(1) NOT NULL COMMENT 'Indica si el registro se encuentra habilitado (1) o no (0)',
  PRIMARY KEY (`IdUsuario`),
  UNIQUE INDEX `UK_Usuario` (`Usuario` ASC),
  UNIQUE INDEX `UK_Correo` (`Correo` ASC),
  UNIQUE INDEX `UK_Celular` (`Celular` ASC))
COMMENT = 'Guarda la información de los usuarios';