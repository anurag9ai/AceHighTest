var config = require('../config');

var talks = null;
global.output = [];

const recursion = (data,timeInterval) => {
    if (data.length === 0) return [];
    
    // initialize array first time
    if(talks === null) talks = data

    if(talks.length === 0) return

    let item = [];
    let times = [];
    let container = [];
    let maxs = 0;
    talks.forEach(talk => {
        times.push(talk.time);
    });

    for (let i = 0; i <= timeInterval; i++) {
        item[i] = [];
        container[i] = [];
        var iter = 0;

        for (let j = 0; j < talks.length; j++) {
            if (i === 0) {
                container[i][j] = 0;
                continue;
            }
            if (i < times[j]) {
                container[i][j] = container[i][j - 1] || 0;
                continue;
            }
            let drop = (container[i - times[j]][j - 1] || 0) + times[j];
            let noDrop = container[i][j - 1] || 0;
            container[i][j] = Math.max(drop, noDrop);
            maxs = container[i][j];
            if (drop > noDrop) item[i].push(j);
            iter = times[j];
        }
    }

    let sum = 0;
    let max = container.pop().pop();
    let idxs = [];
    let schedule = [];

    for (let v = timeInterval; v >= 0;) {
        let tmp = item[v].pop();
        while (idxs.indexOf(tmp) != -1) tmp = item[v].pop();
        idxs.push(tmp);
        schedule.push(talks[tmp]);
        talks.splice(tmp,1)       
        sum += times[tmp];
        if (sum === max) break;
        v -= times[tmp];   
    }

    global.output.push(schedule);
    recursion(talks,timeInterval);
    return global.output;
}

module.exports = {
    sort: (data, timeInterval) => {
        let result = recursion(data,timeInterval); // sort data recursively
        global.output = []; // initialize globals
        talks = null; // initialize globals
        return result
    },
    getTime: (session) =>{
        let sum = 0;
        session.forEach(talk => {
            sum += talk.time
        })
        return sum;
    },
    getLastSessions: (session) =>{
        let efectiveTrackLength = parseInt(session.length / 2);
        let effectiveAdditionalTime = config.NeworkingEvent.duration * efectiveTrackLength; // in mins
        let lastSession = session[session.length -1];
        let res = []
        if(module.exports.getTime(lastSession) <= effectiveAdditionalTime){
            session.pop(); // remove last element from session array
            res = module.exports.sort(lastSession,config.NeworkingEvent.duration);
        }
        return res;
    }
}