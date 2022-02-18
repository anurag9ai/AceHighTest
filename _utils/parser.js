const fs = require('fs');
var _rules = require('./rules.js');
module.exports = {
    readData: (filePath, callback) => {
        try {
            const data = fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err)
                    callback(new Error('Invalid file'), null)
                else {
                    var lines = data.split(_rules.lineSplitter).filter((el) => { return el !== "" })
                        .map(lines => {
                            let line = lines.split(_rules.talkSplitter);
                            let title = line[0].trim();
                            let time = line[1].trim();

                            if (time.includes(_rules.units.minutes.id))
                                time = time.replace(_rules.units.minutes.id, _rules.units.minutes.value)
                            else if (time.includes(_rules.units.lightning.id))
                                time = _rules.units.lightning.value

                            return { title:title, time:parseInt(time) }
                        });
                    callback(null, lines)
                }
            })

        } catch (err) {
            callback(new Error('Invalid file'), null)
            console.error(err)
        }
    },
}

