const numeral = require("numeral");

module.exports = (client, message, args) => {

    timeOfCall = message.createdTimestamp;
    //console.log(timeOfCall);

    let messageType = 'NA', requestLocation = 0, requester = 0;

    var callDate = new Date(timeOfCall);
    var month = callDate.getMonth();
    var day = callDate.getDate();
    var year = callDate.getFullYear();
    // Hours part from the timestamp
    var hours = callDate.getHours();
    // Minutes part from the timestamp
    var minutes = callDate.getMinutes();

    break1 = args.lastIndexOf("in");

    notiPrep = args.slice(0,break1);
    timingPrep = args.slice(break1+1);
    noti = notiPrep.toString().replace(/,/g,' ');
    
    timing1 = timingPrep.toString().split(':');

    minutes = parseInt(minutes) + parseInt(timing1[1]);
    if(minutes >=60){
        minutes = minutes - 60;
        hours = hours+1;
    }
    hours = parseInt(hours) + parseInt(timing1[0]);
    if(hours >=24){
        hours = hours - 24;
        day = day+1;
    }
    if(month == 0 | month == 2 | month == 4 | month == 6 | month == 7 | month == 9 | month | 11){
        if(day>31){
            day=day-31;
            month = month+1;
        }
    }
    if(month == 3 | month == 5 | month == 8 | month == 10){
        if(day>30){
            day=day-30;
            month = month+1;
        }
    }
    if(month == 1){
        if(day>28){
            day=day-28;
            month = month+1;
        }
    }
    if(month > 11){
        month = month - 12; //months are base 0
        year = year + 1;
    }

    const schedule = require('node-schedule');
    const date = new Date(year, month, day, hours, minutes, 0);

    if(message.channel.type === 'dm'){
        messageType = 'DM';
        requester = message.channel.recipient.id;
        requestLocation = message.channel.id;
    }

    if(message.channel.type === 'text'){
        messageType = 'Text';
        requestLocation = message.channel.id;
        requester = message.author.id;
    }

    const job = schedule.scheduleJob(date, function(){
        if(messageType === 'DM'){
            message.channel.id = requestLocation;
            message.channel.recipient.id = requester;
        }
        if(messageType === 'Text'){
            message.channel.id = requestLocation;
            message.author.id = requester;
        }
        message.channel.send({
            embed: {
               color: 2123412,
                description: `${message.author}: Time to ${noti}!`,
            },
        });
    });
    

    message.channel.send({
        embed: {
            color: 2123412,
            description: `Reminder added to the scheduler.`,
        },
    });
}



