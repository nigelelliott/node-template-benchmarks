var hogan  = require('hogan.js');
var Benchmark = require('../lib/benchmark');
var benchmarkFlat = new Benchmark();
var benchmarkDeep = new Benchmark();

var OuterTemplate = function() {

    var outerTemplate = hogan.compile('<div>{{children}}</div>'),
        innerTemplates = [];

    for(var i=0; i<10; i++){

        innerTemplates[i] = InnerTemplate();

    }

    return outerTemplate.render({children: innerTemplates.join('')});

};

var InnerTemplate = function() {

    var innerTemplate = hogan.compile('<div>{{children}}</div>'),
        labelTemplates = [];

    for(var i=0; i<100; i++){

        labelTemplates[i] = LabelTemplate.render({title: 'World'});

    }

    return innerTemplate.render({children: labelTemplates.join('')});

};

var LabelTemplate = hogan.compile('Hello {{title}}!');

module.exports = {

    name: 'Hogan',

    render: function(iterations) {

        var count = iterations || 1000,
            html  = '';

        // warm V8 by allowing it to optimize function calls

        for(var i = 0; i < 10; i++) {

            html += LabelTemplate.render({title: 'World'});

        }

        // begin benchmark

        benchmarkFlat.start();

        for(var i = 0; i < count; i++) {

            html += LabelTemplate.render({title: 'World'});

        }

        benchmarkFlat.stop();

        return {
            time: benchmarkFlat.formatMS(),
            avg: benchmarkFlat.formatAvgMS()
        };

    },

    renderDeep: function(iterations) {

        var count = iterations || 1,
            html  = '';

        // warm V8 by allowing it to optimize function calls


        html += OuterTemplate();


        // begin benchmark

        benchmarkDeep.start();

        for(var i = 0; i < count; i++) {

            html += OuterTemplate();

        }

        benchmarkDeep.stop();

        return {
            time: benchmarkDeep.formatMS(),
            avg: benchmarkDeep.formatAvgMS()
        };

    }

};
