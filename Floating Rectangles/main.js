const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const points = [];
const colorArr = ['red','green','orange','black','yellow','blue','lightblue','grey','purple','pink']

//Part one
const createPoints = function(count, canvasWidth, canvasHeight){
	const pointsLoop = function(count, arr){
		if(count<=0){
			return '';
		}

		points[arr] = {
            x: rand(canvasWidth-100),
            y: rand(canvasHeight-100),
            w: rand(100)+10,
            h: rand(100)+10,
            xDelta: rand(20)-10,
            yDelta: rand(20)-10,
            color: colorArr[rand(10)-1]
        }

		return pointsLoop(count-1,arr+1);
	}

	return pointsLoop(count, 0);
}

//Part two
//First must give a value to count in createPoints
const draw = function(arr){
	if(arr === points.length){
		return;
	}

	context.fillStyle = points[arr].color;
	context.fillRect(points[arr].x,points[arr].y,points[arr].w,points[arr].h);
	return draw(arr+1);
}

const update = function(arr){
    if(arr === points.length){
        return;
    }

    points[arr].x = points[arr].x + points[arr].xDelta;
    points[arr].y = points[arr].y + points[arr].yDelta;
    if(points[arr].x <= 0 || points[arr].x + points[arr].w >= canvas.width){
        points[arr].xDelta = -points[arr].xDelta;
    }
    else if(points[arr].y <= 0 || points[arr].y + points[arr].h >= canvas.height){
        points[arr].yDelta = -points[arr].yDelta;
    }
    update(arr+1);
    return '';
}

const loop = function(){
    context.clearRect(0,0,canvas.width,canvas.height)    
    
    draw(0);
    update(0);
    requestAnimationFrame(loop);
}
createPoints(1000,canvas.width,canvas.height);

loop()