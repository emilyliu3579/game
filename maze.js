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
................`]
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
f....w...
wwwwww.w.
wwwwww.wb
w...bw.ww
w.wwww...
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
afterInput(() => {
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
      levels[level] = map`
.w...
.wf..
.www.
p....
bwwww`;
      setMap(levels[level]);
    }
  }
})