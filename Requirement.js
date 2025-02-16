/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class pt {
  //this constructor is used to construct the pt class
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, w, h) {
    if (!h || h <= 0 || !w || w <= 0) {
      throw Error("invalid Width and Height");
    }
    this.startingPoint = startingPoint;
    this.w = w; // w is the width
    this.h = h; // h is the height
  }

  // ***************
  //     METHODS
  // ***************
  
  getHeight() {
    return this.h;
  }

  getWidth() {
    return this.w;
  }

  area() {
    return this.w * this.h;
  }

  calculatePerimeter() {
    return 2 * this.w + 2 * this.h;
  }

  updateMyHeight(height) {
    if (height && height > 0) {
      this.h = height;
    }
  }

  update({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height");
    }
    this.startingPoint = startingPoint;
    this.w = width;
    this.h = height;
  }

  //function that print the endpoints
  endPoints() {
    const topRight = this.startingPoint.coordX + this.w;
    const bottomLeft = this.startingPoint.coordY + this.h;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

}

function buildObject(width, x, height, y) {
  const mainPoint = new pt(x, y);
  const rect = new Rectangle(mainPoint, width, height);
  return rect;
}

function constructSquare(coordX, coordY, height) {
  let square;
  if (!height || height <= 0) {
    square = buildObject(height, coordX, height, coordY);
  }
  console.log("Square Area: ", square.area());
  console.log("Square Perimeter: ", square.calculatePerimeter());
}

const myRect = buildObject(2, 3, 5, 4);

const square = constructSquare(1,1,5);

console.log(square.calculatePerimeter());
square.endPoints();

myRect.updateMyHeight(3);