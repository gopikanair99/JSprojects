const canvas = document.getElementById("canvas"); //refernce to canvas
const ctx = canvas.getContext('2d'); //allows to access the context and do draw and all
const box = 25; //for the snake with a constant size of 25
const canvasSize = 23; //will be both width and height

//score variable
let score = 0;

//load snake starting position 

let snake = [];

snake[0] = {
    x: Math.floor((canvasSize / 2)) * box, //to get the roundd of value
    y: Math.floor((canvasSize / 2)) * box
}

//set directions when pressed by the arrow keys

let dir;
document.addEventListener('keydown', direction); //event listener for direction

function direction(event) {
     if (event.keyCode == 37 && dir != "RIGHT") //every key in keyboard has a value left is 37, up is 38 right is 39, down is 40
    {
        dir = "LEFT";
    }
    if (event.keyCode == 38 && dir != "DOWN") //every key in keyboard has a value left is 37, up is 38 right is 39, down is 40
    {
        dir = "UP";
    }
    if (event.keyCode == 39 && dir != "LEFT") //every key in keyboard has a value left is 37, up is 38 right is 39, down is 40
    {
        dir = "RIGHT";
    }
    if (event.keyCode == 40 && dir != "UP") //every key in keyboard has a value left is 37, up is 38 right is 39, down is 40
    {
        dir = "DOWN";
    }

}
// if the snake east the food 



//set the location of the food 
let food = {
    x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box, //to make it stay inside the box ie 23 value
    y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box //math.random generates value between 0 nd 1.0

}


//draw function
function draw() {
    //draw background
    ctx.fillStyle = "black";
    ctx.fillRect(25, 25, 23 * 25 - 25, 23 * 25 - 25); // has starting value of box and then width and height

    //draw the snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box); //gets the inital values from snake list declared above
        //loop will go on and will keep on adding
    }

    //mov the snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (dir == "LEFT") {
        snakeX -= box; //reduces a box for left x axis
    }
    if (dir == "RIGHT") {
        snakeX += box; //adds a box to right x axis
    }

    if (dir == "UP") {
        snakeY -= box; //reduces a box in y
    }

    if (dir == "DOWN") {
        snakeY += box; //adds a box in y
    }

    // if snake eats the food

    if (snakeX == food.x && snakeY == food.y) {
        score += 1;
        food = {
            x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box, //to make it stay inside the box ie 23 value
            y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box

        }
    } else {
        snake.pop(); //will remove the snake if not equal
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };


    //check for collision

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;

            }
        }
        return false;
    }

    if (snakeX < box || snakeY < box || snakeX > (canvasSize - 1) * box || snakeY > (canvasSize - 1) * box || collision(newHead, snake)) {
        clearInterval(game);
        alert("GAME OVER! Score is: "+score);

    }
    snake.unshift(newHead); //creates or adds newhead to the snake

    //draw food for the snake

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    //draw score 

    ctx.fillStyle = 'White';
    ctx.font = "24px Changa one";
    ctx.clearRect(0, 0, 50, 25); //shows at the top most
    ctx.fillText(score, box, 0.8 * box);
}
let game = setInterval(draw, 100);
