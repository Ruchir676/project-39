var backImage,backgr;

var ground,roof;

var spaceship, spaceship_img;

var banana ,bananaImage, astroid, astroid_img;

var FoodGroup,obstacleGroup;

var survivalTime=0;

var gameState=0;

function preload(){
  backImage=loadImage("images/space.png");
  
  spaceship_img = loadImage("images/spaceship.png");

  bananaImage = loadImage("images/banana.png");
  astroid_img = loadImage("images/astroid.png"); 
  
}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight);
  
  backgr=createSprite(displayWidth/2,displayHeight/2,displayWidth*1000,displayHeight);
  backgr.addImage(backImage);
  backgr.scale = 2;
  backgr.velocityX=-2;
  
  ground = createSprite(400,displayHeight,800,160);
  ground.visible=false;
  
  roof = createSprite(400,-20,800,160);
  roof.visible=false; 
 
  
  spaceship = createSprite(200,300);
  spaceship.addImage("spaceship",spaceship_img);
  spaceship.scale=.5;    
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  
  background("black"); 

  if(backgr.x<600){
    backgr.x=backgr.width/2;
  }

  if(gameState === 0) {
    
    spaceship.collide(ground);
    spaceship.collide(roof);
    
    if(keyDown("UP_ARROW")) {
      spaceship.velocityY=-6;    
    }
    if(keyDown("DOWN_ARROW")) {
      spaceship.velocityY=6;    
    }

    if(obstacleGroup.isTouching(spaceship)) {
      spaceship.destroy();
      gameState=1;
    }
    
    spawnObstacle();
  
    drawSprites();
    
    stroke("white");
    textSize(20);
    fill("white");
    survivalTime = Math.ceil(frameCount / frameRate())
    text("Survival Time:  "+ survivalTime,500,50);
    
  } else if(gameState === 1) {
    textSize(100);
    stroke("black");
    fill("white");
    text("Game Over", displayWidth/2, displayHeight/2);
  }
}

function spawnObstacle() {
  if(World.frameCount%30===0) {
    astroid = createSprite(displayWidth,0,10,10);
    astroid.addImage(astroid_img);
    astroid.scale=0.25;
    astroid.velocityX=-6;
    astroid.y = Math.round(random(0,displayHeight));
    astroid.lifetime=displayWidth;
    obstacleGroup.add(astroid);
  }
}
