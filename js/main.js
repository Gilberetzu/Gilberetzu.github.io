function todo(col, fil, numh, probH){

    var menu = document.getElementById('menu');
    menu.style.display = 'none';
    var CV = document.getElementById('canvas3');
    var context = CV.getContext('2d');
    var width = window.innerWidth-50;
    var heigth = window.innerHeight-50;
    var centerx = width/2;
    var centery = heigth/2;
    
    CV.setAttribute("width", width);
    CV.setAttribute("height", heigth);

    var S = 20;
    var win = 0;

    function mundo_rect(a, b){
        euri = [];
        var y = 0;
        for (var i = 0; i < a*b; i++)
        {
            euri.push(["pasto", i%a*S, y*S]);
            if (i%a === a-1){
                y = y+1;
            }
        }
        
        return euri;
    }
    
    function mundo_hongo(a, b){
        euri = [];
        var y = 0;
        var count = 0;
        for (var i = 0; i < a*b; i++)
        {
            if(Math.random() <= probH){
                euri.push(["hongo", i%a*S, y*S,count]);
                count = count + 1;
            }
            if (i%a === a-1){
                y = y+1;
            }
            if (count == numh){
                break;
            }
        }
        win = 5*count;
        return euri;
    }
    
    worlda = mundo_rect(col, fil);

    hongoa = mundo_hongo(col, fil);

    function Player( name, posX, posY, radius) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
    }

    var player1 = new Player("euri", 500, 500,5);

    function worldRenderer(world,Px, Py){
        var renderizar = [];
        for ( var i = 0; i < world.length; i++){
            if (Math.abs(world[i][1] - Px) <= (width/2)*sc+50 && Math.abs(world[i][2] - Py) <= (width/2)*sc+50){
                renderizar.push(world[i]);
            }
        }
        return renderizar;
    }

    function worldPixels(WR, PosX, PosY){
        var wpixels = [];
        for (var i=0; i < WR.length; i++){
            wpixels.push([WR[i][0],(WR[i][1]-PosX)*(1/sc)+centerx,(WR[i][2]-PosY)*(1/sc)+centery]) 
        }
        return wpixels;
    }
    
    render();

    function buscarAngulo(mXa,mYa,centerxa,centerya){
        var ang;
        if((mXa >= centerxa) && (mYa <= centerya)){
            ang = Math.atan((centerya-mYa)/(mXa-centerxa));
        }else if((mXa <= centerxa) && (mYa <= centerya)){
            ang = Math.atan((centerxa-mXa)/(centerya-mYa)) + Math.PI/2;
        }else if((mXa <= centerxa) && (mYa >= centerya)){
            ang = Math.atan((mY-centerya)/(centerxa-mXa)) + Math.PI;
        }else if((mXa >= centerxa) && (mYa >= centerya)){
            ang = Math.atan((mXa-centerxa)/(mYa-centerya)) + Math.PI*(3/2);
        }
        return ang;
    }

    function pMove(){
        var r = Math.sqrt((mX-centerx)*(mX-centerx)+(mY-centery)*(mY-centery));
        var ang;
        var vel;
        if (mX == 500){
            mX = 501;
        }
        if (mY == 500){
            mY = 501;
        }
        
        ang = buscarAngulo(mX,mY,centerx,centery);
        if (r >= 20) {
            vel = 2;
        }else {
            vel = 0;
        }
        player1.posX = player1.posX + vel*Math.cos(ang);
        player1.posY = player1.posY - vel*Math.sin(ang);
    }

    function pPlayer(){
        if(player1.posX <= player1.radius){
            player1.posX = player1.radius;
        }
        if(player1.posX >= col*S - player1.radius){
            player1.posX = col*S - player1.radius;
        }
        if(player1.posY <= player1.radius){
            player1.posY = player1.radius;
        }
        if(player1.posY >= fil*S - player1.radius){
            player1.posY = fil*S - player1.radius;
        } 
    }

    function render(){
        pMove();
        pPlayer();
        context.clearRect(0, 0, CV.width, CV.height);
        worldR = worldRenderer(worlda,player1.posX, player1.posY);
        worldPix = worldPixels(worldR,player1.posX, player1.posY);
        for (var i = 0; i < worldPix.length; i++){
            if (worldPix[i][0] == "pasto") {
                context.drawImage(pasto,worldPix[i][1],worldPix[i][2],S*(1/sc),S*(1/sc));
            }
        }
        worldR = worldRenderer(hongoa,player1.posX, player1.posY);
        for(var i = 0; i < worldR.length; i++){
            var ra = Math.sqrt((worldR[i][1]-player1.posX)*(worldR[i][1]-player1.posX) + (worldR[i][2]-player1.posY)*(worldR[i][2]-player1.posY));
            var angu = buscarAngulo(worldR[i][1],worldR[i][2],player1.posX,player1.posY);
            if (ra <= 25 + player1.radius /*&& (angu >= Math.PI/2 && angu <= Math.PI)*/){
                hongoa[worldR[i][3]] = ["hongo", -10000 , -10000 ,worldR[i][3]];
                puntos = puntos + 5;
                player1.radius = player1.radius + 1;
            }
        }
        worldPix = worldPixels(worldR,player1.posX, player1.posY);
        for (var i = 0; i < worldPix.length; i++){
            if (worldPix[i][0] == "hongo") {
                context.drawImage(hongo,worldPix[i][1],worldPix[i][2],S*(1/sc),S*(1/sc));
            }
        }
        context.beginPath();
        context.arc(centerx,centery,player1.radius*(1/sc),0,Math.PI*2);
        context.fillStyle = 'red';
        context.fill();
        context.stroke();
        $('#Puntuacion').html("Puntuacion " + puntos);
        if( puntos < win){
            requestAnimationFrame(render);
        }else {
            gameover();
        }
    }
    
}
function mouseC(event){
    mX = event.clientX;
    mY = event.clientY;
}
/*function mouseCl(){
    mX = 503;
    mY = 503;
}*/

var mX = 503;
var mY = 503;
var sc = 1/4;
var mM = document.getElementById('canvas3');
mM.setAttribute("onmousemove","mouseC(event)");
/*mM.setAttribute("onmouseout","mouseCl()"); */

function changeIdValue(value,id){
    $(id).html(value);
}
$('#name').focusout(function(){
    $('#nombre').html($('#name').val());
})
var pasto = new Image();
pasto.src = './img/pasto.png';
var hongo = new Image();
hongo.src = './img/hongo.png';

function begin(){
    var colum;
    var fila;
    var numhon;
    var probHon;
    if($('#tamaño').html() == 'Grande'){
        colum = 150;
        fila = 150;
    }else if($('#tamaño').html() == "Mediano"){
        colum = 100;
        fila = 100;
    }else if($('#tamaño').html() == "Pequeño"){
        colum = 50;
        fila = 50;
    }else {
        colum = 50;
        fila = 50;
    }
    if($('#hongo').html() == 'Grande'){
        numhon = 400;
        probHon = 0.08;
    }else if($('#hongo').html() == "Mediano"){
        numhon = 300;
        probHon = 0.05;
    }else if($('#hongo').html() == "Pequeño"){
        numhon = 200;
        probHon = 0.03;
    }else {
        numhon = 200;
        probHon = 0.03;
    }
    $("#nameA").css({visibility: 'visible', left: window.innerWidth/2-25});
    var nombrep = $('#nombre').html();
    $('#nameA').html(nombrep)
    $("#Puntuacion").css({visibility: 'visible', left: window.innerWidth/2-25, top: window.innerHeight-50});
    $('#Puntuacion').html("Puntuacion " + puntos);
    todo(colum,fila, numhon, probHon);
}

var worlda = [];
var hongoa = [];
var puntos = 0;

function gameover(){
    var pun = document.getElementById('GO');
    pun.style.visibility = 'visible';
    var pun = document.getElementById('GOT');
    pun.style.visibility = 'visible';
}