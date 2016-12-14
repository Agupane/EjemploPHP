<?php
require ("DAO/database.php");
class tareaDAO
{
    public static $instancia;
    public static function getInstance()
    {
        if (self::$instancia === null) {
            self::$instancia = new self();
        }
        return self::$instancia;
    }


    /**
     * Devuelve todas las tareas en formato JSON
     * @return bool|mysqli_result|string
     */
    public function getAllJSON(){
        $query="SELECT idTarea AS id,descripcion,minutosTrabajados,horasEstimadas,responsable AS nombreResponsable,
        idProyecto,prioridad,finalizada FROM tarea WHERE eliminada = false ORDER BY idTarea ASC ";
        $db = Database::getConnection();
        $resultado = $db -> query($query);
        if($resultado){
            $resultado = $this->sqlToJSON($resultado);
            return $resultado;
        }
        else
        {
            return "Se produjo un error en la consulta SQL";
        }
    }

    /** Devuelve la tarea con el id parametro en formato JSON*/
    public function getByIdJSON($idTarea){
        $query="SELECT idTarea AS id,descripcion,minutosTrabajados,horasEstimadas,responsable AS nombreResponsable,
        idProyecto,prioridad,finalizada FROM tarea WHERE eliminada = false AND idTarea= ".$idTarea." ORDER BY idTarea ASC ";
        $db = Database::getConnection();
        $resultado = $db -> query($query);
        if($resultado){
            $resultado = $this->sqlToJSON($resultado);
            return $resultado;
        }
        else
        {
            return "Se produjo un error en la consulta SQL";
        }
    }
    /**
     * Devuelve todas las tareas del proyecto seleccionado en formato JSON
     * @return bool|mysqli_result|string
     */
    public function getByProyectIdJSON($idProyecto){
        $query="SELECT idTarea AS id,descripcion,minutosTrabajados,horasEstimadas,responsable AS nombreResponsable,
        idProyecto,prioridad,finalizada FROM tarea WHERE eliminada = false AND idProyecto = ".$idProyecto." ORDER BY idTarea ASC ";
        $db = Database::getConnection();
        $resultado = $db -> query($query);
        if($resultado){
            $resultado = $this->sqlToJSON($resultado);
            return $resultado;
        }
        else
        {
            return "Se produjo un error en la consulta SQL";
        }
    }
    /**
     * Transforma el resultado de una consulta SQL a formato JSON
     * @param sqlResult
     */
    private function sqlToJSON($sqlResult){
        $rows = array();
        while($r = mysqli_fetch_assoc($sqlResult)) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }

    /** Marca como eliminada la tarea con id parametro */
    public function deleteById($idTarea){
        $query = "UPDATE tarea SET eliminada = true WHERE idTarea=".$idTarea;
        $db = Database::getConnection();
        $resultado = $db -> query($query);
        if($resultado){
            return $resultado;
        }
        else
        {
            return "Se produjo un error en la consulta SQL";
        }
    }

    /**
     * Recibe una tarea en formato array asociativo y la guarda en la bdd
     * @param $nuevaTarea
     */
    public function newTarea($nuevaTarea){
        $id_tarea = $nuevaTarea["id"];
        $descripcion= $nuevaTarea["descripcion"];
        $minutosTrabajados= $nuevaTarea["minutosTrabajados"];
        $horasEstimadas= $nuevaTarea["horasEstimadas"];
        $nombreResponsable= $nuevaTarea["nombreResponsable"];
        $idProyecto= $nuevaTarea["idProyecto"];
        $prioridad= $nuevaTarea["prioridad"];
        $finalizada= $nuevaTarea["finalizada"];


        $db = Database::getConnection();
        $query="INSERT INTO tarea
        (descripcion,responsable,minutosTrabajados,horasEstimadas,prioridad,finalizada,eliminada,idProyecto)
        VALUES ('$descripcion','$nombreResponsable','$minutosTrabajados','$horasEstimadas','$prioridad','$finalizada',false,$idProyecto) ";
        $resultado = $db->query($query);
        return $db->insert_id;
    }
    /**
     * Recibe una tarea en formato array asociativo y actualiza los datos en la bdd
     * @param $tareaAEditar
     */
    public function updateTarea($tareaAEditar){
        $idTarea = $tareaAEditar["id"];
        $descripcion= $tareaAEditar["descripcion"];
        $minutosTrabajados= $tareaAEditar["minutosTrabajados"];
        $horasEstimadas= $tareaAEditar["horasEstimadas"];
        $nombreResponsable= $tareaAEditar["nombreResponsable"];
        $idProyecto= $tareaAEditar["idProyecto"];
        $prioridad= $tareaAEditar["prioridad"];
        $finalizada= $tareaAEditar["finalizada"];

        $db = Database::getConnection();
        $query="UPDATE tarea SET descripcion =\"".$descripcion."\"".",responsable=\"".$nombreResponsable."\",minutosTrabajados="
        .$minutosTrabajados.",horasEstimadas=".$horasEstimadas.",prioridad=\"".$prioridad."\"".",finalizada=".$finalizada.
        ",idProyecto=".$idProyecto." WHERE idTarea=".$idTarea;

        $resultado = $db->query($query);
        return $db->affected_rows;
    }
}