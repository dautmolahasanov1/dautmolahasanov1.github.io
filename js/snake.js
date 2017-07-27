var s,
    scl = 20,
    food;
    play = document.querySelector(".play"),
    snake = document.querySelector("#snake");

function setup() {
    var canvas = createCanvas(300, 300);
    canvas.parent("snake")
    s = new Snake();
    frameRate(8);
    pickLocation();
}
function pickLocation() {
    var cols = floor(width / scl),
        rows = floor(height / scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}
function draw() {
    background(51);
    if (s.eat(food)) {
        pickLocation();
    }
    s.eat(food);
    s.update();
    s.show();
    s.death();
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}
function keyPressed(e) {
	e.preventDefault();
    if (keyCode === UP_ARROW && s.yspeed !== 1) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW && s.yspeed !== -1) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW && s.xspeed !== -1) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW && s.xspeed !== 1) {
        s.dir(-1, 0);
    }
}
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    play.addEventListener('click', function () {
        s.x = 0;
        s.y = 0;
        s.xspeed = 1;
        s.yspeed = 0;
        s.total = 0;
        s.tail = [];
    });
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }
    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i],
            	d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.x = 0;
                this.y = 0;
                this.xspeed = 0;
                this.yspeed = 0;
                this.total = 0;
                this.tail = [];
                console.log("died");
            }
        }
    }
    this.update = function() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }
    this.show = function() {
        fill(255);
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}
snake.addEventListener('touchstart', handleTouchStart, false);
snake.addEventListener('touchmove', handleTouchMove, false);
var xDown = null,
	yDown = null;
    
function handleTouchStart(e) {
e.preventDefault();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
};

function handleTouchMove(e) {
    if (!xDown || !yDown) {
        return;
    }
	
    var xUp = e.touches[0].clientX,
        yUp = e.touches[0].clientY,
        xDiff = xDown - xUp,
        yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && s.xspeed !== 1) {
            s.dir(-1, 0);
        } else if (s.xspeed !== -1) {
            s.dir(1, 0);
        }
    } else {
        if (yDiff > 0 && s.yspeed !== 1) {
            s.dir(0, -1);
        } else if (s.yspeed !== -1) {
            s.dir(0, 1);
        }
    }
    xDown = null;
    yDown = null;
};
