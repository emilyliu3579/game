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
)

setSolids([ player, wall ])

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
]

const currentLevel = levels[level]
setMap(currentLevel)

setPushables({
  [ player ]: []
})

// actions
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})

// ending
const moveSpriteAfterDelay = (sprite, newX, newY, delay) => {
  setTimeout(() => {
    sprite.x = newX;
    sprite.y = newY;
  }, delay); // Specify the delay in milliseconds
}

let moveCount = 0;
const moveMonster = () => {
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
    setTimeout(moveMonster, 1000); // Recursive call to continue movement
  }
};

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
    } else {
      addText("you win!", { y: 4, color: color`3` });
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
})