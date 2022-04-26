var ballz= [];

function rand(a, b)
{ 
    return a + Math.random() * b; 
}
//7680 x 3748
function makeBall()
{
    let bb = {};
    bb.mass = rand(1,1000);
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = rand(rad(bb)/2,7680-rad(bb)/2);
    bb.pozy = rand(rad(bb)/2,3698-rad(bb)/2);

    bb.getball=document.createElement("div");
    bb.getball.style.width = rad(bb) + 'px';
    bb.getball.style.height = rad(bb) + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.background ='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

    document.body.appendChild(bb.getball);
    return bb;
}

function rad(ball){return Math.cbrt(ball.mass) * 10}

function move(ball)
{
    ball.pozx += ball.velx;
    ball.pozy += ball.vely;
    ball.getball.style.left = ball.pozx-rad(ball)/2+'px';
    ball.getball.style.top = ball.pozy-rad(ball)/2+'px';
}

function create()
{
    for(let i=2;i<50;i++)
    {
        ballz.push(makeBall());
    }
}

function update()
{
    for(let i=0;i<ballz.length;i++)
    {
        move(ballz[i]);
    }
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=i+1;j<ballz.length;j++)
        {
            gravity(ballz[i],ballz[j]);
        }
    }
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=i+1;j<ballz.length;j++)
        {
            var distantax = ballz[j].pozx-ballz[i].pozx;
            var distantay = ballz[j].pozy-ballz[i].pozy;
            var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
            if(distanta<rad(ballz[i])/1.5+rad(ballz[j])/1.5)
            {
                merge(ballz[i],ballz[j]);
                ballz.splice(j, 1);
            }
        }
    }
}

function merge(ball1,ball2)
{
    ball2.getball.remove();
    ball1.velx = (ball1.mass * ball1.velx + ball2.mass * ball2.velx) / (ball1.mass + ball2.mass);
    ball1.vely = (ball1.mass * ball1.vely + ball2.mass * ball2.vely) / (ball1.mass + ball2.mass);
    ball1.mass += ball2.mass;
    ball1.getball.style.width = ball1.mass/10 + 'px';
    ball1.getball.style.height = ball1.mass/10 + 'px';
}

function gravity(ball1,ball2)
{
    var distantax = ball2.pozx-ball1.pozx;
    var distantay = ball2.pozy-ball1.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    var modul = ball1.mass * ball2.mass / distanta / distanta;

    ball1.velx -= modul / ball1.mass * distantax / distanta*-1;
    ball1.vely -= modul / ball1.mass * distantay / distanta*-1;
    ball2.velx -= modul / ball2.mass * distantax / distanta;
    ball2.vely -= modul / ball2.mass * distantay / distanta;
}

create();
setInterval(update,1);
