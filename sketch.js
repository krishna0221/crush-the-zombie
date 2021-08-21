const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
 var wall1;
 var wall2;
 var rope;
 var jointLink;
var stones = [];
var axe, zombie1,zombie2,zombie3,zombie4,zombie,bgImg,bg,sadZombie,stone;
var collided = false


function preload(){
  zombie1=loadImage("zombie1.png")
  zombie2=loadImage("zombie2.png")
  zombie3=loadImage("zombie3.png")
  zombie4=loadImage("zombie4.png")
  bgImg=loadImage("background.png")
  axe=loadImage("axe.png")
  sadZombie=loadImage("sad_zombie.png")
}

function setup() {
  createCanvas(1200, 800);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  wall1 = new Wall(100,height/2+50,200,200)
  wall2 = new Wall(width-100,height/2+50,200,200)
  rope = new Bridge(18,{x:width/2-600,y:height/2-20})
 var jointPoint = new Wall(width-100,height/2+1,40,20)





Composite.add(rope.body,jointPoint);
jointLink = new Link(rope,jointPoint);

for(var i=0;i<=8;i++){
  var x = random(width/2-200,width/2+300);
  var y = random(-10,140);
  var stone = new Stone(x,y,70,70);
  stones.push(stone);
}
zombie = createSprite(width/2,height-110);
zombie.addAnimation("lefttoright",zombie1, zombie2,zombie1);
zombie.addAnimation("righttoleft",zombie3, zombie4,zombie3);
zombie.addImage("sad",sadZombie)
zombie.scale=0.1;
zombie.velocityX=10;

breakButton = createButton('');
breakButton.position(width-200,height/2-50);
breakButton.class("breakButton")
breakButton.mousePressed(handleButtonPress)
}

function draw() {
  background(bgImg);
  Engine.update(engine);
  
//wall1.display();
//wall2.display();
rope.show();

for (var stone of stones) {
  var pos = stone.body.position;
  stone.display();
  var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y); 
  if (distance <= 50) { 
  zombie.velocityX = 0; 
  Matter.Body.setVelocity(stone.body, { x: 10, y: -10 }); 
  zombie.changeImage("sad"); 
  collided = true; }
}
if (zombie.position.x >= width - 300 && !collided) {
   zombie.velocityX = -10;
   zombie.changeAnimation("righttoleft"); } 
  if (zombie.position.x <= 300 && !collided) { 
  zombie.velocityX = 10;
  zombie.changeAnimation("lefttoright"); }

drawSprites();
}

function handleButtonPress(){
  
  jointLink.detach();
  setTimeout(()=>{
    rope.break();
  },1500);
 
}