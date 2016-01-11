'use strict';
/**
 * @doc function
 * @name stopWatch
 * @kind function
 *
 * @description This is a stopWatch function to count the time in millisecond.
 */

var stopWatch = function () {
  this.startTime = 0;
  this.elaspedMs = 0;
  this.totalElapsedMs = 0;
  this.timerRunningFlag = false;
};

/**
 * @doc prototype
 * @description start stopwatch.
 * @returns {Object} Object refer to 'this' to achieve method chaining.
 * */

stopWatch.prototype.start = function () {
  if (this.timerRunningFlag === true){
    return this;
  }
  this.timerRunningFlag = true;
  this.startTime = new Date();
  return this;
};

/**
 * @doc prototype
 * @description stop stopwatch.
 * @returns {Object} Object refer to 'this' to achieve method chaining.
 * */

stopWatch.prototype.stop = function () {
  var now = new Date();
  if (this.timerRunningFlag === false){
    return this;
  }
  this.elaspedMs = now.getTime() - this.startTime.getTime();
  this.totalElapsedMs += this.elaspedMs;
  this.timerRunningFlag = false;
  return this;
};

/**
 * @doc prototype
 * @description reset stopwatch.
 * @returns {Object} Object refer to 'this' to achieve method chaining.
 * */

stopWatch.prototype.reset = function () {
  this.startTime = 0;
  this.totalElapsedMs = this.elaspedMs = 0;
  return this;
};

/**
 * @doc prototype
 * @description log current time on stopwatch.
 * @returns {number} current time
 * */

stopWatch.prototype.log = function () {
  var now = new Date();
  if (this.timerRunningFlag){
    return now.getTime() - this.startTime.getTime();
  }
  return this.totalElapsedMs;
};

/**
 * @doc function
 * @name Racer
 * @kind function
 *
 * @description This is a Racer Game function which uses stopWatch function.
 * @param {string} name The name of the racer
 */

var Racer = function (name) {
  this.name = name;
  this.stopWatch = new stopWatch();
  Racer.all.push(this);
};

Racer.all = [];

/**
 * @doc function
 * @description start stopwatch for all racers
 * */

Racer.all.start = function () {
  Racer.all.forEach(function(racer){
    racer.start();
  })
};

/**
 * @doc function
 * @description stop stopwatch for all racers
 * */

Racer.all.stop = function () {
  Racer.all.forEach(function (racer) {
    racer.stop();
  })
};

/**
 * @doc prototype
 * @description start a specific racer's stopwatch.
 * @returns {Object} Object refer to 'this' to achieve method chaining.
 * */

Racer.prototype.start = function () {
  this.stopWatch.start();
  return this;
};

/**
 * @doc prototype
 * @description stop a specific racer's stopwatch.
 * @returns {Object} Object refer to 'this' to achieve method chaining.
 * */

Racer.prototype.stop = function () {
  this.stopWatch.stop();
  return this
};

/**
 * @doc prototype
 * @description log a specific racer's stopwatch.
 * @returns {number} current time on specific racer's stopwatch.
 * */

Racer.prototype.log = function () {
  return this.stopWatch.log()
};

/**
 * @doc function
 * @description find winner among all racers.
 * @returns {Object}racer winner racer
 * */

Racer.getWinner = function () {
  var racer = Racer.all[0];
  for (var i = 0; i < Racer.all.length; i++){
    if (Racer.all[i].log() < racer.log()){
      racer = Racer.all[i];
    }
  }
  return racer
};

// Create instance for Jasmine test use
var sw = new stopWatch();
var travis = new Racer("Travis");
var sumeet = new Racer("Sumeet");
var harshit = new Racer("Harshit");