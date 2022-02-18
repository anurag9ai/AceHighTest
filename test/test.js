const expect = require('chai').expect;
const algo = require('../_utils/algo.js');
const parser = require('../_utils/parser.js');
var schedule = require('../_utils/print.js');
var sampleData = require('./_samples.js');


describe('Testing for parser.js', () => {
    it("[parser.readData(path, callback)] Should return a array in success", () => {
        parser.readData(sampleData.samplePath, (err, data)=>{
            if(err) expect(data).to.be.an("object");
            expect(data).to.be.an('array');
        })
    });
});

describe('Testing for algo.js', () => {
    it("[algo.sort(talks, time)] Should return a array in any case", () => {
        expect(algo.sort(sampleData.dataToBeParsed, sampleData.sampleTime)).to.be.an('array');
    });
});

