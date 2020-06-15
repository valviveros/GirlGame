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

var canvas; 

let keyPresses = {
    isPressed: false
};
window.onload = function () {

    let viewDirection = trackRight;

    var character = new Image();
    character.src = "./assets/img/TeddySpriteSheet.png";
    character.onload = () => {
        canvas = document.getElementById('canvas');
        canvas.width = canW;
        canvas.height = canH;
        var ctx = canvas.getContext('2d');

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
                srcY = trackLeft * height;
                viewDirection = trackLeft;
                x -= 5;
            } else if (keyPresses.d) {
                x += 5;
                srcY = trackRight * height;
                viewDirection = trackRight;
            }
            
            if (keyPresses.w) {
                srcY = trackRight * height;
                viewDirection = trackRight;
                y -= 5;
            } else if (keyPresses.s) {
                y += 5;
                srcY = trackRight * height;
                viewDirection = trackRight;
            }
            ctx.clearRect(x, y, width, height);
        }

        function drawImage() {
            updateFrame();
            ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
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
