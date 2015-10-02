var express = require('express');
var engines = require('../engines');
var _ = require('underscore');
var fs = require('fs');

var pageTpl = fs.readFileSync('main/views/page.tpl', 'utf8');

function calcChange(from, to){

    var change = (((from - to) / to) * 100).toFixed(0);

    return (change.indexOf('-') === -1 ? '+ ' + change : '- ' + change.replace('-','')) + ' %';

}

module.exports = express.Router()
    .get('/', function(request, response, next){

        var iterations = 1000,
            data = {
                flat: [],
                deep: [],
                iterations: iterations,
                version: process.version
            },
            fr, lr;

        // run benchmarks

        _.each(engines, function(engine){

            data.flat.push({
                name: engine.name,
                result: engine.render(iterations)
            });

            if(engine.renderDeep){

                data.deep.push({
                    name: engine.name,
                    result: engine.renderDeep()
                });

            }

        });

        // sort results (slowest --> fastest)

        data.flat = _.sortBy(data.flat, function(row){
           return -row.result.avg;
        });

        data.deep = _.sortBy(data.deep, function(row){
            return -row.result.avg;
        });

        // add % change

        _.map(data.flat, function(row, i){

            fr = data.flat[0];

            lr = data.flat[i-1];

            row.change = {
                last:{
                    time: lr ? calcChange(lr.result.time, row.result.time) : null,
                    avg: lr ? calcChange(lr.result.avg, row.result.avg) : null,
                    className: lr ? ((lr.result.time > row.result.time) ? 'success' : 'danger') : 'info'
                },
                overall: {
                    time: (i>0) ? calcChange(fr.result.time, row.result.time) : null,
                    avg: (i>0) ? calcChange(fr.result.avg, row.result.avg) : null,
                    className: fr ? ((fr.result.time > row.result.time) ? 'success' : 'danger') : 'info'
                }
            };

            return row;

        });

        _.map(data.deep, function(row, i){

            fr = data.deep[0];

            lr = data.deep[i-1];

            row.change = {
                last:{
                    time: lr ? calcChange(lr.result.time, row.result.time) : null,
                    avg: lr ? calcChange(lr.result.avg, row.result.avg) : null,
                    className: lr ? ((lr.result.time > row.result.time) ? 'success' : 'danger') : 'info'
                },
                overall: {
                    time: (i>0) ? calcChange(fr.result.time, row.result.time) : null,
                    avg: (i>0) ? calcChange(fr.result.avg, row.result.avg) : null,
                    className: fr ? ((fr.result.time > row.result.time) ? 'success' : 'danger') : 'info'
                }
            };

            return row;

        });

        // output

        response.status(200).send(_.template(pageTpl)(data));

    });
