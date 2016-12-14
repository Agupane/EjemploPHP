<?php

/**
 * Created by PhpStorm.
 * User: Agustin
 * Date: 12/08/2016
 * Time: 5:47 PM
 */
class tarea
{
    private $id_tarea;
    private $descripcion;
    private $minutosTrabajados;
    private $horasEstimadas;
    private $nombreResponsable;
    private $idProyecto;
    private $prioridad;
    private $finalizada;

    /**
     * @return mixed
     */
    public function getIdTarea()
    {
        return $this->id_tarea;
    }

    /**
     * @param mixed $id_tarea
     */
    public function setIdTarea($id_tarea)
    {
        $this->id_tarea = $id_tarea;
    }

    /**
     * @return mixed
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * @param mixed $descripcion
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;
    }

    /**
     * @return mixed
     */
    public function getMinutosTrabajados()
    {
        return $this->minutosTrabajados;
    }

    /**
     * @param mixed $minutosTrabajados
     */
    public function setMinutosTrabajados($minutosTrabajados)
    {
        $this->minutosTrabajados = $minutosTrabajados;
    }

    /**
     * @return mixed
     */
    public function getHorasEstimadas()
    {
        return $this->horasEstimadas;
    }

    /**
     * @param mixed $horasEstimadas
     */
    public function setHorasEstimadas($horasEstimadas)
    {
        $this->horasEstimadas = $horasEstimadas;
    }

    /**
     * @return mixed
     */
    public function getNombreResponsable()
    {
        return $this->nombreResponsable;
    }

    /**
     * @param mixed $nombreResponsable
     */
    public function setNombreResponsable($nombreResponsable)
    {
        $this->nombreResponsable = $nombreResponsable;
    }

    /**
     * @return mixed
     */
    public function getIdProyecto()
    {
        return $this->idProyecto;
    }

    /**
     * @param mixed $idProyecto
     */
    public function setIdProyecto($idProyecto)
    {
        $this->idProyecto = $idProyecto;
    }

    /**
     * @return mixed
     */
    public function getPrioridad()
    {
        return $this->prioridad;
    }

    /**
     * @param mixed $prioridad
     */
    public function setPrioridad($prioridad)
    {
        $this->prioridad = $prioridad;
    }

    /**
     * @return mixed
     */
    public function getFinalizada()
    {
        return $this->finalizada;
    }

    /**
     * @param mixed $finalizada
     */
    public function setFinalizada($finalizada)
    {
        $this->finalizada = $finalizada;
    }

}