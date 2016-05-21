/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('gApp').controller('SnakeController',['SnakeService',function(SnakeService){
        var self = this;
        
        self.hello = SnakeService.hello;
        self.Board = SnakeService.Board;
        self.boardColorStyle = SnakeService.boardColorStyle;
        self.generateFruit = SnakeService.generateFruit;
        self.changeDirection = SnakeService.changeDirection;
        self.generateSnake = SnakeService.generateSnake;
        SnakeService.initBoard();
        SnakeService.update();
        return self;
}]);