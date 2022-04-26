
var mass1 = 1;
var velocityx1 = 1.2;
var velocityy1 = 0;
var positionx1 = 500;
var positiony1 = 0;
var ball1 = document.getElementById("ball1");

function move1()
{
    positionx1+=velocityx1;
    positiony1+=velocityy1;
    ball1.style.left = positionx1 + 'px';
    ball1.style.top = positiony1 + 'px';
}

var mass2 = 1000;
var velocityx2 = 0;
var velocityy2 = 0;
var positionx2 = 500;
var positiony2 = 300;
var ball2 = document.getElementById("ball2");

function move2()
{
    positionx2+=velocityx2;
    positiony2+=velocityy2;
    ball2.style.left = positionx2 + 'px';
    ball2.style.top = positiony2 + 'px';
}

function gravity()
{
    var distantax = positionx2-positionx1;
    var distantay = positiony2-positiony1;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    var modul = mass1 * mass2 / distanta / distanta;
    velocityx1 -= modul / mass1 * distantax / distanta*-1;
    velocityy1 -= modul / mass1 * distantay / distanta*-1;
    velocityx2 -= modul / mass2 * distantax / distanta;
    velocityy2 -= modul / mass2 * distantay / distanta;
}

setInterval(gravity,1);
setInterval(move1,1);
setInterval(move2,1);