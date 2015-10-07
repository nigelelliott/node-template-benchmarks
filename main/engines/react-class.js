'use strict'

var React         = require('react/dist/react.min.js');
var Benchmark     = require('../lib/benchmark');
var benchmarkFlat = new Benchmark();
var benchmarkDeep = new Benchmark();

class OuterComponent extends React.Component {

    render() {

        var innerComponents = [];

        for(var i = 0; i < 10; i++) {

            innerComponents[i] = (<InnerComponent key={i} />);

        }

        return (
            <div>{innerComponents}</div>
        );
    }

};

class InnerComponent extends React.Component {

    render() {

        var labelComponents = [];

        for(var i = 0; i < 100; i++) {

            labelComponents[i] = (<LabelComponent key={i} title='World'/>);

        }

        return (
            <div>{labelComponents}</div>
        );
    }

};

class LabelComponent extends React.Component {

    render() {

        return (
            <div>Hello {this.props.title}!</div>
        );

    }

};

module.exports = {

    name: 'React (minified, ES6 classes)',

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


