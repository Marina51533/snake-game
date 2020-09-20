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

let direction='right';
let steps = false;
//Move of the snake to the right
function move(){
  let snakeCoordinates=[snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];//point of beginning this move
  snakeBody[0].classList.remove('snakeHead');//remove the class
  snakeBody[snakeBody.length-1].classList.remove('snakeBody');//remove the class
  snakeBody.pop();//delete it at all
  
  if(direction=='right'){
    if(snakeCoordinates[0]<10){//if the snake goes to the wall - looking for X-coordinate
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
      } else{
      snakeBody.unshift(document.querySelector('[posX = "1"][posY="' + snakeCoordinates[1] + '"]'));
      }//we change its coordinates
    
    }else if(direction=='left'){
    if(snakeCoordinates[0]>1){//if the snake goes to the wall
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
      } else{
      snakeBody.unshift(document.querySelector('[posX = "10"][posY="' + snakeCoordinates[1] + '"]'));
      }//we change its coordinates
    
    }else if(direction=='up'){
      if(snakeCoordinates[1]<10){//if the snake goes to the wall
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY="' +(+ snakeCoordinates[1]+1) + '"]'));
        } else{
        snakeBody.unshift(document.querySelector('[posX ="' + snakeCoordinates[0] + '"][posY="1"]'));
        }//we change its coordinates
      
      }else if(direction=='down'){
        if(snakeCoordinates[1]>1){//if the snake goes to the wall
          snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY="' + (snakeCoordinates[1]-1) + '"]'));
          } else{
          snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY="10"]'));
          }//we change its coordinates
        }


        //snake eats mouse
      if (snakeBody[0].getAttribute('posX')== mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
       mouse.classList.remove('mouse');
       let a= snakeBody[snakeBody.length-1].getAttribute('posX');
       let b= snakeBody[snakeBody.length-1].getAttribute('posY');
      snakeBody.push(document.querySelector('[posX="' + a + '"][posY="' + b + '"]'));
      createMouse();
      }

      if(snakeBody[0].classList.contains('snakeBody')){
        clearInterval(interval);
        snakeBody[0].style.backgroundColor = 'red';
      }

  snakeBody[0].classList.add('snakeHead');//added classes new coordinates
  for(let i=0;i<snakeBody.length;i++){
    snakeBody[i].classList.add('snakeBody');
  }
  
  steps=true;
}
let interval = setInterval(move,300)//interval for move

//what happens under press on a key

document.addEventListener('keydown', function (event) {
  if (event.defaultPrevented) {
      return;
      
  }
  var key = event.key ;
  if(steps == true){
    if (key === 'ArrowLeft' && direction!='right') {
      direction='left';
      steps = false;
  }
  else if(key === 'ArrowUp' && direction!='down') {
    direction='up';
    steps = false;
  }
  else if(key === 'ArrowRight' && direction!='left') {
  direction='right';
  steps = false;
  }else if (key === 'ArrowDown' && direction!='up') {
  direction='down';
  steps = false;
}
  }
 
});

