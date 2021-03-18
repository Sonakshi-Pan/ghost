var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisible, invisibleGroup
var tower,towerImage;
var ghost,ghostImage
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var spooky;
var edges

function preload(){
  
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage  = loadImage("door.png");
  climberImage  = loadImage("climber.png");
  //spooky = loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
   edges = createEdgeSprites()
  
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleGroup = new Group()
}
 function draw(){
   background(0)

  // spooky.play();
   if(gameState===PLAY){
     camera.position.x=300
     camera.position.y=ghost.y 
     ghost.collide(edges[3])
   if(tower.y>600) {
     tower.y = 300;
   } 
   
   if(keyDown("space")){
     ghost.velocityY = - 5;
   }
   ghost.velocityY+=0.5;
   
    if(keyDown("left_arrow")){
     ghost.x-= 3;
   }
   
    if(keyDown("right_arrow")){
     ghost.x+= 3;
   }
   spawnDoors()
     
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }    
     
  if(invisibleGroup.isTouching(ghost)) {
    ghost.destroy();
    gameState = END;
  } 
     drawSprites()
   }
   if(gameState===END){
     fill("yellow");
     textSize(30);
     text("GAME OVER !",230,100)
     
   }
 }
function spawnDoors() {
  
  if (frameCount % 240 === 0) {
    var door = createSprite(300,-50,10,20);
    door.x = Math.round(random(120,500));
    door.addImage(doorImage);
    //cloud.scale = 0.5;
    door.velocityY = 1;
    
    var climber = createSprite(300,0,20,10);
    climber.x= door.x
    climber.addImage(climberImage);
    //cloud.scale = 0.5;
    climber.velocityY = 1; 
    
    var invisible = createSprite(300,10,50,10);
    invisible.x= door.x
    invisible.visible = false;
    invisible.velocityY = 1; 
    
    
     //assign lifetime to the variable
    door.lifetime = 660;
    climber.lifetime = 620;
    invisible.lifetime =660;
    
    //adjust the depth
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //add each cloud to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisible);
  }
}