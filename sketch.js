var PLAY = 1;
var END = 2;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  
 createCanvas(500,500);
  
  monkey =createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  var survivaltime = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  console.log(frameCount)
}


function draw() {
  
  background(165,242,186);
  
    if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    monkey.changeAnimation("moving",monkey_running);
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    monkey.collide(ground);
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      
    }
  food();
    obstacle();        

  }  else if (gameState === END) {
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }      
  stroke("black");
  textSize(22);
  fill("black");
  survivaltime = Math.ceil(frameCount/frameRate())
  text("Survival Time - "+ survivaltime,100,50)
  

drawSprites();
  
}
function obstacle() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,320,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    obstacle.addImage(obstacleImage);  
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
function food() {
  if(frameCount % 60 === 0) {
    var Food = createSprite(600,180,10,40);
    //obstacle.debug = true;
    Food.velocityX = -(6 + 3*score/100);
    
    Food.addImage(bananaImage); 
    
    //assign scale and lifetime to the obstacle           
    Food.scale = 0.1;
    Food.lifetime = 300;
   foodGroup.add(Food);
  }
}

