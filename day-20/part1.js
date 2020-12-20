let tiles = [];

let currentTile = {
  id: 0,
  rows: []
};

let unique = new Set();
let allSides = [];

let allSidesWithCount = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

function calculate(rowNumber) {
  // divide by 3
  // round down
  // subtract 2
  return Math.floor((rowNumber / 3)) - 2;
}

lineReader.on('line', function (line) {
  //   Tile 2311:
  // ..##.#..#.
  // ##..#.....
  // #...##..#.
  // ####.#...#
  // ##.##.###.
  // ##...#.###
  // .#.#.#..##
  // ..#....#..
  // ###...#.#.
  // ..###..###

  if (line.length === 0) {
    tiles.push(JSON.parse(JSON.stringify(currentTile)));

    currentTile = {
      id: 0,
      rows: []
    };

    return;
  }

  // New Row
  if (line.substring(0, 4) === 'Tile') {
    currentTile.id = line.substring(5);
    return;
  }

  currentTile.rows.push(line);
});


lineReader.on('close', function () {
  printTile(currentTile);

  buildCombinations();

  buildUnique();

  lookForCorners();

  let test = allSidesWithCount;

});


function printTile(tile) {
  console.log(tile.id);
  for (let i = 0; i < tile.rows.length; i++) {
    let row = tile.rows[i];

    console.log(row);

  }
}

function buildCombinations() {
  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];

    tile.edges = [];

    let top = tile.rows[0];
    let bottom = tile.rows[tile.rows.length - 1];
    let left = tile.rows.map((row) => row[0]).join('');
    let right = tile.rows.map((row) => row[tile.rows.length - 1]).join('');

    
    tile.edges.push(top);
    tile.edges.push(bottom);
    tile.edges.push(left);
    tile.edges.push(right);
    tile.edges.push(reverseString(top));
    tile.edges.push(reverseString(bottom));
    tile.edges.push(reverseString(left));
    tile.edges.push(reverseString(right));
  }

  function reverseString(str) {
    return str.split('').reverse().join('');
}
}

function buildUnique() {
  tiles.forEach(tile => {
    tile.rows.forEach(row => {
      unique.add(row);
      allSides.push(row);
    });
  });
}

function lookForCorners(){
  for (let side of unique) {   
   let count = allSides.filter(x => x === side);

   allSidesWithCount.push({
    count: count,
    side: side
   });
  }
}