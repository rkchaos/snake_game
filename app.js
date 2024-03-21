let canvas=document.querySelector('canvas')
 let ctx=canvas.getContext( '2d' );


let cellsize=50;
let boardHeight=600;
let boardwidth=1000;
let direction ="right";
let food=generateRandom();
let score=0;
let gameover=false;

let snakeCells = [ [0,0] ]
function generateRandom(){
    return[
        Math.round((Math.random()*(boardwidth-cellsize))/cellsize)*cellsize,
        Math.round((Math.random()*(boardHeight-cellsize))/cellsize)*cellsize,
    ]
        
    
}


//function ko draw
function draw(){
    //erase puri board
    ctx.clearRect( 0 , 0 ,boardwidth , boardHeight);
for(let cell of snakeCells){
    ctx.fillStyle='white';
    ctx.fillRect(cell[0],cell[1],cellsize,cellsize);
}
ctx.fillStyle='red';
ctx.fillRect(food[0],food[1],cellsize,cellsize)


//draw score
ctx.font="30px Arial"
ctx.fillText(`Score:${score}`,30,30)
}
//function update
function update(){
let headX=snakeCells[snakeCells.length-1][0]
let headY=snakeCells[snakeCells.length-1][1]

let newHeadX;
let newHeadY;
if (direction==="right"){
     newHeadX=headX+cellsize;
     newHeadY=headY;
     if(newHeadX=== boardwidth|| check(newHeadX,newHeadY)){
gameover=true;
     }
}
else if(direction==='left'){
     newHeadX=headX-cellsize;
    newHeadY=headY
    if(newHeadX<0 || check(newHeadX,newHeadY)){
        gameover=true;
    }
}
else if(direction==='up'){
    newHeadX=headX;
    newHeadY=headY-cellsize;
    if(newHeadY<0 ||check(newHeadX,newHeadY)){
        gameover=true;
    }
}
else if(direction ==='down'){
    newHeadX=headX;
    newHeadY=headY+cellsize;
    if(newHeadY===boardHeight||check(newHeadX,newHeadY)) {
        gameover=true;
}
}
snakeCells.push([newHeadX,newHeadY]);
if(food[0]===newHeadX && food[1]===newHeadY){
food=generateRandom();
score+=1;
}
else{
    snakeCells.shift();

}


}
document.addEventListener('keydown',function(e){
    if(e.key==='ArrowUp'){
direction='up';
    }
    else if(e.key ==='ArrowRight'){
direction='right'
    }
    else if(e.key ==='ArrowDown'){
direction='down'
    }
    else if(e.key ==='ArrowLeft'){
direction='left'
    }
})

function check(newHeadX,newHeadY){
for(let item of snakeCells){
    if(item[0]===newHeadX&&item[1]===newHeadY){
        return true;
}

}
return false;
}
setInterval(function(){
    update();
    draw();
},300)



 

