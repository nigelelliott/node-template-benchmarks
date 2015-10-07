var _             = require('underscore');
var Benchmark     = require('../lib/benchmark');
var benchmarkFlat = new Benchmark();
var benchmarkDeep = new Benchmark();

var OuterTemplate = function() {

    var innerTemplates = [];

    for(var i = 0; i < 10; i++) {

        innerTemplates[i] = InnerTemplate();

    }

    return _.template('<div><%= children %></div>')({children: innerTemplates.join('')});

};

var InnerTemplate = function() {

    var labelTemplates = [];

    for(var i = 0; i < 100; i++) {

        labelTemplates[i] = LabelTemplate({title: 'World'});

    }

    return _.template('<div><%= children %></div>')({children: labelTemplates.join('')});

};

var LabelTemplate = _.template('Hello <%= title %>!');

module.exports = {

    name: 'Underscore',

    render: function(iterations) {

        var count = iterations || 1000,
            html  = '';

        // warm V8 by allowing it to optimize function calls

        for(var i = 0; i < 10; i++) {

            html += LabelTemplate({title: 'World'});

        }

        // begin benchmark

        benchmarkFlat.start();

        for(var i = 0; i < count; i++) {

            html += LabelTemplate({title: 'World'});

        }

        benchmarkFlat.stop();

        return {
            time: benchmarkFlat.formatMS(),
            avg: benchmarkFlat.formatAvgMS()
        };

    }

    //,renderDeep: function(iterations) {
    //
    //    var count = iterations || 1,
    //        html  = '';
    //
    //    // warm V8 by allowing it to optimize function calls
    //
    //    html += OuterTemplate();
    //
    //
    //    // begin benchmark
    //
    //    benchmarkDeep.start();
    //
    //    for(var i = 0; i < count; i++) {
    //
    //        html += OuterTemplate();
    //
    //    }
    //
    //    benchmarkDeep.stop();
    //
    //    return {
    //        time: benchmarkDeep.formatMS(),
    //        avg: benchmarkDeep.formatAvgMS()
    //    };
    //
    //}

};
