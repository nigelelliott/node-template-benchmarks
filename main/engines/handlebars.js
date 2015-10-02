var handlebars = require('handlebars');
var Benchmark  = require('../lib/benchmark');
var benchmarkFlat  = new Benchmark();
var benchmarkDeep  = new Benchmark();

handlebars.registerPartial('outerTemplate', '<div>{{{children}}}</div>');
handlebars.registerPartial('innerTemplate', '<div>{{#each labelTemplates}}{{> labelTemplate}}{{/each}}</div>');
handlebars.registerPartial('labelTemplate', 'Hello {{title}}!');

var OuterTemplate = function() {

    var innerTemplates = [],
        labelTemplates = [];

    for(var i=0; i<10; i++){

        innerTemplates[i] = i;

    }

    for(var i=0; i<100; i++){

        labelTemplates[i] = i;

    }

    return handlebars.compile('<div>{{#each innerTemplates}}{{> innerTemplate}}{{/each}}</div>')({
        innerTemplates: innerTemplates,
        labelTemplates: labelTemplates,
        title: 'World'
    });

};

var LabelTemplate = handlebars.compile('Hello {{title}}!');

module.exports = {

    name: 'Handlebars',

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

        console.log(html);

        return {
            time: benchmarkDeep.formatMS(),
            avg: benchmarkDeep.formatAvgMS()
        };

    }

};
