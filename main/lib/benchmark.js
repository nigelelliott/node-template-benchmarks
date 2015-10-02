/*
    Simple tool to accurately measure the time between 2 points
 */

var Benchmark = function(){
    this.m1 = 0;
    this.m2 = 0;
    this.benchmarks = [];
};

Benchmark.prototype.start = function(){
    this.m1 = process.hrtime();
};

Benchmark.prototype.stop = function(){
    this.m2 = process.hrtime(this.m1);
    this.benchmarks.push(this.toMS());
    return this.toMS();
};

Benchmark.prototype.toMS = function(){
    return (this.m2[1] / 1000000);
};

Benchmark.prototype.toAvgMS = function(){
    return (this.benchmarks.reduce(function(a, b) {
        return a + b;
    }) / this.benchmarks.length);
};

Benchmark.prototype.formatMS = function(d){
    var d = d || 2;
    return this.toMS().toFixed(d);
};

Benchmark.prototype.formatAvgMS = function(d){
    var d = d || 2;
    return this.toAvgMS().toFixed(d);
};

module.exports = Benchmark;