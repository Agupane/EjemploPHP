/**
 * Created by Agustin on 12/06/2016.
 */
var itemNuevaTarea,tareaSelected,indexTareaSelected;
var nombreProyectoSeleccionado = " proyecto 1";
var idProyectoSelected = 1;
var listaTareas = [{
    id:"1",
    nombre:"tarea1",
    minutosTrabajados:"1",
    horasEstimadas:"3",
    idResponsable:"2",
    idProyecto:"1",
    idPrioridad:"1",
    finalizada: false
},
    {
        id:"2",
        nombre:"tarea2",
        minutosTrabajados:"60",
        horasEstimadas:"1",
        idResponsable:"5",
        idProyecto:"2",
        idPrioridad:"2",
        finalizada: true
    }];


/** Asigna los listeners a los componentes HTML */
function cargarComponentes() {
    $("#menuTop").load("menuTop.html");
    $("#modalNuevaTarea").load("modalNuevaTarea.html");
    $("#tituloNombreProyecto").text("Listando tareas del proyecto:  ");
    $("#nombreProyecto").text(nombreProyectoSeleccionado);
    cargarTareas();

    /** Listener que abre la ventana modal de creacion de tarea */
    $("#btnAddTarea").click (function() {
        jQuery.noConflict();
        $("#modalNuevaTarea").modal("show");
    });
    /** Listener para borrar la tarea seleccionada */
    $("#btnBorrarTarea").click (function(){
        console.log("hicieron click");
        borrarTarea(indexTareaSelected);
    });

    /** Recibe evento de click en tarea de la tabla */
    $("#tablaTareas").on("click","tr",function() {
        indexTareaSelected = $(this).index();
        itemTareaSelected(indexTareaSelected);
    });
}
/** Carga todas las tareas del array de tareas en la tabla de tareas */
function cargarTareas(){
    for (var i = 0, len = listaTareas.length; i < len; i++) {
        var tareaI = listaTareas[i];
        agregarTareaATabla(tareaI);
    }
}
/** Evento que se ejecuta cuando se selecciona una fila de la tabla
 *  Crea la fila de la tarea que se selecciono en una pantalla modal */
function itemTareaSelected(indiceTarea){
    tareaSelected = listaTareas[indiceTarea];
    var itemTareaSelected;
    nombreResponsable = getNombreResponsable(tareaSelected.idResponsable);
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
        nombreResponsable+
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
/** Recibe el id del responsable y retorna su nombre */
function getNombreResponsable(idResponsable){
    return "Agustin";  //TODO TERMINAR
}
/** Recibe una tarea por parametro y la inserta en la tabla de tareas */
function agregarTareaATabla(nuevaTarea){
    var finalizada,rowFinalizada,nombreResponsable;
    nombreResponsable = getNombreResponsable(nuevaTarea.idResponsable);
    if(nuevaTarea.finalizada){
        finalizada = "Si";
        rowFinalizada = "<tr class=\"success\">";
    }
    else
    {
        finalizada = "No";
        rowFinalizada = "<tr class=\"danger\">";
    }
    itemNuevaTarea =
        rowFinalizada +
        "<td>" +
        nuevaTarea.id+
        "</td>" +
        "<td>" +
        nombreResponsable+
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
/** Crea una nueva tarea basada en los datos de los */
function nuevaTarea(){
    $("#modalNuevaTarea").modal("hide");
    var nombreTarea = $("#inputNombreTarea").val();
    var responsableTarea = $("#inputResponsable").val();
    var horasEstimadasTarea = $("#inputHorasEstimadas").val();
    var prioridadTarea = $("#inputPrioridad").val();
    var responsableTarea = $("#inputResponsable").val();
    var idTarea = listaTareas.length+1; // TODO MODIFICAR
    var nuevaTarea= {
        id:idTarea,
        nombre:nombreTarea,
        minutosTrabajados:"0",
        horasEstimadas:horasEstimadasTarea,
        idResponsable:responsableTarea,
        idProyecto:idProyectoSelected,
        idPrioridad:prioridadTarea,
        finalizada:false
    };
    listaTareas.push(nuevaTarea);
    agregarTareaATabla(nuevaTarea);
    $("#inputNombreTarea").val("");
    $("#inputResponsable").val("");
    $("#inputHorasEstimadas").val("");
    $("#inputPrioridad").val("");
}
/** Recibe el indice de la tarea a eliminar y la borra TODO TERMINAR */
function borrarTarea(indiceTarea){
    var tablaNueva = $("<tbody id=\"tablaTareas\">"+ "</tbody>");
    var tablaVieja= $("#tablaTareas");
    listaTareas.splice(indiceTarea, 1);
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