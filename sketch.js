var towerImg, Tower;
var doorImg, door, doorGroup
var climberImg, climber, climbersGroup;
var ghostImg, ghost;
var invisibleblock, inivisibleblockGroup;
var gameState = "Play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleblockGroup = new Group();
}


function draw(){
  background(0);
  
if(gameState==="Play"){
   if(tower.y > 400){
     tower.y = 300;
   }
   if(keyDown("Space")){
    ghost.velocityY = -10;
}
   
  ghost.velocityY = ghost.velocityY + 0.8;
   
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 2;
 }

  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 2;
}
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
   }
  if(invisibleblockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy();
    gameState = "END";
}
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  spawndoors(); 

  
drawSprites();
}

if (gameState === "END"){
  stroke("RED");
  strokeWeight(3);
  fill("YELLOW");
  textSize(40);
  text("GAME OVER!!", 150,250);
}
}

function spawndoors(){
  if (frameCount % 200==0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    invisibleblock = createSprite(200,15);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    invisibleblock.velocityY = 1;
    door.x = Math.round(random(120,400))
    door.velocityY = 1;
    invisibleblock.x = door.x;
    climber.x = door.x
    climber.velocityY = 1;
    climber.lifetime=800;
    door.lifetime=800;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleblockGroup.add(invisibleblock);
  
  }
}