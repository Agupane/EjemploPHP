/**
 * Created by Agustin on 12/06/2016.
 */
var itemNuevaTarea,tareaSelected,indexTareaSelected;
var nombreProyectoSeleccionado = "proyecto 1";
var idProyectoSelected = 1;
var editandoTarea=false;
var listaTareas = [];

/** Asigna los listeners a los componentes HTML */
function cargarComponentes() {
    cargarTareas();
    $("#menuTop").load("menuTop.html");
    $("#tituloNombreProyecto").text("Listando tareas del proyecto:  ");
    $("#nombreProyecto").text(nombreProyectoSeleccionado);

    /** Listener que abre la ventana modal de creacion de tarea */
    $("#btnAddTarea").click (function() {
        jQuery.noConflict();
        $("#modalNuevaTarea").modal("show");
    });
    /** Recibe evento de click en tarea de la tabla */
    $("#tablaTareas").on("click","tr",function() {
        indexTareaSelected = $(this).index();
        itemTareaSelected(indexTareaSelected);
    });
    /** Listener para borrar la tarea seleccionada */
    $("#btnBorrarTarea").click (function(){
        borrarTarea(indexTareaSelected);
    });
}
/*
 * Busca con AJAX las tareas al backend del proyecto X y luego
 * Carga todas las tareas del array de tareas en la tabla de tareas
 */
function cargarTareas(){
    $.ajax({
        type: "GET",
        url:"../php/gestorTareas.php",
        data: {"idTarea":"all","idProyecto":idProyectoSelected},
        success: function (datos){
            listaTareas = JSON.parse(datos);
            for (var i = 0, len = listaTareas.length; i < len; i++) {
                var tareaI = listaTareas[i];
                agregarTareaATabla(tareaI);
            }
        }
    });
}
/** Asigna el listener al boton de crear / editar tarea */
/** Si lo que se hace es crear una nueva tarea ejecuta nueva tarea, de lo contrario ejecuta
 *  Editar tarea
 */
function btnAgregarEditarPressed(){
    if(editandoTarea) {
        editarTarea(indexTareaSelected);
    }
    else{
        nuevaTarea();
    }
}
/** Evento que se ejecuta cuando se selecciona una fila de la tabla
 *  Crea la fila de la tarea que se selecciono en una pantalla modal */
function itemTareaSelected(indiceTarea){
    tareaSelected = listaTareas[indiceTarea];
    var itemTareaSelected;
    if(tareaSelected.finalizada){
        finalizada = "Si";
    }
    else
    {
        finalizada = "No";
    }
    itemTareaSelected =
        "<tr id=\"tablaTareaSelected\">" +
        "<td>" +
        tareaSelected.id+
        "</td>" +
        "<td>" +
        tareaSelected.descripcion+
        "</td>" +
        "<td>" +
        tareaSelected.nombreResponsable+
        "</td>" +
        "<td>" +
        tareaSelected.minutosTrabajados+
        "</td>" +
        "<td>" +
        tareaSelected.horasEstimadas+
        "</td>" +
        "<td>" +
        finalizada+
        "</td>"+
        "</tr>";
    $("#tablaTareaSelected").replaceWith(itemTareaSelected);
    jQuery.noConflict();
    $("#modalTareaSelected").modal("show");
}
/** Recibe una tarea por parametro y la inserta en la tabla de tareas */
function agregarTareaATabla(nuevaTarea){
    var finalizada,rowFinalizada;
    switch(nuevaTarea.prioridad) {
        case "Alta":
        {
            rowFinalizada = "<tr class=\"danger\">";
            break;
        }
        case "Media":
        {
            rowFinalizada = "<tr class=\"success\">";
            break;
        }
        case "Baja":
        {
            rowFinalizada = "<tr class=\"warning\">";
        }
    }
    if(nuevaTarea.finalizada == 0){
        finalizada = "No";
    }
    else
    {
        finalizada = "Si";
    }
    itemNuevaTarea =
        rowFinalizada +
        "<td>" +
        nuevaTarea.id+
        "</td>" +
        "<td>" +
        nuevaTarea.descripcion+
        "</td>" +
        "<td>" +
        nuevaTarea.nombreResponsable+
        "</td>" +
        "<td>" +
        nuevaTarea.minutosTrabajados+
        "</td>" +
        "<td>" +
        nuevaTarea.horasEstimadas+
        "</td>" +
        "<td>" +
        finalizada+
        "</td>" +
        "</tr>";
    $("#tablaTareas").append(itemNuevaTarea);
}
/** Determina si se desea editar una tarea o si se esta creando una nueva
 *  Si recibe un false significa que hay que editar una tarea, de lo contrario crear una nueva
 */
function editarONuevaTarea(editarTarea){
    editandoTarea=editarTarea;
    if(editarTarea){
        var tarea = listaTareas[indexTareaSelected];
        $("#btnDialogNuevaTarea").text("Editar tarea");
        $("#modalNuevaTareaTittle").text("Editando tarea");

        /** Escondo el dialog modal */
        $("#modalTareaSelected").modal("hide");
        $("#inputDescripcionTarea").val(tarea.descripcion);
        $("#inputResponsable").val(tarea.nombreResponsable);
        $("#inputPrioridad").val(tarea.prioridad).change();
        $("#inputHorasEstimadas").val(tarea.horasEstimadas);
        $("#modalNuevaTarea").modal("show");
    }
    else{
        $("#btnDialogNuevaTarea").text("Nueva tarea");
        $("#modalNuevaTareaTittle").text("Nueva tarea");
        $("#inputNombreTarea").val("");
        $("#inputResponsable").val("");
        $("#inputHorasEstimadas").val("");
        $("#inputPrioridad").val("");
    }
}
/** Crea una nueva tarea basada en los datos de los inputs */
function nuevaTarea(){
    $("#modalNuevaTarea").modal("hide");
    var descripcionTarea = $("#inputDescripcionTarea").val();
    var responsableTarea = $("#inputResponsable").val();
    var horasEstimadasTarea = $("#inputHorasEstimadas").val();
    var prioridadTarea = $("#inputPrioridad").val();
    var idTarea = "";
    var nuevaTarea= {
        id:idTarea,
        descripcion:descripcionTarea,
        minutosTrabajados:"0",
        horasEstimadas:horasEstimadasTarea,
        nombreResponsable:responsableTarea,
        idProyecto:idProyectoSelected,
        prioridad:prioridadTarea,
        finalizada:false
    };
    var tareaString = JSON.stringify(nuevaTarea);
    $.ajax({
        type: "POST",
        url:"../php/gestorTareas.php",
        data: {"nuevaTarea":tareaString},
        success: function (respuesta){
            nuevaTarea.id = respuesta; // Asigno el id que se auto genero

            /* Agrego la nueva tarea a la tabla sin volver a listar todas las tareas para mejorar performance*/
            //agregarTareaATabla(nuevaTarea);
        },
        error: function () {
            console.log("Error");
        }
    })
    regenerarTablaTareas();
    $("#inputDescripcionTarea").val("");
    $("#inputResponsable").val("");
    $("#inputHorasEstimadas").val("");
    $("#inputPrioridad").val("");
    $("#modalNuevaTareaTittle").text("");
}
/** Recibe el indice de la tarea a eliminar y la borra */
function borrarTarea(indiceTarea){
    var idTarea = listaTareas[indiceTarea].id;
    $.ajax({
        type: "POST",
        url:"../php/gestorTareas.php",
        data: {"idTarea":idTarea,eliminada:true},
        success: function (respuesta){
        },
        error: function () {
           console.log("se produjo un error");
        }
    })
    regenerarTablaTareas();
}
function editarTarea(indiceTarea){
    var descripcionTarea = $("#inputDescripcionTarea").val();
    var responsableTarea = $("#inputResponsable").val();
    var horasEstimadasTarea = $("#inputHorasEstimadas").val();
    var prioridadTarea = $("#inputPrioridad").val();
    var tareaAEditar = listaTareas[indiceTarea];
    tareaAEditar.descripcion=descripcionTarea;
    tareaAEditar.horasEstimadas = horasEstimadasTarea;
    tareaAEditar.nombreResponsable = responsableTarea;
    tareaAEditar.prioridad = prioridadTarea;

    var tareaString = JSON.stringify(tareaAEditar);
    $.ajax({
        type: "POST",
        url:"../php/gestorTareas.php",
        data: {"editarTarea":tareaString},
        success: function (respuesta){
        },
        error: function () {
            console.log("Error");
        }
    })
    //agregarTareaATabla(nuevaTarea);
    /** Regenero la tabla de tareas */
    regenerarTablaTareas();
    $("#modalNuevaTarea").modal("hide");
}
/**
 * Actualiza la tabla de tareas con la lista de tareas
 */
function regenerarTablaTareas(){
    var tablaNueva = $("<tbody id=\"tablaTareas\">"+ "</tbody>");
    var tablaVieja= $("#tablaTareas");
    tablaVieja.replaceWith(tablaNueva);
    /** Asigno el listener de click en la tarea*/
    $( "#tablaTareas" ).on( "click", "tr", function() {
        indexTareaSelected = $(this).index();
        itemTareaSelected($(this).index());
    });
    /** Escondo el dialog modal */
    $("#modalTareaSelected").modal("hide");
    /** Regenero la tabla de tareas */
    cargarTareas();
}