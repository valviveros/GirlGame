// width and height for our canvas
var canW = window.innerWidth;
var canH = window.innerHeight;
// x and y coordinates to render the sprite 
var x = 0;
var y = 0;
// x and y coordinates of the canvas to get the single frame 
var srcX;
var srcY;
// the with and height of our spritesheet
var sheetW = 864;
var sheetH = 216;
// we are having two rows and 8 cols in the current sprite sheet
var cols = 8;
var rows = 2;
// to get the width of a single sprite we divided the width of sprite with the number of cols
//because all the sprites are of equal width and height 
var width = sheetW / cols;
// same for the height we divided the height with number of rows 
var height = sheetH / rows;
// each row contains 8 frame and at start we will display the first frame (assuming the index from 0)
var currentFrame = 0;
// 1st (second) row for the left movement (counting the index from 0)
var trackLeft = 1;
// the 0th (first) row is for the right movement
var trackRight = 0;
var speedMovement = 5;

var fishX = 200;
var fishY = 75;
var fishW = 48;
var fishH = 28;

var collisionDetected = 0;

var canvas;
var canvas2;

let keyPresses = {
    isPressed: false
};

window.onload = function () {

    let viewDirection = trackRight;

    var character = new Image();
    character.src = "./assets/img/FoxySpriteSheet.png";
    var fishy = new Image();
    fishy.src = "./assets/img/Fishy.png";

    var soundFish = new Audio('./assets/audio/pickup.wav');

    character.onload = () => {
        canvas = document.getElementById('canvas');
        canvas.width = canW;
        canvas.height = canH;
        var ctx = canvas.getContext('2d');
        canvas2 = document.getElementById('canvas2');
        canvas2.width = canW;
        canvas2.height = canH;
        var ctx2 = canvas2.getContext('2d');

        function updateFrame() {
            currentFrame = ++currentFrame % cols;
            if (!keyPresses.isPressed) {
                if (viewDirection == trackLeft) {
                    srcX = 7 * width;
                } else {
                    srcX = 0;
                }
            } else {
                srcX = currentFrame * width;
            }

            srcY = viewDirection * height;

            if (keyPresses.a) {
                viewDirection = trackLeft;
                moveCharacter(-speedMovement, 0);
            } else if (keyPresses.d) {
                viewDirection = trackRight;
                moveCharacter(speedMovement, 0);
            }

            if (keyPresses.w) {
                viewDirection = trackRight;
                moveCharacter(0, -speedMovement);
            } else if (keyPresses.s) {
                viewDirection = trackRight;
                moveCharacter(0, speedMovement);
            }
            ctx.clearRect(x, y, width, height);
        }
        fishy.onload = () => {
            ctx2.drawImage(fishy, fishX, fishY);
        }

        function drawImage() {
            updateFrame();
            ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
        }

        function moveCharacter(deltaX, deltaY) {
            if (x + deltaX > 0 && x + width + deltaX < canW) {
                x += deltaX;
            }
            if (y + deltaY > 0 && y + height + deltaY < canH) {
                y += deltaY;
            }
            checkCollision(x-25, y-25);
        }

        function checkCollision(charX, charY) {
            if (charX < fishX + fishW && charX + width > fishX && charY < fishY + fishH && charY + height > fishY) {
                console.log('pescado x');
                ctx2.clearRect(fishX, fishY, fishW, fishH);
                collisionDetected += 1;
                if (collisionDetected == 1) {
                    soundFish.play();
                }
            }
        }

        setInterval(function () {
            drawImage();
        }, 100);

        window.addEventListener('keydown', keyDownListener);
        function keyDownListener(event) {
            keyPresses[event.key] = true;
            keyPresses['isPressed'] = true;
        }

        window.addEventListener('keyup', keyUpListener);
        function keyUpListener(event) {
            keyPresses[event.key] = false;
            keyPresses['isPressed'] = false;
        }
    }
}

window.onresize = () => {
    console.log("window resize");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
