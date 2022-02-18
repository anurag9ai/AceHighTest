var config = require('../config.js');
var datetime = require('./datetime.js');

module.exports = {
    show : (value, lastValue) => {
        let startTime = datetime.getBeginTime(config.initialTime);
        let talkTime = startTime;
        var trackCount = 0;
        var trackValue = 1;
        var additionalTalks = lastValue;
        value.map(session => {
            if(trackCount % 2 === 0) {
                talkTime = datetime.getBeginTime(config.initialTime);
                console.log(`Track:${trackValue}`);
                trackValue++;
            }
            session.map(talk =>{
                console.log(`${datetime.getFormattedTime(talkTime)} ${talk.title}`);
                talkTime = datetime.addTime(talkTime,talk.time);
            })

            if(datetime.compareTime(talkTime , datetime.getBeginTime(config.lunchTime.beginTime))){

                console.log(`${datetime.getFormattedTime(talkTime)} ${config.lunchTime.title}`);
                talkTime = datetime.addTime(talkTime,config.lunchTime.duration);
            }

            if(datetime.compareTime(talkTime , datetime.getBeginTime(config.NeworkingEvent.beginTime))){
                if(additionalTalks.length !== 0){
                    let tmp = additionalTalks.shift();
                    tmp.map(extraTalk=>{
                        console.log(`${datetime.getFormattedTime(talkTime)} ${extraTalk.title}`);
                        talkTime = datetime.addTime(talkTime,extraTalk.time);
                    })
                }
                console.log(`${datetime.getFormattedTime(talkTime)} ${config.NeworkingEvent.title}`);
            }
            trackCount+=1;
        })  
    }
}
