var mustache  = require('mustache');
var Benchmark = require('../lib/benchmark');
var benchmarkFlat = new Benchmark();
var benchmarkDeep = new Benchmark();

var OuterTemplate = function() {

    var innerTemplates = [];

    for(var i=0; i<10; i++){

        innerTemplates[i] = i;

    }

    return mustache.render('<div>a{{#inner}}{{>innerPartial}}{{/inner}}</div>', {inner: innerTemplates}, {innerPartial: InnerTemplate()});

};

var InnerTemplate = function() {

    var labelTemplates = [];

    for(var i=0; i<100; i++){

        labelTemplates[i] = i;

    }

    return mustache.render('<div>b{{#label}}{{>labelPartial}}{{/label}}</div>', {label: labelTemplates, title: 'World'}, {labelPartial: LabelTemplate});

};

var LabelTemplate = 'Hello {{title}}!';

module.exports = {

    name: 'Mustache',

    render: function(iterations) {

        var count = iterations || 1000,
            html  = '';

        // warm V8 by allowing it to optimize function calls

        for(var i = 0; i < 10; i++) {

            html += mustache.render(LabelTemplate, {title: 'World'});

        }

        // begin benchmark

        benchmarkFlat.start();

        for(var i = 0; i < count; i++) {

            html += mustache.render(LabelTemplate, {title: 'World'});

        }

        benchmarkFlat.stop();

        return {
            time: benchmarkFlat.formatMS(),
            avg: benchmarkFlat.formatAvgMS()
        };

    }

    //,renderDeep: function(iterations){
    //
    //    var count = iterations || 1,
    //        html  = '';
    //
    //    // warm V8 by allowing it to optimize function calls
    //
    //    html += mustache.render(OuterTemplate());
    //
    //    // begin benchmark
    //
    //    benchmarkDeep.start();
    //
    //    for(var i = 0; i < count; i++) {
    //
    //        html += mustache.render(OuterTemplate());
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
