// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Body = Matter.Body,
  Common = Matter.Common,
  Events = Matter.Events;

const width =
  document.documentElement.offsetWidth -
  document.documentElement.offsetWidth * 0.5;

var engine = Engine.create();
// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine
});
// create two boxes and a ground
var rocket = Bodies.rectangle(
  100,
  document.documentElement.offsetHeight - 55,
  7.5,
  15
);

var planetA = Bodies.circle(800, 200, 100, { isStatic: true });

var topWall = Bodies.rectangle(
  0,
  10,
  document.documentElement.clientWidth * 2,
  20,
  { isStatic: true }
);
var leftWall = Bodies.rectangle(
  10,
  0,
  20,
  document.documentElement.clientHeight * 2,
  {
    isStatic: true
  }
);
var rightWall = Bodies.rectangle(
  document.documentElement.clientWidth - 10,
  0,
  20,
  document.documentElement.clientHeight * 2,
  { isStatic: true }
);
var bottomWall = Bodies.rectangle(
  0,
  document.documentElement.offsetHeight - 10,
  document.documentElement.clientWidth * 2,
  20,
  { isStatic: true }
);

rocket.frictionAir = 0;
rocket.ignoreGravity = true;
render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;

// add all of the bodies to the world
World.add(engine.world, [
  rocket,
  topWall,
  leftWall,
  rightWall,
  bottomWall,
  planetA
]);

engine.world.gravity.y = 0;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

function handle_up(power) {
  Body.applyForce(
    rocket,
    { x: rocket.position.x, y: rocket.position.y },
    { x: 0, y: -power }
  );
}

function handle_down(power) {
  Body.applyForce(
    rocket,
    { x: rocket.position.x, y: rocket.position.y },
    { x: 0, y: power }
  );
}

function handle_left(power) {
  Body.applyForce(
    rocket,
    { x: rocket.position.x, y: rocket.position.y },
    { x: -power, y: 0 }
  );
}

function handle_right(power) {
  Body.applyForce(
    rocket,
    { x: rocket.position.x, y: rocket.position.y },
    { x: power, y: 0 }
  );
}

const Rocket = {
  launch: (power, flightCallback) => {
    handle_up(power);
    Events.on(engine, "afterUpdate", event => {
      flightCallback(
        rocket.speed.toFixed(2),
        rocket.position,
        rocket.angle,
        rocket.angularVelocity.toFixed(2)
      );
    });
  },
  trust: (power, direction) => {
    switch (direction) {
      case "left":
        handle_left(power);
        break;
      case "right":
        handle_right(power);
        break;
      case "down":
        handle_down(power);
        break;
      case "up":
        handle_up(power);
        break;
      default:
        break;
    }
  },
  getSpeed: () => rocket.speed
};

const Navigation = {
  getDistance: planet => {
    return distanceBetweenTwoPoints(
      { x: rocket.position.x, y: rocket.position.y },
      {
        x: planet.position.x,
        y: planet.position.y
      }
    );
  }
};

const Planets = {
  balor: planetA
};
