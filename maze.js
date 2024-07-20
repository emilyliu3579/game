/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: first
@author: 
@tags: []
@addedOn: 2024-00-00
*/

// objects
const player = "p"
const flag = "f"
const wall = "w"
const button = "b"
const monster = "m"

setLegend(
  [ player, bitmap`
................
................
......0...0.....
.......0.0......
........0.......
.....0000000....
.....0333330....
.....0477350....
.....0447750....
.....0444440....
.....0000000....
................
................
................
................
................` ],
  [ flag, bitmap`
................
................
................
....0...........
....03333.......
....03333333....
....03333333....
....03333333....
....0...3333....
....0...........
....0...........
....0...........
....0...........
................
................
................`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ button, bitmap`
................
................
................
................
................
................
................
.....333333.....
.....333333.....
.....333333.....
.....333333.....
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
................
................`],
  [ monster, bitmap`
................
....8888888.....
..888888888888..
..88DDDDDDDD88..
..88DDDDDDDD88..
..88DD4DD4DD88..
..88DDDDDDDD88..
..88DDDDDDDD88..
..88DDD00DDD88..
....DDDDDDDD....
.......DD.......
.....DDDDDD.....
.......DD.......
.......DD.......
......D..D......
.....D....D.....`]
);

setSolids([ player, wall ]);

// maps
let level = 0
const levels = [
  map`
pw...wf
.w.w.w.
.w.w.w.
.w.w.w.
.w.w.w.
.w.w.w.
.w.w.w.
...w...`,
  map`
...fw.w
.wwww.w
....w..
www...w
.pwww.w
.ww....
....ww.
.www...`,
  map`
pw...
.wf..
.www.
.w...
bwwww`,
  map`
f........
wwwwww.w.
wwwwww.w.
w....w.ww
w.w.ww...
w.w.w.ww.
www.w..w.
bpw.ww.w.
www......`,
  map`
.wwwwwwww
.w.w...pw
...ww.w.w
ww..wbw.w
.ww.wwwmw
..w.w.www
w...w...f
www...www`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: []
});

// actions
let isGameOver = false;
onInput("s", () => {
  if (!isGameOver) {
    getFirst(player).y += 1;
  }
});
onInput("w", () => {
  if (!isGameOver) {
    getFirst(player).y -= 1;
  }
});
onInput("d", () => {
  if (!isGameOver) {
    getFirst(player).x += 1;
  }
});
onInput("a", () => {
  if (!isGameOver) {
    getFirst(player).x -= 1;
  }
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// ending
const moveSpriteAfterDelay = (sprite, newX, newY, delay) => {
  setTimeout(() => {
    sprite.x = newX;
    sprite.y = newY;
  }, delay); // Specify the delay in milliseconds
};

let moveCount = 0;
let isMonsterMoving = true;
const moveMonster = () => {
  if(!isMonsterMoving) {
    return;
  }
  if(level == 3) {
    level3();
  } else if(level == 4) {
    level4();
  }
};

const monsterCatch = () => {
  if(getFirst(player).x == getFirst(monster).x && getFirst(player).y == getFirst(monster).y) {
    addText("you lost", { y: 4, color: color`3`});
    addText("reset to try again", { y: 6, color: color`3`});
    isMonsterMoving = false;
    isGameOver = true;
  }
};

const level3 = () => {
  const mons = getFirst(monster);
  if (moveCount < 4) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 1000);
  } else if (moveCount < 6) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 1000);
  } else if (moveCount < 11) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 1000);
  } else if (moveCount < 16) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 1000);
  } else if (moveCount < 20) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 1000);
  } else if (moveCount < 22) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 1000);
  } else if (moveCount < 26) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 1000);
  } else if (moveCount < 31) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 1000);
  }
  moveCount += 1;
  if (moveCount < 31) {
    monsterCatch();
    setTimeout(moveMonster, 1000); // Recursive call to continue movement
  }
}

const level4 = () => {
  const mons = getFirst(monster);
  if (moveCount < 3) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 1000);
  } else if(moveCount < 8) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 1000);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 1000);
  } else if(moveCount <11) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 1000);
  } else if(moveCount < 15) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 1000);
  } else if(moveCount < 17) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 1000);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 1000);
  } else if(moveCount < 20) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 1000);
  }
  moveCount += 1;
  if (moveCount < 20) {
    monsterCatch();
    setTimeout(moveMonster, 1000); // Recursive call to continue movement
  }
}

afterInput(() => {
  const playerPosition = getFirst(player);
  const playerX = playerPosition.x;
  const playerY = playerPosition.y;
  
  if (tilesWith(flag, player).length == 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      moveCount = 0;
    } else {
      addText("you win!", { y: 4, color: color`3` });
      isGameOver = true;
    }
  }

  if(level == 2) {
    if(tilesWith(button, player).length == 1) {
      clearTile(1,3);
    }
  }

  if(level == 3) {
    if(tilesWith(button, player).length == 1) {
      clearTile(1,6);
    }

    // monster will chase after (1,3)
    if(playerX == 1 && playerY == 3) {
      addSprite(1, 7, monster);
      // Start the movement of the monster
      moveMonster();
    }
  }

  if(level == 4) {
    if(tilesWith(button, player).length == 1) {
      clearTile(3,1);
    }
    moveMonster();
  }
});