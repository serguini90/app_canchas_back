-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Creación de la tabla usuarios
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
CREATE TABLE `cancha_sintetica`.`usuarios` (
  `IdUsuario` CHAR(36) NOT NULL DEFAULT (UUID()) COMMENT 'Identificador principal de la tabla',
  `Usuario` VARCHAR(200) NOT NULL COMMENT 'Nombre del usuario.',
  `Password` VARCHAR(200) NOT NULL COMMENT 'Contrasena del usuario.',
  `Celular` VARCHAR(50) NULL COMMENT 'Telefono del usuario.',
  `Correo` VARCHAR(200) NULL COMMENT 'Celular del usuario.',
  `IndicadorProveedor` TINYINT(1) NOT NULL COMMENT 'Indica si el usuario es un proovedor de canchas',
  `IndicadorHabilitado` TINYINT(1) NOT NULL COMMENT 'Indica si el registro se encuentra habilitado (1) o no (0)',
  PRIMARY KEY (`IdUsuario`),
  UNIQUE INDEX `UK_Usuario` (`Usuario` ASC),
  UNIQUE INDEX `UK_Correo` (`Correo` ASC),
  UNIQUE INDEX `UK_Celular` (`Celular` ASC))
COMMENT = 'Guarda la información de los usuarios';


-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Creación de la tabla canchas
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
CREATE TABLE `cancha_sintetica`.`canchas` (
  `IdCancha` CHAR(36) NOT NULL DEFAULT (UUID()) COMMENT 'Identificador principal de la tabla',
  `IdUsuario` CHAR(36) NOT NULL COMMENT 'IdUsuario',
  `CantidadJugadores` INT(11) NULL COMMENT 'CantidadJugadores',
  `Precio` INT(11) NULL COMMENT 'Precio',
  `Direccion` VARCHAR(500) NULL COMMENT 'Dirección de la cancha',
  `IndicadorHabilitado` TINYINT(1) NOT NULL COMMENT 'Indica si el registro se encuentra habilitado (1) o no (0)',
  PRIMARY KEY (`IdCancha`),
  INDEX `IX_Usuarios_IdUsuario` (`IdUsuario` ASC),
  CONSTRAINT `FK_Usuarios_IdUsuario`
    FOREIGN KEY (`IdUsuario`)
    REFERENCES `cancha_sintetica`.`usuarios` (`IdUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Guarda la información de las canchas';

-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Creación de la tabla canchas horarios
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
CREATE TABLE `cancha_sintetica`.`canchashorarios` (
  `IdCanchaHorario` CHAR(36) NOT NULL DEFAULT (UUID()) COMMENT 'Identificador principal de la tabla',
  `IdCancha` CHAR(36) NOT NULL COMMENT 'IdCancha',
  `HoraInicio` VARCHAR(50) NULL COMMENT 'HoraInicio',
  `HoraFin` VARCHAR(50) NULL COMMENT 'HoraFin',
  `IndicadorHabilitado` TINYINT(1) NOT NULL COMMENT 'Indica si el registro se encuentra habilitado (1) o no (0)',
  PRIMARY KEY (`IdCanchaHorario`),
  INDEX `IX_Cancha_IdCancha` (`IdCancha` ASC),
  CONSTRAINT `FK_Cancha_IdCancha`
    FOREIGN KEY (`IdCancha`)
    REFERENCES `cancha_sintetica`.`canchas` (`IdCancha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Guarda la información de los horarios de las canchas';

-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Creación de la tabla listas medios pagos
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
CREATE TABLE `cancha_sintetica`.`listasmediospagos` (
  `IdLista` CHAR(36) NOT NULL DEFAULT (UUID()) COMMENT 'Identificador principal de la tabla',
  `Codigo` VARCHAR(50) NOT NULL COMMENT 'Código único del ítem de la lista.',
  `Nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre del Item de la lista.',
  `IndicadorHabilitado` TINYINT(1) NOT NULL COMMENT 'Indica si el registro se encuentra habilitado (1) o no (0)',
  PRIMARY KEY (`IdLista`),
  UNIQUE INDEX `UK_Codigo` (`Codigo` ASC))
COMMENT = 'Contiene una lista de los medios de pago';


-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Creación de la tabla reservas
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
CREATE TABLE `cancha_sintetica`.`reservas` (
  `IdReserva` CHAR(36) NOT NULL DEFAULT (UUID()) COMMENT 'Identificador principal de la tabla',
  `IdUsuario` CHAR(36) NOT NULL COMMENT 'IdUsuario',
  `Fecha` DATETIME NOT NULL COMMENT 'Fecha de la reserva',
  `IdCanchaHorario` CHAR(36) NOT NULL COMMENT 'IdCanchaHorario',
  `IdMedioPago` CHAR(36) NOT NULL COMMENT 'IdMedioPago',
  `IndicadorHabilitado` TINYINT(1) NOT NULL COMMENT 'Indica si el registro se encuentra habilitado (1) o no (0)',
  PRIMARY KEY (`IdReserva`),
  INDEX `IX_Usuarios_IdUsuario` (`IdUsuario` ASC),
  INDEX `IX_CanchasHorarios_IdCanchaHorario` (`IdCanchaHorario` ASC),
  INDEX `IX_CanchasHorarios_IdMedioPago` (`IdMedioPago` ASC),
  CONSTRAINT `FK_CanchasHorarios_IdCanchaHorario`
    FOREIGN KEY (`IdCanchaHorario`)
    REFERENCES `cancha_sintetica`.`canchashorarios` (`IdCanchaHorario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Usuarios_Reservas_IdUsuario`
    FOREIGN KEY (`IdUsuario`)
    REFERENCES `cancha_sintetica`.`usuarios` (`IdUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_ListasMediosPagos_IdLista`
    FOREIGN KEY (`IdMedioPago`)
    REFERENCES `cancha_sintetica`.`listasmediospagos` (`IdLista`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Guarda la información de las canchas';