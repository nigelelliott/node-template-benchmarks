var React         = require('react');
var Benchmark     = require('../lib/benchmark');
var benchmarkFlat = new Benchmark();
var benchmarkDeep = new Benchmark();

var OuterComponent = React.createClass({

    render: function() {

        var innerComponents = [];

        for(var i = 0; i < 10; i++) {

            innerComponents[i] = (<InnerComponent />);

        }

        return (
            <div>{innerComponents}</div>
        );
    }

});

var InnerComponent = React.createClass({

    render: function() {

        var labelComponents = [];

        for(var i = 0; i < 100; i++) {

            labelComponents[i] = (<LabelComponent title='World'/>);

        }

        return (
            <div>{labelComponents}</div>
        );
    }

});

var LabelComponent = React.createClass({

    render: function() {

        return (
            <div>Hello {this.props.title}!</div>
        );

    }

});

module.exports = {

    name: 'React',

    render: function(iterations) {

        var count = iterations || 1000,
            html  = '';

        // warm V8 by allowing it to optimize function calls

        for(var i = 0; i < 10; i++) {

            html += React.renderToString(<LabelComponent title='World'/>);

        }

        // begin benchmark

        benchmarkFlat.start();

        for(var i = 0; i < count; i++) {

            html += React.renderToString(<LabelComponent title='World'/>);

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

        html += React.renderToString(<OuterComponent />);

        // begin benchmark

        benchmarkDeep.start();

        for(var i = 0; i < count; i++) {

            html += React.renderToString(<OuterComponent />);

        }

        benchmarkDeep.stop();

        return {
            time: benchmarkDeep.formatMS(),
            avg: benchmarkDeep.formatAvgMS()
        };

    }

};
