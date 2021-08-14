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

  drawEnemies(enemies);
  let score = 0;
  let isGameEnd = false;
  updateScore();

  function updateScore() {
    document.querySelector("#score-text").innerText = score
      .toString()
      .padStart(3, "0");
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
      displayResult("Conquered 🏆🏆🏆");
    }
    if (allEnemies > 0) {
      let enemiesSorted = enemies.sort();
      if (enemiesSorted[enemiesSorted.length - 1].top >= hero.top - 50) {
        displayExplosion(hero.left, hero.top);
        const heroIcon = (document.querySelector("#hero").style.display =
          "none");
        displayResult("Game over😕😕😕");
      }
    }
  }

  function displayResult(gameResult) {
    isGameEnd = true;
    clearInterval(game);
    const container = document.querySelector("#background");
    const result = document.createElement("div");
    result.className = "result";
    result.innerText = gameResult + ` Your Score is ${score}`;
    missiles.splice(0, missiles.length);
    drawMissiles(missiles);
    container.append(result);
  }

  let game = setInterval(() => {
    checkCollision(enemies, missiles);
    updateEnemies(enemies);
    drawEnemies(enemies);
    updateMissiles(missiles);
    drawMissiles(missiles);
    gameEnd();
  }, 20);
  drawEnemies(enemies);

  document.onkeydown = function moveHero(event) {
    const left = 37;
    const right = 39;
    const top = 38;
    const down = 40;
    const space = 32;
    if (isGameEnd === false) {
      if (event.key == left && hero.left > 5) {
        hero.left -= 10;
        document.querySelector("#hero").style.left = hero.left;
      }
      if (event.key == right && hero.left < 1145) {
        hero.left += 10;
        document.querySelector("#hero").style.left = hero.left;
      }
      //   if (event.keyCode==top && top<hero.top) {
      //         hero.top-=10;
      //         document.querySelector('#hero').style.top= hero.top;
      //   }
      //   if (event.keyCode==down) {
      //         hero.top+=10;
      //         document.querySelector('#hero').style.top= hero.top;
      //   }
      if (event.key == space) {
        missiles.push({ left: hero.left + 20, top: hero.top - 20 });
        drawMissiles(missiles);
     }
    }
  };