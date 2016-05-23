/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('gApp').service('SnakeService', function ($timeout, $window) {
    var self = this;

    self.direction = {
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40
    };
    self.fruit = {
        isSet: false,
        x: 9,
        y: 5
    };

    self.snake = {
        position: [{x: 7, y: 5}, {x: 6, y: 5}, {x: 5, y: 5}],
        direction: self.direction.Down
    };

    self.boardSize = 20;

    self.Board = [];

    self.initBoard = function () {
        for (var i = 0; i < self.boardSize; i++) {
            self.Board[i] = [];
            for (var j = 0; j < self.boardSize; j++) {
                self.Board[i][j] = j;
            }
            self.Board[i][0] = i;
        }
    };

    self.generatePositionFruit = function ()
    {
        if (!self.fruit.isSet) {
            self.fruit.x = Math.floor(Math.random() * (20 - 0 + 0)) + 0;
            self.fruit.y = Math.floor(Math.random() * (20 - 0 + 0)) + 0;
            self.Board[self.fruit.x][self.fruit.y] = 'fruit';
            self.fruit.isSet = !self.fruit.isSet;
        } else {
            self.Board[self.fruit.x][self.fruit.y] = '';
            self.fruit.x = Math.floor(Math.random() * (20 - 0 + 0)) + 0;
            self.fruit.y = Math.floor(Math.random() * (20 - 0 + 0)) + 0;
            self.Board[self.fruit.x][self.fruit.y] = 'fruit';
        }
    };

    self.fillBoard = function () {
        for (var i = 0; i < self.boardSize; i++) {
            for (var j = 0; j < self.boardSize; j++) {
                self.Board[i][j] = i + 1;
            }
        }
    };

    self.boardColorStyle = function (board) {
        if (board === 'snake') {
            return 'green';
        } else if (board === 'fruit') {
            return 'blue';
        } else
            return 'white';

    };
    self.update = function () {
        self.drawSnakeOnBoard();
        if (!self.drawSnake()) {
            $timeout.cancel(gameover);
        } else {
            var gameover = $timeout(self.update, 150);
        }
    };

    self.changeDirection = function (direction) {
        if (direction.keyCode === self.direction.Left && self.snake.direction !== self.direction.Right) {
            self.snake.direction = self.direction.Left;
        } else if (direction.keyCode === self.direction.Up && self.snake.direction !== self.direction.Down) {
            self.snake.direction = self.direction.Up;
        } else if (direction.keyCode === self.direction.Right && self.snake.direction !== self.direction.Left) {
            self.snake.direction = self.direction.Right;
        } else if (direction.keyCode === self.direction.Down && self.snake.direction !== self.direction.Up) {
            self.snake.direction = self.direction.Down;
        }
    };

    self.drawSnake = function () {
// Note: first loop is for change position, tail chase head
        for (var i = self.snake.position.length - 1; i >= 1; i--) {
            self.Board[self.snake.position[i].x][self.snake.position[i].y] = '';
            self.snake.position[i].y = self.snake.position[i - 1].y;
            self.snake.position[i].x = self.snake.position[i - 1].x;
        }
        if (self.snake.direction === self.direction.Left) {
            ;
            self.snake.position[0].y -= 1;
        } else if (self.snake.direction === self.direction.Up) {
            self.snake.position[0].x -= 1;
        } else if (self.snake.direction === self.direction.Right) {
            self.snake.position[0].y += 1;
        } else if (self.snake.direction === self.direction.Down) {
            self.snake.position[0].x += 1;
        }
        if (self.detectColisionWithBoard() || self.detectColisionWithSnake()) {
            return false;
        } else {
            self.detectColisionWithFruit();
            self.Board[self.snake.position[0].x][self.snake.position[0].y] = 'snake';
            // Note: draw on main board
            for (var i = 0; i <= self.snake.position.length - 1; i++) {
                self.Board[self.snake.position[i].x][self.snake.position[i].y] = 'snake';
            }
            return true;
        }
    };

    self.detectColisionWithBoard = function () {
        if (self.snake.position[0].x < 0 || self.snake.position[0].y < 0) {
            console.log('gameover');
            return true;
        } else if (self.snake.position[0].x > 19 || self.snake.position[0].y > 19) {
            console.log('gameover');
            return true;
        } else
            return false;
    };

    self.detectColisionWithFruit = function () {
        var newTail = {};
        if (self.snake.position[0].x === self.fruit.x && self.snake.position[0].y === self.fruit.y) {
            newTail.x = self.fruit.x;
            newTail.y = self.fruit.y;
            self.generatePositionFruit();
            self.snake.position.push(newTail);
        }
    };

    self.detectColisionWithSnake = function () {
        for (var i = 1; i < self.snake.position.length; i++) {
            if (self.snake.position[0].x === self.snake.position[i].x && self.snake.position[0].y === self.snake.position[i].y) {
                return true;
            }
        }
    };

    self.generateSnake = function () {
        self.drawSnake();
        self.generatePositionFruit();
    };

    self.drawSnakeOnBoard = function () {
        for (var i = 0; i < self.snake.position.length; i++) {
            self.Board[self.snake.position[i].x][self.snake.position[i].y] = 'snake';
        }
    };

    return self;
});

