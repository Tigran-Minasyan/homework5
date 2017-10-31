const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const background = new Image();
background.src = 'images/Background.jpg';

const heroRight = new Image();
heroRight.src = 'images/hero_right.png';
const heroLeft = new Image();
heroLeft.src = 'images/hero_left.png';
const enemyImg = new Image();
enemyImg.src = 'images/enemy.png';
const bulletR = new Image();
bulletR.src = 'images/bullet_right.png';
const bulletL = new Image();
bulletL.src = 'images/bullet_left.png';

const heroLeftImg = heroLeft;
const heroRightImg = heroRight;
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

const characters = {
	hero: {
		x: 100,
		y: 375,
		w: 150,
		h: 200,
		yDelta: 0,
		img: heroRightImg,
		jump: false,
		direction: 0
	},
	bullet: {
		img: bulletR,
		w: 10,
		h: 10,
		xDelta: 0,
		visible: false,
		cooldown: false
	},
	enemy: {
		img: enemyImg,
		x: canvas.width-150,
		y: 385,
		w: 50,
		h: 185,
		xDelta: -1
	},
	score: 0
};

const hero = characters.hero;
const bullet = characters.bullet;
const enemy = characters.enemy;

const drawEnemy = function(){
	context.drawImage(enemy.img, enemy.x, enemy.y, enemy.w, enemy.h);
	enemy.x = enemy.x + enemy.xDelta;
	if(enemy.x <= 0 || enemy.x + enemy.w >= canvas.width){
		enemy.xDelta = -enemy.xDelta;
	}

	if(bullet.x+bullet.w >= enemy.x && bullet.x <= enemy.x + enemy.w && bullet.y){
		enemy.x = 5000;
		bullet.x = 10000;
		characters.score +=1;
		setTimeout(function(){
			const location = rand(2);
			if(location === 1){
				enemy.x = 100;
				if(enemy.xDelta > 0){
					enemy.xDelta += 0.5;
				} else {
					enemy.xDelta -= 0.5;
				}
			} else {
				enemy.x = canvas.width - enemy.w - 100;
				if(enemy.xDelta > 0 ){
					enemy.xDelta += 0.5;
				} else {
					enemy.xDelta -= 0.5;
				}
			}
			drawEnemy();
		}, 1000)
	}
}

const jump = function(){
	hero.yDelta = hero.yDelta - 20;
	hero.jump = true;
}

const draw = function(){

	context.drawImage(background,0,0,canvas.width,canvas.height);
	context.drawImage(hero.img,hero.x,hero.y,hero.w,hero.h);
	drawEnemy();
	context.font = '100px Arial'
	context.fillText(characters.score,100,100,1000)
	if(bullet.visible === true){
		context.drawImage(bullet.img,bullet.x,bullet.y,bullet.w,bullet.h);
		bullet.x = bullet.x + bullet.xDelta;		
	}
	hero.y = hero.y + hero.yDelta;
	if(hero.y <= 75){
		hero.yDelta = -hero.yDelta;
	}
	if(hero.y >= 375){
		hero.yDelta = 0;
		hero.jump = false;
	}
}

const shoot = function(){

	bullet.cooldown = true;

	if(hero.direction === 0){
		bullet.img = bulletR;
		bullet.x = hero.x+hero.w;
		bullet.y = hero.y+35;
		bullet.visible = true;
		bullet.xDelta = 15;
	} else {
		bullet.img = bulletL;
		bullet.x = hero.x;
		bullet.y = hero.y+35;
		bullet.visible = true;
		bullet.xDelta = -15;
	}
	setTimeout(function(){bullet.cooldown = false;}, 1500)
}

const loop = function(){
	draw();
	if(hero.x <= 0){
		hero.x = hero.x + 5;
	}
	if(hero.x + hero.w >= canvas.width){
		hero.x = hero.x-5;
	}

	requestAnimationFrame(loop);
}

document.addEventListener('keydown', function(event){
	if(event.keyCode === rightKey){
		hero.img = heroRightImg;
		hero.x = hero.x + 5;
		hero.direction = 0;
	} 
	if(event.keyCode === leftKey){
		hero.img = heroLeftImg;
		hero.x = hero.x - 5;
		hero.direction = 1;
	} 
	if(event.keyCode === upKey){
		if(hero.jump === false){
			jump();
		}
	}
	if(event.keyCode === downKey){
		if(bullet.cooldown === false){
			shoot();
		}
	}
}, false);

loop();

//TODO: make score
// make platform
// make jump more smooth
// add enemies
// add gameover
// improve movement
// increase shoot cooldown
// add cooldown text