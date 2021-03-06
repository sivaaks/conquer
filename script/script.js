let hero = {
    left: 575,
    top: 700,
  };

  let missiles = [];

  let enemies = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 },
    { left: 200, top: 175 },
    { left: 300, top: 175 },
    { left: 400, top: 175 },
    { left: 500, top: 175 },
    { left: 600, top: 175 },
    { left: 700, top: 175 },
    { left: 800, top: 175 },
    { left: 900, top: 175 },
  ];

  let score = 0;
  let isGameEnd = false;
  let isGameRunning= false;
  let missileCount=20;
  let game;
  

  welcomeScreen(true);
  drawMissileCount(missileCount);
  updateMissileCount(missileCount);
  updateScore();

function welcomeScreen(isVisible){
    const container = document.querySelector("#background");
    const result = document.createElement("div");
    container.append(result);
  if(isVisible){
    result.className = "result";
    result.innerText = `Press S to start ` + ` Watch your volume`;
  } if(!isVisible) {
    document.querySelector('.result').style.display='none';
  }
    
}

  function updateScore() {
    document.querySelector("#score-text").innerText = score
      .toString()
      .padStart(3, "0");
  }

  function updateMissileCount(missileCount){
  document.querySelector("#missile-count-text").innerText = missileCount;
  }

  function drawMissileCount(missileCount){
    const eachMissileTop=30;
    let eachMissileLeft=20;
    document.querySelector("#missile-count").innerHTML = ``;
    for(let eachMissile=0;eachMissile<missileCount;eachMissile++){
      document.querySelector("#missile-count").innerHTML += `<div class="each-missile" style="left:${eachMissileLeft}; top:${eachMissileTop};"></div>`;
      eachMissileLeft+=12;
    }
  }

  function drawEnemies(enemies) {
    document.querySelector("#enemies").innerHTML = ``;
    enemies.forEach((enemy) => {
      document.querySelector(
        "#enemies"
      ).innerHTML += `<div class="enemy" style="left:${enemy.left}; top:${enemy.top};"></div>`;
    });
  }

  function displayExplosion(left, top) {
    document.querySelector(
      "#explosion"
    ).innerHTML += `<div class="explosion" style="left:${left}; top:${top};"></div>`;
    setInterval(() => {
      hideExplosion(left, top);
    }, 800);
  }
  function hideExplosion(left, top) {
    document.querySelector("#explosion").innerHTML = document
      .querySelector("#explosion")
      .innerHTML.replace(
        `<div class="explosion" style="left:${left}; top:${top};"></div>`,
        ""
      );
  }

  function drawMissiles(missiles) {
    document.querySelector("#missiles").innerHTML = ``;
    missiles.forEach((missile) => {
      document.querySelector(
        "#missiles"
      ).innerHTML += `<div class="missile1" style="left:${missile.left}; top:${missile.top};"></div>`;
    });
  }

  function updateEnemies(enemies) {
    enemies = enemies.map((position) => ({
      ...position,
      top: (position.top += 0.5),
    }));
  }

  function updateMissiles(missiles) {
    missiles = missiles.map((position) => ({
      ...position,
      top: (position.top -= 10),
    }));
  }

  function checkCollision(enemies, missiles) {
    for (let enemy = 0; enemy < enemies.length; enemy++) {
      for (let missile = 0; missile < missiles.length; missile++) {
        if (
          missiles[missile].top >= enemies[enemy].top &&
          missiles[missile].top <= enemies[enemy].top + 50 &&
          missiles[missile].left >= enemies[enemy].left &&
          missiles[missile].left <= enemies[enemy].left + 50
        ) {
          displayExplosion(enemies[enemy].left, enemies[enemy].top);
          playGameSound('explosion');
          enemies.splice(enemy, 1);
          missiles.splice(missile, 1);
          score += 10;
          updateScore();
        }
      }
    }
  }

  function gameEnd() {
    const allEnemies = enemies.length;
    if (allEnemies === 0) {
      displayResult("Conquered ????????????");
      playGameSound('won');
    }
    if (allEnemies > 0) {
      let enemiesSorted = enemies.sort();
      if (enemiesSorted[enemiesSorted.length - 1].top >= hero.top - 50) {
        playGameSound('gameover');
        displayExplosion(hero.left, hero.top);
        const heroIcon = (document.querySelector("#hero").style.display = "none");
        displayResult("Game over????????????");
      }
    }
  }

  function playGameSound(soundType){
    let gameAudio;
    if(soundType==='gameover') gameAudio= new Audio('/assets/game-over.wav');
    if(soundType==='missile') gameAudio=new Audio('/assets/missile.mp3');
    if(soundType==='explosion') gameAudio=new Audio('/assets/explosion.mp3');
    if(soundType==='won') gameAudio=new Audio('/assets/won.mp3');
    if(soundType==='no-missile') gameAudio=new Audio('/assets/no-missile.mp3');
    gameAudio.volume=0.05;
    gameAudio.play();
  }

  function displayResult(gameResult) {
    isGameEnd = true;
    isGameRunning=false;
    clearInterval(game);
    const container = document.querySelector("#background");
    const result = document.createElement("div");
    result.className = "result";
    result.innerText = gameResult + ` Your Score is ${score}`;
    missiles.splice(0, missiles.length);
    drawMissiles(missiles);
    container.append(result);
  }

  function runGame(){
    checkCollision(enemies, missiles);
    updateEnemies(enemies);
    drawEnemies(enemies);
    updateMissiles(missiles);
    drawMissiles(missiles);
    gameEnd();
  }


  document.onkeydown = function moveHero(event) {
    const left = 37;
    const right = 39;
    const top = 38;
    const down = 40;
    const space = 32;
    const keyS= 83;
    if (isGameEnd === false) {
      if (event.keyCode == left && hero.left > 5) {
        hero.left -= 10;
        document.querySelector("#hero").style.left = hero.left;
      }
      if (event.keyCode == right && hero.left < 1145) {
        hero.left += 10;
        document.querySelector("#hero").style.left = hero.left;
      }
      if(event.keyCode==keyS){
      if(!isGameRunning) {
        welcomeScreen(false);
        game=setInterval(runGame,20);
        isGameRunning= true;
      }
    }
      if (event.keyCode == space) {
        if (missileCount>0 && isGameRunning) {
        missiles.push({ left: hero.left + 20, top: hero.top - 20 });
        drawMissiles(missiles);
        missileCount-=1;
        playGameSound('missile');
        drawMissileCount(missileCount);
        updateMissileCount(missileCount);
        } else playGameSound('no-missile');

     }
    }
  };