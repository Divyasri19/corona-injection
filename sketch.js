//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,corona ,monster,coronaGroup,enemyGroup, score,r,randomcorona, position;
var swordImage , corona1, corona2 ,corona3,corona4, monsterImage, gameOverImage
var gameOverSound ,knifeSwoosh

function preload(){
  
  swordImage = loadImage("knife.png");
  monsterImage = loadAnimation("people1.png","people2.png")
  fruit1 = loadImage("corona1.png");
  fruit2 = loadImage("corona2.png");
  fruit3 = loadImage("corona3.png");
  fruit4 = loadImage("corona4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(1900, 1900);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  coronaGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("pink");
  knifeSwooshSound.play()
  
  if(gameState===PLAY){
    
    //Call corona and Enemy function
    corona();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching corona
    if(coronaGroup.isTouching(sword)){
      coronnaGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        coronaGroup.destroyEach();
        enemyGroup.destroyEach();
        coronaGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score,300,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function coronas(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    corona=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of corona, to make it more challenging
    
    if(position==1)
    {
    corona.x=400;
    corona.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      corona.x=0;
      
  //Increase the velocity of corona after score 4 or 10
      corona.velocityX= (7+(score/4));
      }
    }
    
    corona.scale=0.2;
     //corona.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      corona.addImage(corona1);
    } else if (r == 2) {
      corona.addImage(corona2);
    } else if (r == 3) {
      corona.addImage(corona3);
    } else {
      corona.addImage(corona4);
    }
    
    corona.y=Math.round(random(50,340));
   
    
    corona.setLifetime=100;
    
    coronaGroup.add(corona);
  }
}