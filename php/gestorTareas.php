<?php
    require ("DAO/tareaDAO.php");
    $gestorTareas = gestorTareas::getInstance();
    switch($_SERVER["REQUEST_METHOD"]){
        case "POST":{
            /** Si es un post para eliminar una tarea */
            if(isset($_POST["idTarea"]) && isset($_POST["eliminada"])) {
                $idTarea = $_POST["idTarea"];
                $eliminar = $_POST["eliminada"];
                $gestorTareas->deleteById($idTarea);
            }
            else{
                /** Si es un post para CREAR una tarea */
                if(isset($_POST["nuevaTarea"])){
                    $nuevaTarea = $_POST["nuevaTarea"];
                    $nuevaTarea= json_decode($nuevaTarea, true);
                    $gestorTareas->newTarea($nuevaTarea);
                }
                else{
                    /** Si es un post para EDITAR una tarea */
                    if(isset($_POST["editarTarea"])){
                        $tareaAEditar = $_POST["editarTarea"];
                        $tareaAEditar = json_decode($tareaAEditar, true);
                        $gestorTareas->updateTarea($tareaAEditar);
                    }
                }
            }
            break;
        }
        case "GET":{
            $idTarea = $_GET["idTarea"];
            $idProyecto = $_GET["idProyecto"];
            /** Si la solicitud es idTarea=ALL entonces devuelve todas */
            if (strcmp ($idTarea , "all" ) == 0){
                $gestorTareas = gestorTareas::getInstance();
                if (strcmp ($idProyecto , "all" ) == 0){
                    $gestorTareas->listarTareas();
                }
                else{
                    $gestorTareas->listarTareasProyecto($idProyecto);
                }
            }
            /** De lo contrario devuelve la tarea con su id */
            else{
                $gestorTareas->getById($idTarea);
            }
            break;
        }
    }


class gestorTareas{

    public static $instancia;
    public static function getInstance()
    {
        if (self::$instancia === null) {
            self::$instancia = new self();
        }
        return self::$instancia;
    }

    public function listarTareas(){
        $tareaDAO = tareaDAO::getInstance();
        $tareas = $tareaDAO->getAllJSON();
        /** Si el resultado es string entonces significa que ocurrio un error */
        if ( is_string($tareas) ){
            $results = array(
                'error' => true,
                'error_msg' => $tareas,
                'data' => ""
            );
        }
        else {
            $results = array(
                'error' => false,
                'error_msg' => 'Result OK',
                'data' => $tareas
            );
        }
        echo $tareas;
    }
    public function listarTareasProyecto($idProyecto){
        $tareaDAO = tareaDAO::getInstance();
        $tareas = $tareaDAO->getByProyectIdJSON($idProyecto);
        /** Si el resultado es string entonces significa que ocurrio un error */
        if ( is_string($tareas) ){
            $results = array(
                'error' => true,
                'error_msg' => $tareas,
                'data' => ""
            );
        }
        else {
            $results = array(
                'error' => false,
                'error_msg' => 'Result OK',
                'data' => $tareas
            );
        }
        echo $tareas;
    }

    public function deleteById($idTarea){
        $tareaDAO = tareaDAO::getInstance();
        $tareas = $tareaDAO->deleteById($idTarea);
        /** Si el resultado es string entonces significa que ocurrio un error */
        if ( is_string($tareas) ){
            $results = array(
                'error' => true,
                'error_msg' => $tareas,
                'data' => ""
            );
        }
        else {
            $results = array(
                'error' => false,
                'error_msg' => 'Result OK',
                'data' => $tareas
            );
        }
        echo $tareas;
    }
    public function newTarea($nuevaTarea){
        $tareaDAO = tareaDAO::getInstance();
        $tarea = $tareaDAO->newTarea($nuevaTarea);
        /** Si el resultado es string entonces significa que ocurrio un error */
        if ( is_string($tarea) ){
            $results = array(
                'error' => true,
                'error_msg' => $tarea,
                'data' => ""
            );
        }
        else {
            $results = array(
                'error' => false,
                'error_msg' => 'Result OK',
                'data' => $tarea
            );
        }
        echo $tarea;
    }
    public function updateTarea($tareaAEditar){
        $tareaDAO = tareaDAO::getInstance();
        $tarea = $tareaDAO->updateTarea($tareaAEditar);
        /** Si el resultado es string entonces significa que ocurrio un error */
        if ( is_string($tarea) ){
            $results = array(
                'error' => true,
                'error_msg' => $tarea,
                'data' => ""
            );
        }
        else {
            $results = array(
                'error' => false,
                'error_msg' => 'Result OK',
                'data' => $tarea
            );
        }
        echo $tarea;
    }
}
?>