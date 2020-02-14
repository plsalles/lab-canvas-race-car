window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    
  const carImg = new Image();
  carImg.src = './images/car.png';
  
    carImg.onload = () => {
      var canvas = new Canvas (600,900);
      canvas.createField();

      var player = new Car (300,700,canvas.ctx);
      // var obst = new Obstacles(70, 0, canvas.ctx, 10)
      var game = new Game (canvas,player,carImg);
      
        window.onkeydown = (e) => {
        player.moveCar(e.keyCode);
      };

      game.startGame();
    };
  };
};


class Canvas {
  constructor (width, height){
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    // this.background = background;
    // this.backgroundSpeed = backgroundSpeed;
    this.line1Position = -1000;
    //this.line2Position = -1000;
    this.context;

  }

  createField = () => {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0,0,40,900);

    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(40,0,15,900);

    this.ctx.fillRect(70,0,460,900);


    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(560,0,40,900);

    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(545,0,15,900);

    this.ctx.strokeStyle='white';
    this.ctx.lineWidth=7;
    this.ctx.beginPath();
    this.ctx.setLineDash([45,25]);
    this.ctx.moveTo(315,0);
    this.ctx.lineTo(315,9000);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  clearField = () => {
    this.ctx.clearRect(0,0,600,900);
  }
  drawField = () => {
    
    this.backgroundPosition = 0;

    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0,0,40,900);

    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(40,0,15,900);

    this.ctx.fillRect(70,0,460,900);


    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(560,0,40,900);

    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(545,0,15,900);

    this.ctx.strokeStyle='white';
    this.ctx.lineWidth=7;
    this.ctx.beginPath();
    this.ctx.setLineDash([45,25]);
    this.ctx.moveTo(315,this.line1Position);
    this.ctx.lineTo(315,1000);
    this.ctx.stroke();
    // this.ctx.moveTo(315,this.line2Position);
    // this.ctx.lineTo(315,this.line1Position - 60);
    
    // this.ctx.moveTo(315,this.backgroundPosition);
    // this.ctx.lineTo(315,line1Position);
    this.ctx.closePath();
    this.line1Position +=1;
    

    if(this.line1Position === 0){
      this.line1Position = -1000;
      // this.line2Position = -1000;
    }
   
  }
  
  
}


class Component {
  constructor (positionX, positionY, gameContext){
    this.positionX = positionX;
    this.positionY = positionY;
    this.gameContext = gameContext;
    
  }
}

class Car extends Component {
  constructor (positionX, positionY, gameContext) {
  super (positionX, positionY, gameContext);
  }
  
  drawPlayer = (img) => {
             
    this.gameContext.drawImage(img,this.positionX,this.positionY,70,100);
           
    }
  
  moveCar = (key) => {
    
    
      switch(key) {
        
        case 39:
          if (this.positionX <  460)
            this.positionX += 5;
            break;
        case 37:
          if (this.positionX > 70){  
            this.positionX -= 5;
            break;} else { break;}
          
      }
    
      
      
   
  }
    
}

class Obstacles extends Component {
  constructor (positionX, positionY, gameContext, width) {
  super (positionX, positionY, gameContext);
  this.positionX = positionX;
  this.positionY = positionY;
  this.ctx = gameContext;
  this.width = width;
  this.direction = false;
  }
  drawObstacles = () => {
    this.ctx.fillStyle = 'brown';
    this.ctx.fillRect(this.positionX,this.positionY,this.width,15);
    this.positionY += 2;
  }
  
}

class Game {
  constructor (field,player,img,obst){
    this.canvas = field;
    this.clearField = field.clearField;
    this.drawField = field.drawField;
    this.img = img;
    this.drawPlayer = player.drawPlayer;
    this.movePlayer = player.moveCar;
    this.clearCar = player.clearCar;
    this.obstaclesArray = [];
    this.frames = 0;
    this.obst = obst;

  }

  createObstacles = (x) => {
    
    this.obstaclesArray.push(new Obstacles (x, 0, this.canvas.ctx, 120))
    if(this.obstaclesArray.length === 10){
      this.obstaclesArray.shift();
      }
    
  }

  animationCallback = () => {
    this.clearField();
    this.drawField();
    this.movePlayer();
    this.update();
    this.drawPlayer(this.img);
    
    const animation = window.requestAnimationFrame(this.animationCallback)

  }

  startGame = () => {
    this.animationCallback();
  }

  update = () => {
    this.frames += 1;
    for (let i = 0; i < this.obstaclesArray.length; i++) {
      if(this.obstaclesArray[i].positionX === 460){
        this.obstaclesArray[i].direction === false;
      }

      if(this.obstaclesArray[i].positionX === 70){
        this.obstaclesArray[i].direction === true;
      }
      if (this.obstaclesArray[i].positionX < 460 && this.obstaclesArray[i].direction === true ) {
        this.obstaclesArray[i].positionY += 1;
        this.obstaclesArray[i].positionX += 1; 
      } else if (this.obstaclesArray[i].positionX < 460 && this.obstaclesArray[i].direction === false)
            {this.obstaclesArray[i].positionY += 1;
              this.obstaclesArray[i].positionX -= 1;  
        } else if (this.obstaclesArray[i].positionX > 70 && this.obstaclesArray[i].direction === true){
          this.obstaclesArray[i].positionY += 1;
        this.obstaclesArray[i].positionX += 1;
        } else { this.obstaclesArray[i].positionY += 1;
                 this.obstaclesArray[i].positionX -= 1;}
      

      
      this.obstaclesArray[i].drawObstacles();
    }
    
    if(this.frames % 120 == 0){
      let x = 390;
      var minWidth = 70;
      var maxWidth = 460;
      
      var width = Math.round(
      Math.random() * (maxWidth - minWidth + 1) + minWidth);
      console.log(width)
      this.createObstacles(width);
    }
    
    
}


}


