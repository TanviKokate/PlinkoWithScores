const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0; 
var count = 0;
var particle;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2, height, width, 20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,75));
    }
    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }
     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }
     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }  
}

function draw() {
  background("black");
 
  stroke("white");
  strokeWeight(3);
  fill("black");
  textFont("Forte");
  textSize(42)
  text("Score : " + score, 15, 40);
  text("Count : " + count, 610, 40);

  strokeWeight(3);
  textSize(30);
  text("500", 16, 550);
  text("500", 94, 550);
  text("500", 172, 550);
  text("500", 254, 550);

  textSize(31);
  text("100", 336, 550);
  text("100", 417, 550);
  text("100", 496, 550);

  textSize(31);
  text("200", 575, 550);
  text("200", 655, 550);
  text("200", 736, 550);

  ground.display();
  Engine.update(engine);
 
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
   }
   if(particle!=null){
      particle.display();
       if (particle.body.position.y > 760){
        if (particle.body.position.x < 300){
              score += 500;      
              particle = null;
              if (count>= 5) gameState ="end";                          
             }
        else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) {
              score += 100;
              particle = null;
              if (count>=5) gameState ="end";
             }
        else if (particle.body.position.x < 900 && particle.body.position.x > 601 ){
              score += 200;
              particle = null;
              if (count>= 5) gameState ="end";
             }      
      }
   }

   for (var k = 0; k < divisions.length; k++) {   
     divisions[k].display();
   }

   if (gameState == "end"){
    strokeWeight(7);
    fill(0);
    textFont("Forte");
    textSize(158);
    text("Game Over", 50, 300);
  }
}

function mousePressed(){
  if (gameState !== "end"){
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}