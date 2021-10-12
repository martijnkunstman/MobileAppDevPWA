document.addEventListener("init",function(event){

  if(event.target.id=="tab1"){ 

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

// create a renderer
let sizeWidth = 300;
let sizeHeight = 300;
let wallThickness = 20;
let padding = 5;

var render = Render.create({
  element: document.getElementById("matter"),
  engine: engine,
  options: {
    height: sizeHeight,
    width: sizeWidth,
    wireframes: false
  }
});

// create two boxes and a ground

var ball1 = Bodies.circle(sizeWidth/4, sizeHeight/2, 20);
ball1.render.sprite.texture = "ball.png";
ball1.render.sprite.xScale = 0.4;
ball1.render.sprite.yScale = 0.4;

var ball2 = Bodies.circle(sizeWidth-sizeWidth/4, sizeHeight/2, 20);
ball2.render.sprite.texture = "ball.png";
ball2.render.sprite.xScale = 0.4;
ball2.render.sprite.yScale = 0.4;

ball1.friction = 0.5;
ball1.friction = 0.5;
ball1.frictionAir = 0.03;
ball1.restitution = 0.8;
ball2.frictionAir = 0.03;
ball2.restitution = 0.8;

var groundTop = Bodies.rectangle(sizeWidth/2, wallThickness/2, sizeWidth - padding, wallThickness - padding, { isStatic: true });
var groundBottom = Bodies.rectangle(sizeWidth/2, sizeHeight - wallThickness/2, sizeWidth - padding, wallThickness - padding, {
  isStatic: true
});
var groundLeft = Bodies.rectangle(wallThickness/2, sizeHeight/2, wallThickness - padding, sizeHeight - padding, { isStatic: true });
var groundRight = Bodies.rectangle(sizeWidth - wallThickness/2, sizeHeight/2, wallThickness - padding, sizeHeight - padding, { isStatic: true });

var obstacle = Bodies.rectangle(sizeWidth/2, sizeHeight/2, sizeWidth/5, sizeHeight/2, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [
  groundTop,
  groundBottom,
  groundRight,
  groundLeft,
  ball1,
  ball2,
  obstacle
]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//joystick
/*
var joystickElement = document.createElement("div");
joystickElement.id = "static";
document.body.appendChild(joystickElement);
let joystick = nipplejs.create({
  zone: document.getElementById("static"),
  mode: "static",
  position: { left: "50%", top: "50%" },
  color: "red"
});

joystick.on("move", function (evt, data) {
  console.log(data.vector.x);
  console.log(data.vector.y);
  engine.world.gravity.x = data.vector.x;
  engine.world.gravity.y = -data.vector.y;
});

joystick.on("end", function () {
  console.log(0);
  console.log(0);
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;
});
*/
let x = 0;
let y = 0;
let z = 0;
let gravity = 9.8;
let coefficient = 0.05;
let acl = new Accelerometer({ frequency: 60 });
acl.addEventListener('reading', () => {

    x = x + ((acl.x - x) * coefficient);
    y = y + ((acl.y - y) * coefficient);
    z = z + ((acl.z - z) * coefficient);
   
    engine.world.gravity.x = -x / gravity;
    engine.world.gravity.y = y / gravity;

});

acl.start();

}
});
