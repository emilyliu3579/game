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
const horwall = "h"
const button = "b"
const monster = "m"

setLegend(
  [ player, bitmap`
....0000000.....
....0202020.....
....0000000.....
....0666660.....
....0606060.....
....0666660.....
....0000000.....
.....02220......
...000000000....
.....02220......
.....00000......
.....02220......
.....00000......
......0.0.......
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
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL`],
  [ horwall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
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
.....555555.....
.....555555.....
.....555555.....
....00000000....
....06666660....
....06066060....
....06666660....
....00000000....
.....555555.....
...0055555500...
...0.555555.0...
...0055555500...
.....555555.....
.....555555.....
......0..0......
.....00..00.....`]
);

setSolids([ player, wall, horwall ]);

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
.hhhw.w
....w..
hhh...w
.pwhh.w
.hh....
....hh.
.hhh...`,
  map`
pw...
.wf..
.whh.
.w...
bwhhh`,
  map`
f........
hhhhhh.w.
hhhhhh.w.
w....w.hh
w.w.ww...
w.w.w.hh.
hhw.w..w.
bpw.hh.w.
hhw......`,
  map`
.hhhhhhhh
.w.w...pw
...hh.w.w
hh..wbw.w
.wh.whwmw
..w.w.hhh
w...w...f
hhh...hhh`,
  map`
m.hhhh.......
.h.....hhh.hh
p..whhhh.....
hh.w.....hhh.
...whhh.w.w..
.w..w.w.w.ww.
.w.hh.w....wh
.w....hhhh.w.
hw.whh.hhh.w.
...w.......w.
.hhf.hhhhh...`,
  map`
hhhhhhhhhhh
p...wbw...f
hhh.w.whhh.
....w.w....
.hhhw.whhh.
......w....
hhhhhhwhhh.`,
  map`
.....f.....
.whhhwhhhw.
.w...w...w.
...w.w.w...
hhhw.w.whhh
...w.w.w...
pw...w...wm`,
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
    isGameOver = false;
    isMonsterMoving = true;
    moveCount = 0;
    isMonsterPresent = false;
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
  } else if(level == 5) {
    level5();
  } else if(level == 7) {
    level7();
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

const monsterWin = () => {
  const flagPos = getFirst(flag);
  const monsPos = getFirst(monster);
  if(flagPos.x == monsPos.x && flagPos.y == monsPos.y) {
   addText("you lost", { y: 4, color: color`3`});
    addText("reset to try again", { y: 6, color: color`3`});
    isGameOver = true;
  }
}

const level3 = () => {
  const mons = getFirst(monster);
  if (moveCount < 4) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 500);
  } else if (moveCount < 6) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 500);
  } else if (moveCount < 11) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 500);
  } else if (moveCount < 16) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 500);
  } else if (moveCount < 20) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 500);
  } else if (moveCount < 22) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 500);
  } else if (moveCount < 26) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 500);
  } else if (moveCount < 31) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 500);
  }
  moveCount += 1;
  if (moveCount < 31) {
    monsterCatch();
    setTimeout(moveMonster, 500); // Recursive call to continue movement
  }
};

const level4 = () => {
  let mons = getFirst(monster);
  if (moveCount < 3) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 500);
  } else if(moveCount < 8) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 500);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 500);
  } else if(moveCount <11) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 500);
  } else if(moveCount < 15) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 500);
  } else if(moveCount < 17) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 500);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 500);
  } else if(moveCount < 20) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 500);
  }
  moveCount += 1;
  if (moveCount < 20) {
    monsterCatch();
    setTimeout(moveMonster, 500); // Recursive call to continue movement
  }
};

const level5 = () => {
  let mons = getFirst(monster);
  if (moveCount < 2) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 4) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 5) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 300);
  } else if(moveCount <9) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 300);
  } else if(moveCount < 14) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 16) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 300);
  } else if(moveCount < 19) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 20) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 300);
  } else if(moveCount < 23) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 26) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 29) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 35) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 300);
  } else if(moveCount < 36) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 300);
  }
  moveCount += 1;
  if (moveCount < 36) {
    monsterCatch();
    setTimeout(moveMonster, 300); // Recursive call to continue movement
  }
};

const level7 = () => {
  let mons = getFirst(monster);
  if (moveCount < 1) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 200);
  } else if(moveCount < 3) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 200);
  } else if(moveCount < 4) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 200);
  } else if(moveCount < 6) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 200);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 200);
  } else if(moveCount < 12) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 200);
  } else if(moveCount < 13) {
    moveSpriteAfterDelay(mons, mons.x, mons.y + 1, 200);
  } else if(moveCount < 15) {
    moveSpriteAfterDelay(mons, mons.x + 1, mons.y, 200);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(mons, mons.x, mons.y - 1, 200);
  } else if(moveCount < 23) {
    moveSpriteAfterDelay(mons, mons.x - 1, mons.y, 200);
  }
  moveCount += 1;
  if (moveCount < 23) {
    monsterCatch();
    monsterWin();
    setTimeout(moveMonster, 200); // Recursive call to continue movement
  }
};

let isMonsterPresent = false; 

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
      isMonsterPresent = false;
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
    if(isMonsterPresent) {
      return;
    }
    // monster will chase after (1,3)
    if(playerX == 1 && playerY == 3) {
      addSprite(1, 7, monster);
      // Start the movement of the monster
      moveMonster();
      isMonsterPresent = true;
    }
  }

  if(level == 4) {
    if(tilesWith(button, player).length == 1) {
      clearTile(3,1);
    }
    if(playerX == 6 && playerY == 1) {
      // Start the movement of the monster
      moveMonster();
    }
  }

  if(level == 5) {
    if(playerX == 0 && playerY == 2) {
      // Start the movement of the monster
      moveMonster();
    }
  }

  if(level == 6) {
    if(tilesWith(button, player).length == 1) {
      clearTile(6,5);
    }
  }

  if(level == 7) {
    if(playerX == 0 && playerY == 5) {
      moveMonster();
    }
  }
});