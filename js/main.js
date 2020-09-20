let field = document.createElement('div');//create new Element
document.body.appendChild(field);//added it in the parent block body
field.classList.add('field')//added this Element its class 'field'

for(let i=1;i<101;i++){  //full our field with elements
let elem=document.createElement('div');
field.appendChild(elem);
elem.classList.add('elem');
}

//do coordinats
let elem=document.getElementsByClassName('elem');//this is one variable for our little elements in the field
let x=1;
let y=10;

for (let i=0;i<elem.length;i++){
  if(x>10){
    x=1;
    y--;
  }
  elem[i].setAttribute('posX',x);
  elem[i].setAttribute('posY',y);
  x++;
}
//create the place,where the snake will appeare
function createPointsForSnake(){
let posX=Math.round(Math.random()*(10-3)+3);//random X
let posY=Math.round(Math.random()*(10-1)+1);//random Y for elem
return [posX, posY];
}

let coordinates=createPointsForSnake();//give the coordinates from Array
let snakeBody=[document.querySelector('[posX = "' + coordinates[0] + '"][posY="' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY="' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY="' + coordinates[1] + '"]')];//look for div with such coordinates
console.log(snakeBody)

//add classes to our coordinats to show our snake
for(let i=0;i<snakeBody.length;i++){
  snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead');

//create mouse
let mouse;

function createMouse(){
  function createMouseCoordinates(){
  let posX=Math.round(Math.random()*(10-3)+3);//random X
  let posY=Math.round(Math.random()*(10-1)+1);//random Y for elem
  return [posX, posY];
}

let mouseCoordinate=createMouseCoordinates();
console.log(mouseCoordinate);
mouse = document.querySelector('[posX = "' + mouseCoordinate[0] + '"][posY="' + mouseCoordinate[1] + '"]')

while(mouse.classList.contains('snakeBody')){//if the element Of mouse has .snakeBody, 
  let mouseCoordinate=createMouseCoordinates();//mouseCoordinate will be changed.
  mouse = document.querySelector('[posX = "' + mouseCoordinate[0] + '"][posY="' + mouseCoordinate[1] + '"]')
}

mouse.classList.add('mouse');

}
createMouse();