// getting-started.js
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var trashSchema = new Schema({
    canID: Number,
    weight: Number,
    timeStamp: Date
});

var Trash = mongoose.model('Trash', trashSchema);

function logCanData(id, weight, date)
{
    var newCanData = Trash({
        canID: id,
        weight: weight,
        timeStamp: date
    }); 

    return newCanData.save();
}

function getHoursOfCanData(id,hours)
{
    var hoursAgo = new Date();
    hoursAgo.setHours(hoursAgo.getHours() - hours);
    console.log(hours);
    console.log(hoursAgo);
    return Trash.find({'canID': id}).where('timeStamp').gt(hoursAgo); 
}

function getCanData(id)
{
    return Trash.find({'canID': id}); 
}

function parseCanData(data, parseFunc)
{
    data.forEach(parseFunc);
}

function parseCanRecord(record)
{
    console.log(record.canID, record.weight, record.timeStamp);
}


var db = mongoose.connect('mongodb://localhost/TrashDB');

async function logTestData()
{
    await logCanData(2,3.50, "2017-04-21T14:21:00.201Z");
    await logCanData(1,4.50, "2018-04-21T10:21:00.201Z");
    await logCanData(1,1.50, "2018-04-20T14:21:00.201Z");
    await logCanData(1,2.50, "2016-04-19T14:21:00.201Z");
    await logCanData(3,5.50, "2017-02-21T14:21:00.201Z");
    await logCanData(2,6.50, "2018-04-21T14:21:00.201Z");
}

//logTestData().then(function () {return getCanData(1)}).
//    then(function (data) {parseCanData(data,parseCanRecord)});

//getCanData(1).then(function (data) {parseCanData(data,parseCanRecord)});

getHoursOfCanData(1,1000).then(function (data) {parseCanData(data,parseCanRecord)});
