var tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var space, spaceImg;
var invisibleBlockGroup, invisibleBlock;
var sun, sunImg;
var gameState = "play"

function preload(){
  
  
  doorImg = loadImage("sfire.png");
  climberImg = loadImage("cloud.png");
  spaceImg = loadImage("spc.png");
  sunImg = loadImage("sun.png");
}

function setup(){
  createCanvas(600,600);
  sun = createSprite(width-50, 100,10,10);
  sun.addImage(sunImg);
  sun.scale = 0.2;
  
  tower = createSprite(300, 300);
  tower.shapeColor = "lightblue";
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
  invisibleBlockGroup = new Group();
  
  space = createSprite(300,100,50,50);
  space.scale = 0.2;
  space.addImage("space", spaceImg);
}

function draw(){
  background("lightblue");

  if (tower.y < 70 ){
    tower.y = tower.height/2;

  }
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      space.x = space.x - 3;
    }
    
    if(keyDown("right_arrow")){
      space.x = space.x + 3;
    }
    
    if(keyDown("space")){
      space.velocityY = -10;
    }
    
    space.velocityY = space.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    spawnclimber();
    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(space) || doorsGroup.isTouching(space)){
      space.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(space) || space.y > 600){
      space.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 340 === 0) {
    var door = createSprite(200, -50);
    door.scale = 0.5;
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.visible = false;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(100,500));
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    
    door.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    space.depth = door.depth;
    space.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    
    invisibleBlockGroup.add(invisibleBlock);
  }
}

function spawnclimber() {
  //write code here to spawn the doors in the tower
  if (frameCount % 150 === 0) {
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    
  
    climber.x = Math.round(random(10,500));
    climber.addImage(climberImg);
    climber.scale = 0.5;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    

    //assign lifetime to the variable
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
   
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
