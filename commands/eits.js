const numeral = require("numeral");
const races = require("../resources/units");

function raceIdentify(i) {
  let words = i.toString();
  if (words.search("Catapults") > 0) {
    return "human";
  } else if (words.search("Archmages") > 0) {
    return "elf";
  } else if (words.search("Nazgul") > 0) {
    return "orc";
  } else if (words.search("Cavemasters") > 0) {
    return "dwarf";
  } else if (words.search("Berserkers") > 0) {
    return "troll";
  } else if (words.search("Adventurers") > 0) {
    return "halfling";
  } else {
    return "Error";
  }
}

module.exports = (client, message, args) => {

  let op = 0;
  let endCut = -5, startCut = -5;
  let dp = 0;
  let cost = 0;
  let military = 0;
  let magic = 0;
  let units = [];
  let rawUnits = 0;
  let GTs = 0;
  let MTs = 0;
  let extraArmies = 0;
  let extraTroops = 0;
  let Type = 'N/A', interm = 'N/A', Owner = 'N/A', Target='N/A', startTarget='N/A', endTarget='N/A', startOwner='N/A', endOwner='N/A';

  if (args[0] >= 0 && args[1] >= 0) {
    military = args[0];
    magic = args[1];
    argArray = args.slice(2,args.length).toString().split('\n').toString().split(',');
  }else{
    argArray = args.toString().split('\n').toString().split(',');
  }

  //Determine starting and ending cuts
  for (var i = 0; i < argArray.length; i++) {
    if(argArray[i] === 'When' && argArray[i+1] ==='casting' && argArray[i+2] === 'the'){
      endCut = i-1;
    }

    if(argArray[i] === 'Through' && argArray[i+1] === 'the' && argArray[i+2] === 'eye'){
      startCut = i;
    }
  }

  //if no cut is detected, default to starting and ending locations
  if(startCut === -5){
    startCut = 0;
  }

  if(endCut === -5){
    endCut = argArray.length;
  }

  // parse input data according to above
  argArray = argArray.slice(startCut,endCut);

  if (argArray.length < 30) {

    Type = 'Army';

    rawUnits = argArray.slice(argArray.length-6,argArray.length).toString().replace('Pony,riders','Pony riders').toString().split(':').toString().split(',');
    
    rawNames = argArray.slice(0,argArray.length-6).toString().replace(':',',').split(',');
    intermNames = rawNames.slice(rawNames.indexOf('')+1,rawNames.length);

    Target = intermNames.slice(0,intermNames.indexOf('from')).join(' ');

    Owner = intermNames.slice(intermNames.indexOf('from')+1,intermNames.length).join(' ');

  }
  // City EITS reports
  else {

    Type = 'City';

    argArray = argArray.toString().replace(':',',').split(',');

    startTarget = argArray.indexOf('about');
    endTarget = argArray.indexOf('');
    Target = argArray.slice(startTarget + 1, endTarget).join(' ');

    startOwner = argArray.indexOf('by');
    endOwner = argArray.indexOf('',startOwner);
    Owner = argArray.slice(startOwner+1,endOwner).join(' ');

    rawUnits = argArray.slice(endOwner+1, endOwner+7).toString().replace('Pony,riders','Pony riders').toString().split(':').toString().split(',');
    GTs = argArray.slice(endOwner+13,endOwner+15).toString().replace('Guard,Towers:','Guard Towers:').split(':')[1];
    MTs = argArray.slice(endOwner+11,endOwner+13).toString().replace('Magic,Towers:','Magic Towers:').split(':')[1]
    extraArmies = argArray.slice(argArray.indexOf('city:')+1,argArray.indexOf('city:')+2).toString().split('(')[0];
    extraTroops = argArray.slice(argArray.lastIndexOf('') - 2,argArray.lastIndexOf('')-1);

    rawUnits.push("GTs", GTs);
    
  }


  for (i = 0; i < (rawUnits.length / 2); i++) {
    units[i] = rawUnits[(i * 2) + 1];
  }

  // Identifies Race
  const raceName = raceIdentify(rawUnits);
  const race = races[raceName];

  // Handles elf mess
  if (raceName === "elf") {
    let mag = magic > 9 ? 9 : magic;
    race.u5.op = mag * 3;
    race.u5.dp = mag * 3;
  }
  //calculates Raw Unit OP/DP & Cost
  for (i = 1; i < 8; i++) {
    let unitI = "u".concat(i);
    if (i < 7) {
      // units are base 0, so subtract 1
      op = isNaN(units[i - 1]) ? op : op + units[i - 1] * race[unitI].op;
      dp = isNaN(units[i - 1]) ? dp : dp + units[i - 1] * race[unitI].dp;
      cost = isNaN(units[i - 1]) ? cost : cost + units[i - 1] * race[unitI].cost;
    }
  }
  op = military ? op * (1 + military / 10) : op;
  dp = military ? dp * (1 + military / 10) : dp;
  dp = units[6] > 0 ? dp + units[6] * (5 + parseInt(military)) : dp;  // likewise, 6 would be GTs now, not 7

  if (Type == 'City') {
    //Output results
    message.channel.send({
      embed: {
        color: 2123412,
        description: ` EITS Requested by: ${message.author}\n
            **Target ${Type}:**
            ${Target}
            **Owner:**
            ${Owner}

            **Units**
            ${race.u1.name}: ${numeral(units[0]).format("0,0")}
            ${race.u2.name}: ${numeral(units[1]).format("0,0")}
            ${race.u3.name}: ${numeral(units[2]).format("0,0")}
            ${race.u4.name}: ${numeral(units[3]).format("0,0")}
            ${race.u5.name}: ${numeral(units[4]).format("0,0")}
            ${race.u6.name}: ${numeral(units[5]).format("0,0")}
            ${race.u7.name}: ${numeral(units[6]).format("0,0")}
            Magic Towers: ${numeral(MTs).format("0")}
            Extra Armies: ${numeral(extraArmies).format("0")}
            Extra Troops: ${numeral(extraTroops).format("0,0")}
            
            **Power**
            Military Sci: ${military}
            Magic Sci: ${magic}
            Cost: ${numeral(cost).format("0,0")}
            OP: ${numeral(op).format("0,0")}
            DP: ${numeral(dp).format("0,0")}
            
            **Credit**
            made with :heart: by Percy & Moff`,
      },
    });
    message.delete({ timeout: 1000 });

  } else {

    //Output results
    message.channel.send({
      embed: {
        color: 2123412,
        description: ` EITS Requested by: ${message.author}\n
            **Target ${Type}:**
            ${Target}
            **Owner:**
            ${Owner}

            **Units**
            ${race.u1.name}: ${numeral(units[0]).format("0,0")}
            ${race.u2.name}: ${numeral(units[1]).format("0,0")}
            ${race.u3.name}: ${numeral(units[2]).format("0,0")}
            ${race.u4.name}: ${numeral(units[3]).format("0,0")}
            ${race.u5.name}: ${numeral(units[4]).format("0,0")}
            ${race.u6.name}: ${numeral(units[5]).format("0,0")}
            
            **Power**
            Military Sci: ${military}
            Magic Sci: ${magic}
            Cost: ${numeral(cost).format("0,0")}
            OP: ${numeral(op).format("0,0")}
            DP: ${numeral(dp).format("0,0")}
            OP for 100%: ${numeral(3*dp).format("0,0")}
            
            **Credit**
            made with :heart: by Percy & Moff`,
      },
    });
    message.delete({ timeout: 1000 });

  }

}