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
        position: [{x: 5, y: 5}, {x: 6, y: 5}],
        direction: self.direction.Left
    };

    self.snake = {
        isSet: false,
        position: [{x: 10, y: 10}, {x: 11, y: 10}],
        direction: self.direction.Left
    };

    self.boardSize = 20;

    self.Board = [];

    self.initBoard = function () {
        for (var i = 0; i < self.boardSize; i++) {
            self.Board[i] = [];
            for (var j = 0; j < self.boardSize; j++) {
                self.Board[i][j] = '';
            }
        }
    };

    self.generatePosition = function ()
    {
        self.police.position.x = Math.floor(Math.random() * (20 - 0 + 0)) + 0;
        self.police.position.y = Math.floor(Math.random() * (20 - 0 + 0)) + 0;
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
        self.drawFruit();
        $timeout(self.update, 150);
    };

    self.changeDirection = function (direction) {
        if (direction.keyCode === self.direction.Left && self.fruit.direction !== self.direction.Right) {
            self.fruit.direction = self.direction.Left;
        } else if (direction.keyCode === self.direction.Up && self.fruit.direction !== self.direction.Down) {
            self.fruit.direction = self.direction.Up;
        } else if (direction.keyCode === self.direction.Right && self.fruit.direction !== self.direction.Left) {
            self.fruit.direction = self.direction.Right;
        } else if (direction.keyCode === self.direction.Down && self.fruit.direction!== self.direction.Up) {
            self.fruit.direction = self.direction.Down;
        }
    };

    self.drawFruit = function () {
            self.Board[self.fruit.position[1].x][self.fruit.position[1].y] = '';
            self.fruit.position[1].y = self.fruit.position[0].y;
            self.fruit.position[1].x = self.fruit.position[0].x;
            if (self.fruit.direction === self.direction.Left) {
                //   self.Board[newTail.x][newTail.y] = '';
                //newTail.y = self.fruit.position[0].y;

                self.fruit.position[0].y -= 1;
            } else if (self.fruit.direction === self.direction.Up) {
                // self.Board[newTail.x][newTail.y] = '';
                // newTail.x = self.fruit.position[0].x;
                self.fruit.position[0].x -= 1;
            } else if (self.fruit.direction === self.direction.Right) {
                // self.Board[newTail.x][newTail.y] = '';
                //  newTail.y = self.fruit.position[0].y;
                self.fruit.position[0].y += 1;
            } else if (self.fruit.direction === self.direction.Down) {
                // self.Board[newTail.x][newTail.y] = '';
                // newTail.x = self.fruit.position[0].x;
                self.fruit.position[0].x += 1;
            }
            self.Board[self.fruit.position[0].x][self.fruit.position[0].y] = 'fruit';
            self.Board[self.fruit.position[1].x][self.fruit.position[1].y] = 'fruit';
    };


    self.generateSnake = function () {
        self.Board[self.fruit.position[0].x][self.fruit.position[0].y] = 'fruit';
        self.Board[self.fruit.position[1].x][self.fruit.position[1].y] = 'fruit';
        var head = {x: 10, y: 10};
        var tail = {x: 13, y: 10};
        self.snake.position.push(head);
        self.snake.position.push(tail);
    };

    self.drawSnakeOnBoard = function () {
        var snakeLength = self.snake.position[self.snake.position.length - 1].x - self.snake.position[0].x;
        for (var i = 0; i < self.snake.position.length; i++) {
            self.Board[self.snake.position[i].x][self.snake.position[i].y] = 'snake';
        }
    };

    return self;
});

