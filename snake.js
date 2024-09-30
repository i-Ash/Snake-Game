function init(){
    canvas = document.querySelector('#display');
    score = document.querySelector('#score');
    //width
    w = canvas.width = 1000;
    //height
    h = canvas.height = 670;

    pen = canvas.getContext('2d');
    cellSize = 66;
    game_over = false;
    UpdatedScore = 5;
    food = getRandomFood();
        snake = {
        init_len:4,
        color:"#00308F",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                //x-coordinate,y-coordinate,width of rect,height of rect
                pen.fillRect(this.cells[i].x*cellSize,this.cells[i].y*cellSize,cellSize,cellSize);
            }
        },
        updateSnake:function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                UpdatedScore++;
                score.innerText = UpdatedScore;
            }
            else{
                this.cells.pop();
            }
            
            var nextX,nextY;
            if(this.direction == "right"){
                nextX = headX+1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY+1;
            }
            else{
                nextX = headX;
                nextY = headY-1;
            }
            
            this.cells.unshift({x:nextX,y:nextY});

            var lastX = w/cellSize;
            var lastY = h/cellSize;
            //check for boundary collision
            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
                game_over = true;
            }
            //check for itsself collision
            for (var i = 1; i < this.cells.length; i++) {
                if (this.cells[i].x === this.cells[0].x && this.cells[i].y === this.cells[0].y) {
                    game_over = true;
                    break;
                }
            }
        },
    };
    snake.createSnake();

    function keyPressed(e){
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else{
            snake.direction = "up";
        }
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,w,h);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cellSize,food.y*cellSize,cellSize,cellSize);
    pen.fillStyle = "black";
    pen.font = "20px roboto";
    // pen.fillText(score,30,30);
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(w-cellSize)/cellSize);
    var foodY = Math.round(Math.random()*(h-cellSize)/cellSize);

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameLoop(){
    if(game_over == true){
        clearInterval(start);
        alert("Game over");
    }
        
    draw();
    update();
}

init();

let start = setInterval(gameLoop,120);
