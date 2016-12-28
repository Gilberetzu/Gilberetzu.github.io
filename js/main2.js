function game2() {
    var menu = document.getElementById('menu');
    menu.style.display = 'none';
    var CV = document.getElementById('canvas3');
    var context = CV.getContext('2d');
    var width = window.innerWidth - 50;
    var heigth = window.innerHeight - 50;
    var centerx = width / 2;
    var centery = heigth / 2;

    CV.setAttribute("width", width);
    CV.setAttribute("height", heigth);
}

function atrass() {
    window.location.replace("index.html");
}