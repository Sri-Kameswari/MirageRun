const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  btn.style.display = 'none';
  init();
  animate();
  
});

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;

class Player 
{
  constructor()
  {
    this.speed = 10;
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.width = 30;
    this.height = 80;
    this.image = imageSR;
    this.frames = 0;
    this.sprites =
    {
      stand:{ right: imageSR, left: imageSL, cropWidth:29, width:30},
      run:{ right: imageRR, left: imageRL, cropWidth:46, width:46}
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 29;
  }
  draw() 
  {
    c.drawImage(
      this.currentSprite, this.currentCropWidth*this.frames, 0, this.currentCropWidth, 70, 
      this.position.x, this.position.y, this.width, this.height);
  }
  update() 
  {
    this.frames++;

    if( this.frames>10 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left) )
      this.frames=0;
    else if( this.frames>29 && ( this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left))
      this.frames=0;

    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if ( this.position.y+this.height+this.velocity.y <= canvas.height )
      this.velocity.y += gravity;

      if (this.position.y + this.velocity.y < 0) 
      {
        this.position.y = 0;
        this.velocity.y = gravity; 
      }  


  }
}

class Platform 
{
  constructor({ x, y, image})
  {
    this.position = { x, y};
    this.image=image;
    this.width =image.width;
    this.height =image.height;
  }
  draw() 
  {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject 
{
  constructor({ x, y, image}) 
  {
    this.position = { x, y};
    this.image=image;
    this.width =image.width;
    this.height =image.height;
  }
  draw() 
  {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class WinScenario
{
  constructor() 
  {
    this.position = { x:193, y:90};
    this.image=win;
    this.width =image.width;
    this.height =image.height;
  }
  draw() 
  {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

let image = new Image();
image.src = "./image/our-platform.png";

let image1 = new Image();
image1.src = "./image/our-background.png";

let image2 = new Image();
image2.src = "./image/trees-bg.png";

let image3 = new Image();
image3.src = "./image/our-small-tall.png";

let imageRR = new Image();
imageRR.src = "./image/spriteRR.png";

let imageRL = new Image();
imageRL.src = "./image/spriteRL.png";

let imageSR = new Image();
imageSR.src = "./image/spriteSR.png";

let imageSL = new Image();
imageSL.src = "./image/spriteSL.png";

let win = new Image();
win.src = "./image/win.png";

let flag = new Image();
flag.src = "./image/flag.png";

let camel = new Image();
camel.src = "./image/camel.png";

let player = new Player();
let platforms = [];
let genericObjects = [];
let winScenario = new WinScenario();
let currentKey;
const keys = { right:{pressed: false}, left:{pressed: false} };

let scrollOffset = 0;

var backgroundMusic = new Audio();
backgroundMusic.src = './audio/Bg.MP3';
backgroundMusic.preload = 'auto';
backgroundMusic.play();
backgroundMusic.volume= 0.2;

var winSong = new Audio();
winSong.src = './audio/win2.mp3';
winSong.volume = 0.2;

function init()
{
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();

  currentKey = 'right';  

  image = new Image();
  image.src = "./image/our-platform.png";
 
  image1 = new Image();
  image1.src = "./image/our-background.png";

  image2 = new Image();
  image2.src = "./image/trees-bg.png";

  image3 = new Image();
  image3.src = "./image/our-small-tall.png";

  imageRR = new Image();
  imageRR.src = "./image/spriteRR.png";

  imageRL = new Image();
  imageRL.src = "./image/spriteRL.png";

  imageSR = new Image();
  imageSR.src = "./image/spriteSR.png";

  imageSL = new Image();
  imageSL.src = "./image/spriteSL.png";

  win = new Image();
  win.src = "./image/win.png";

  flag = new Image();
  flag.src = "./image/flag.png";

  camel = new Image();
  camel.src = "./image/camel.png";

  player = new Player();
  platforms = [new Platform({ x: image.width*4+300-2+image.width-image3.width, y: 270, image:image3}), 
               new Platform({ x: -1, y: 470,image}), 
               new Platform({ x: image.width-3, y: 470, image}),  
               new Platform({ x: image.width*2+100, y: 470, image}), 
               new Platform({ x: image.width*3+300, y: 470, image}), 
               new Platform({ x: image.width*4+300-2, y: 470, image}), 
               new Platform({ x: image.width*5+700-2, y: 470, image}),
               new Platform({ x: image.width*6+1000-2, y: image.height+80, image:image3}),
               new Platform({ x: image.width*6+1000-3 + image3.width, y: image.height*2+100, image:image3}),
               new Platform({ x: image.width*6+1300-4 + image3.width*2, y: 470, image:image3}),
               new Platform({ x: image.width*6+1900-4 + image3.width*2, y: 470, image}),
               new Platform({ x: image.width*7+2200-4 + image3.width*2, y: image.height*1.85, image}),
               new Platform({ x: image.width*8+2200-20 + image3.width*2, y: image.height*1.85, image}),
               new Platform({ x: image.width*9+2300+250 + image3.width*2, y: 470, image}),
               new Platform({ x: 11150, y:260, image:flag}),
               new Platform({ x: image.width*10+2400+470 + image3.width*2, y: 355, image:image3}),
               new Platform({ x: image.width*10+2400+550 + image3.width*3, y: 355, image:image3}),
               new Platform({ x: image.width*10+2400+630 + image3.width*4, y: 355, image:image3}),
               new Platform({ x: image.width*10+2400+1400 + image3.width*4, y: 470, image})
               
                ];
  genericObjects= [new GenericObject({ x:0, y:0, image:image1}), 
                   new GenericObject({ x:0, y:0, image:image2}),
                   new GenericObject({x:290 , y:350, image:camel})
                  ];
                   
  winScenario = new WinScenario();                 

  scrollOffset = 0;
}

function animate() 
{
  requestAnimationFrame(animate);
  c.fillStyle='white';
  c.fillRect(0, 0, canvas.width, canvas.height);//clears the screen

  genericObjects.forEach((genObj) => {genObj.draw(); });
  platforms.forEach((platform) => {platform.draw(); });
  player.update();

  if (keys.right.pressed && player.position.x < 400)
    player.velocity.x = player.speed;
  else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset===0 && player.position.x>0))
    player.velocity.x = -player.speed;
  else 
  {
    player.velocity.x = 0;

    if (keys.right.pressed) 
    {
      scrollOffset += player.speed;
      platforms.forEach((platform) => { platform.position.x -= player.speed; });
      genericObjects.forEach((genObj)=>{genObj.position.x -= player.speed*0.66; });
    }
    else if (keys.left.pressed && scrollOffset>0) 
    {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => { platform.position.x += player.speed; });
      genericObjects.forEach((genObj)=>{genObj.position.x += player.speed*0.66; });
    }
  }

  //PLATFORM collision detection
  platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) 
    {
      player.velocity.y = 0;
    }
    
  })

  
  //Sprite switching
  if( keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.run.right)
  {
    player.frames=1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  }
  else if( keys.left.pressed && currentKey === 'left' && player.currentSprite != player.sprites.run.left)
  {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  }
  else if( !keys.left.pressed && currentKey === 'left' && player.currentSprite != player.sprites.stand.left)
  {
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }
  else if( !keys.right.pressed && currentKey === 'right' && player.currentSprite != player.sprites.stand.right)
  {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  //WIN condition
  if (scrollOffset > 10700)
    {
      console.log('You win');
      winScenario.draw();
      player.speed = 0;
      backgroundMusic.pause();
      winSong.play();
    }  
  //LOSE condition
  if (player.position.y>canvas.height)
    {
      init();
    }        
}

// init();
// animate();

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) 
  {
    case 65://left
      keys.left.pressed = true;
      currentKey = 'left';
      break;
    case 83://down
      break;
    case 68://right
      keys.right.pressed = true;
      currentKey = 'right';
      break;
    case 87://up
        player.velocity.y -= 25;
      break;
  }
});
addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) 
  {
    case 65://left-a
      keys.left.pressed = false;
      break;
    case 83://down-s
      break;
    case 68://right-d
      keys.right.pressed = false;
      break;
    case 87://up-w
      break;
  }
});
