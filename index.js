var arguments = process.argv;
var parser = require('./_utils/parser.js')
var algo = require('./_utils/algo.js')
var schedule = require('./_utils/print.js')
var config = require('./config.js');

const inpArgFlag = "--file";
let inpArgIndex = arguments.indexOf(inpArgFlag);

if (inpArgIndex !== -1) {
    var filePath = arguments[inpArgIndex + 1]
}
else
    console.log("No file defined");

let output = parser.readData(filePath, (err, data) => {
    if(err) console.error(err)
    else{
        var sessions = algo.sort(data, config.session.duration) // sort element based on  defined duration
        console.log(sessions)
        let lastSession = algo.getLastSessions(sessions); // extract last element to optimize additional time of 4:00PM-5:00PM if required 
        console.log(sessions)
        schedule.show(sessions,lastSession) // print output
    }
});



