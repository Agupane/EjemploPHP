create table proyecto(
  idProyecto integer AUTO_INCREMENT,
  nombre varchar(50),
  eliminado boolean,
  constraint pk_proyecto primary key (idproyecto));

create table tarea (
idTarea integer AUTO_INCREMENT,
descripcion varchar(50),
responsable varchar(50),
minutosTrabajados float,
horasEstimadas float,
prioridad varchar(50),
finalizada boolean,
eliminada boolean,
idProyecto integer,
constraint pk_tarea primary key (idTarea),
constraint fk_idProyecto foreign key (idProyecto) references proyecto(idProyecto));

