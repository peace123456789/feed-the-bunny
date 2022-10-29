const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;


function preload(){
  bg=loadImage("background.png")
  mel=loadImage("melon.png")
  rab=loadImage("Rabbit-01.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  air=loadSound("air.wav")
  cutting=loadSound("rope_cut.mp3")
  eating=loadSound("eating_sound.mp3")
  ssound=loadSound("sad.wav")
  bg2=loadSound("sound1.mp3")
  mute=loadImage("mute.png")
  blower=loadImage("balloon.png")
  eat.looping=false
  sad.looping=false

}

function setup() 
{
 var device=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
 if(device){
  w=displayWidth
  h=displayHeight
  createCanvas(w,h)
 }
 else{
  w=windowWidth
  h=windowHeight
  createCanvas(w,h)

 }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,h-10,600,20);
  rope=new Rope(Math.round(w/90),{x:100,y:30})
  rope2=new Rope(7,{x:w/2,y:40})
  rope3=new Rope(Math.round(w/100),{x:w-200,y:210})

  fruit=Bodies.circle(300,300,15,{density:0.001})
  Composite.add(rope.body,fruit)
  fruitLink=new Link(rope,fruit)
  fruitLink2=new Link(rope2,fruit)
  fruitLink3=new Link(rope3,fruit)

  button=createImg("cut_btn.png")
  button.position(100,30)
  button.size(50,50)
  button.mouseClicked(drop)

  button2=createImg("cut_btn.png")
  button2.position(w/2,35)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3=createImg("cut_btn.png")
  button3.position(w-200,200)
  button3.size(50,50)
  button3.mouseClicked(drop3)

  



  blow=createImg("balloon.png")
  blow.position(10,300)
  blow.size(150,100)
  blow.mouseClicked(airBlower)

  blink.frameDelay=15
  eat.frameDelay=15
  sad.frameDelay=15

  rabbit=createSprite(150,h-150,100,100)
  rabbit.addAnimation("blinking",blink)
  rabbit.addAnimation("eating",eat)
  rabbit.addAnimation("crying",sad)
  rabbit.scale=0.2
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  bg2.play()
  bg2.setVolume(0.5)

  muteButton=createImg("mute.png")
  muteButton.position(w-100,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(stopSound)
  
}

function draw() 
{
  background(bg);
  ground.show();
  rope.show()
  rope2.show()
  rope3.show()
  imageMode (CENTER)
  if(fruit!=null){
    image(mel,fruit.position.x,fruit.position.y,60,60)
  }
  Engine.update(engine); 
 
 
 if(collide(fruit,rabbit)==true){
  rabbit.changeAnimation("eating")
  eating.play()
 }
 if(fruit!=null&&fruit.position.y>=h-50){
  rabbit.changeAnimation("crying")
  ssound.play()
  bg2.stop()
  fruit=null
 }
 

  drawSprites()

 
   
}
function drop(){
  cutting.play()
  fruitLink.detatch()
  fruitLink=null
  rope.break()
}

function drop2(){
cutting.play()
 fruitLink2.detatch()
  fruitLink2=null
  rope2.break()

}

function drop3(){
cutting.play()
fruitLink3.detatch()
fruitLink3=null
rope3.break()
}
function collide(body,sprite){
  if(body!=null){
    var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(distance<=80){
      World.remove(world,fruit)
      fruit=null
      return true
    }
    else{
      return false
    }

  }

}

function airBlower(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play()
}
function stopSound(){
  if(bg2.isPlaying()){
    bg2.stop()
  }else{
    bg2.play()
  }
}
