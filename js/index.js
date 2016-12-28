function changeIdValue(value, id) {
    $(id).html(value);
}

function cambiar() {
    if ($('#game').html() == "") {
        window.location.replace($('#game').html() + ".html");
    } else {
        alert("no has seleccionado juego");
    }

}