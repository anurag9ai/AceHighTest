var moment = require('moment');

module.exports = {

    getBeginTime : (dateValue) => {
        return new moment(dateValue, 'HH:mm A');
    },

    getFormattedTime : (timeValue) => {
        return timeValue.format('hh:mm A');
    },

    addTime : (date,mins) => {
        return moment(date, "hh:mm A")
        .add(mins, 'minutes');
    },

    compareTime : (date1, date2) => {
        //console.log(date1, date2);
        return date1.isSame(date2);
    }
}