window.addEventListener('load', () => {
  fetch("http://api.open-notify.org/astros.json")
    .then(response => {
      return (response.json());
    })
    .then(data => {
      astroData = data;
      // console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
});

/*p5 CODE */

//Global variables
let astroData;
let astronauts = [];

function setup() {
  let myCanvas = createCanvas(800, 400);
  background(144, 238, 144);

  //attach to a container
  myCanvas.parent("data_container");
}

function draw() {
  //Make sure data is ready
  if (astroData) {
    for (let i = 0; i < astroData.number; i++) {

      /*CLASS */
      let astroName = astroData.people[i].name;
      astronauts[i] = new Ellipse(i, astroName);
      astronauts[i].display();

      /*NO CLASS */
      // let astro = ellipse(50 + i * 55, 150, 50);
      //Also show text -- will show on top of each other
      // textSize(10);
      // text(astroData.people[i].name, 15 + i * 55, 190);
    }
  } else {
    console.log("Data is not ready yet!");
  }
}
/*WITH THE CLASS */
function mousePressed() {
  for (let i = 0; i < astronauts.length; i++) {
    astronauts[i].showName();
  }
}

/*WITHOUT THE CLASS*/
// function mousePressed() {
//   for (let i = 0; i < astroData.number; i++) {
//     let d = dist(mouseX, mouseY, 50 + i * 55, 150);
//     if (d < 25) {
//       clear(); //clear the text from before
//       background(144, 238, 144);
//       textSize(20);
//       text(astroData.people[i].name, 15 + i * 55, 100);
//     }
//   }
// }

/*CLASS CODE */
class Ellipse {
  constructor(x, name) {
    this.x = x;
    this.name = name;
  }
  display() {
    noStroke();
    fill(255);
    ellipse(50 + this.x * 55, 150, 50);
  }

  showName() {
    //count the distance from mouse to the circle - https://p5js.org/reference/#/p5/dist
    let d = dist(mouseX, mouseY, 50 + this.x * 55, 150);
    if (d < 25) { // 25 is a radius
      console.log('clicked');
      clear();
      background(144, 238, 144);
      textSize(20);
      text(this.name, 15 + this.x * 55, 100);
    }
  }
}
