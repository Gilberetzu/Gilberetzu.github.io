function changeIdValue(value, id) {
    $(id).html(value);
}

function cambiar() {
    if ($('#game').text() != "-") {
        window.location.replace($('#game').html() + ".html");
    } else {
        alert("no has seleccionado juego");
    }
}