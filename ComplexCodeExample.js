// Filename: ComplexCodeExample.js

/**
 * This code generates a random maze using the recursive backtracking algorithm.
 * It then solves the maze using the A* search algorithm to find the shortest path.
 * The code includes classes for the maze, cells, and a priority queue for the A* algorithm.
 * It also includes functions to generate the maze, solve the maze, and visualize the process.
 * The maze is displayed in the console using ASCII characters.
 */

// Maze class
class Maze {
  constructor(size) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() => Array(size).fill(null));
  }

  createMaze() {
    // Generate the initial maze walls
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = new Cell(i, j);
        if (i === 0 || i === this.size - 1 || j === 0 || j === this.size - 1) {
          this.grid[i][j].isWall = true;
        }
      }
    }

    // Generate the maze paths using recursive backtracking
    let stack = [];
    let currentCell = this.grid[1][1];
    currentCell.isVisited = true;
    stack.push(currentCell);

    while (stack.length !== 0) {
      const neighbors = this.getUnvisitedNeighbors(currentCell);

      if (neighbors.length === 0) {
        currentCell = stack.pop();
      } else {
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        randomNeighbor.isVisited = true;
        this.removeWalls(currentCell, randomNeighbor);
        stack.push(randomNeighbor);
        currentCell = randomNeighbor;
      }
    }
  }

  getUnvisitedNeighbors(cell) {
    const i = cell.i;
    const j = cell.j;
    const neighbors = [];

    if (i > 1) neighbors.push(this.grid[i - 2][j]);
    if (i < this.size - 2) neighbors.push(this.grid[i + 2][j]);
    if (j > 1) neighbors.push(this.grid[i][j - 2]);
    if (j < this.size - 2) neighbors.push(this.grid[i][j + 2]);

    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }

  removeWalls(cell1, cell2) {
    const dx = cell2.i - cell1.i;
    const dy = cell2.j - cell1.j;

    if (dx < 0) {
      cell1.rightWall = false;
      cell2.leftWall = false;
    } else if (dx > 0) {
      cell1.leftWall = false;
      cell2.rightWall = false;
    } else if (dy < 0) {
      cell1.bottomWall = false;
      cell2.topWall = false;
    } else if (dy > 0) {
      cell1.topWall = false;
      cell2.bottomWall = false;
    }
  }
}

// Cell class
class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.isVisited = false;
    this.isWall = false;
    this.topWall = true;
    this.rightWall = true;
    this.bottomWall = true;
    this.leftWall = true;
  }
}

// Priority queue class
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

// A* search algorithm to solve the maze
function solveMaze(maze) {
  const startCell = maze.grid[1][1];
  const targetCell = maze.grid[maze.size - 2][maze.size - 2];

  const openSet = new PriorityQueue();
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  cameFrom[startCell] = null;
  gScore[startCell] = 0;
  fScore[startCell] = heuristic(startCell, targetCell);

  openSet.enqueue(startCell, fScore[startCell]);

  while (!openSet.isEmpty()) {
    const currentCell = openSet.dequeue();

    if (currentCell === targetCell) {
      return reconstructPath(cameFrom, currentCell);
    }

    const neighbors = getNeighbors(currentCell);

    for (const neighbor of neighbors) {
      const tentativeGScore = gScore[currentCell] + 1;

      if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = currentCell;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, targetCell);
        if (!openSet.queue.some((item) => item.item === neighbor)) {
          openSet.enqueue(neighbor, fScore[neighbor]);
        }
      }
    }
  }

  return null;
}

function getNeighbors(cell) {
  const i = cell.i;
  const j = cell.j;
  const neighbors = [];

  if (!cell.topWall) neighbors.push(cells[i - 1][j]);
  if (!cell.rightWall) neighbors.push(cells[i][j + 1]);
  if (!cell.bottomWall) neighbors.push(cells[i + 1][j]);
  if (!cell.leftWall) neighbors.push(cells[i][j - 1]);

  return neighbors;
}

function heuristic(cell1, cell2) {
  return Math.abs(cell1.i - cell2.i) + Math.abs(cell1.j - cell2.j);
}

function reconstructPath(cameFrom, currentCell) {
  const path = [];
  while (currentCell) {
    path.unshift(currentCell);
    currentCell = cameFrom[currentCell];
  }
  return path;
}

// Visualize the maze and the solution
function visualizeMaze(maze, path) {
  const charWall = "█";
  const charPath = ".";
  const charStart = "S";
  const charTarget = "T";
  const charSolution = "+";

  for (let i = 0; i < maze.size; i++) {
    let row = "";
    for (let j = 0; j < maze.size; j++) {
      const cell = maze.grid[i][j];
      if (cell.isWall) {
        row += charWall;
      } else if (cell === path[0]) {
        row += charStart;
      } else if (cell === path[path.length - 1]) {
        row += charTarget;
      } else if (path.includes(cell)) {
        row += charSolution;
      } else {
        row += charPath;
      }
    }
    console.log(row);
  }
}

// Generate and solve the maze
const mazeSize = 21; // Must be an odd number
const maze = new Maze(mazeSize);
maze.createMaze();
const solutionPath = solveMaze(maze);

// Visualize the maze and the solution
visualizeMaze(maze, solutionPath);