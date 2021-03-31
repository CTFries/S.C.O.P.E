const numeral = require("numeral");
const units = require("../resources/units");
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
  let milSci = 0;
  let magSci = 0;
  let U1 = [], U2 = [], U3 = [], U4 = [], U5 = [], U6 = [];
  let rawUnits = 0;
  let units = [];
  let GTs = 0;
  let MTs = 0;
  let extraArmies = 0;
  let extraTroops = 0;
  let Type = 'N/A', interm = 'N/A', Owner = 'N/A', Target = 'N/A', startTarget = 'N/A', endTarget = 'N/A', startOwner = 'N/A', endOwner = 'N/A';

  if (args[0] >= 0 && args[1] >= 0) {
    milSci = args[0];
    magSci = args[1];
    args = args.slice(2, args.length);
  }

  initParse = args.toString().replace(/\r?,|\r/g, '').split('\n').filter(el => { return el != null && el != '' }).toString().split(':').toString().split(',');
  if (initParse.includes('Homesfilled')) {
    let removed = 'NA';
    removed = initParse.splice(initParse.indexOf('Homesfilled'), 4);
  }

  if (initParse.includes('Incity')) {

    if (initParse.includes('Peasants')) {

      rawUnits = initParse.slice(0, initParse.indexOf('Peasants'));

      for (i = 0; i <= 2; i++) {
        U1[i] = parseInt(rawUnits[((i + 1) * 2)]);
        U2[i] = parseInt(rawUnits[((i + 1) * 2) + 7]);
        U3[i] = parseInt(rawUnits[((i + 1) * 2) + 14]);
        U4[i] = parseInt(rawUnits[((i + 1) * 2) + 21]);
        U5[i] = parseInt(rawUnits[((i + 1) * 2) + 28]);
      }

      pezArr = initParse.slice(initParse.indexOf('Peasants'), initParse.length).filter(el => { return el != null && el != '' });
      
      console.log("City with pez tag");
      console.log(pezArr);
      if(pezArr.includes('Inarmy') && pezArr.length==5){
        U6[0] = parseInt(pezArr[2]);
        U6[1] = parseInt('0');
        U6[2] = parseInt(pezArr[4]); 
      }
      else if(pezArr.includes('Inarmy') && pezArr.length!==5){
        U6[0] = parseInt('0');
        U6[1] = parseInt('0');
        U6[2] = parseInt('0');
      }
      else if(pezArr.length == 4){
        U6[0] = parseInt(pezArr[1]);
        U6[1] = parseInt('0');
        U6[2] = parseInt(pezArr[3]);
      }else{
        U6[0] = parseInt('0');
        U6[1] = parseInt('0');
        U6[2] = parseInt('0');
      }

      units = [U1[0] + U1[2], U2[0] + U2[2], U3[0] + U3[2], U4[0] + U4[2], U5[0] + U5[2], U6[0] + U6[2]];
      unitsInjured = [U1[1], U2[1], U3[1], U4[1], U5[1], U6[1]];

    } else {
      rawUnits = initParse;

      for (i = 0; i <= 2; i++) {
        U1[i] = parseInt(rawUnits[((i + 1) * 2)]);
        U2[i] = parseInt(rawUnits[((i + 1) * 2) + 7]);
        U3[i] = parseInt(rawUnits[((i + 1) * 2) + 14]);
        U4[i] = parseInt(rawUnits[((i + 1) * 2) + 21]);
        U5[i] = parseInt(rawUnits[((i + 1) * 2) + 28]);
      }

      console.log("City with no pez tag");

      U6[0] = parseInt('0');
      U6[1] = parseInt('0');
      U6[2] = parseInt('0');

      units = [U1[0] + U1[2], U2[0] + U2[2], U3[0] + U3[2], U4[0] + U4[2], U5[0] + U5[2], U6[0] + U6[2]];
      unitsInjured = [U1[1], U2[1], U3[1], U4[1], U5[1], U6[1]];

    }
  }

  else {
    if (initParse.includes('Peasants')) {
      rawUnits = initParse.slice(0, initParse.indexOf('Peasants'));

      for (i = 0; i <= 1; i++) {
        U1[i] = parseInt(rawUnits[((i + 1) * 2)]);
        U2[i] = parseInt(rawUnits[((i + 1) * 2) + 5]);
        U3[i] = parseInt(rawUnits[((i + 1) * 2) + 10]);
        U4[i] = parseInt(rawUnits[((i + 1) * 2) + 15]);
        U5[i] = parseInt(rawUnits[((i + 1) * 2) + 20]);
      }

      pezArr = initParse.slice(initParse.indexOf('Peasants'), initParse.length).filter(el => { return el != null && el != '' });

      console.log("Army with pez tag");
      console.log(pezArr);
      if(pezArr.includes('Inarmy') && pezArr.length == 3){
        U6[0] = parseInt(pezArr[2]);
        U6[1] = parseInt('0');
      }
      else if(pezArr.includes('Inarmy') && pezArr.length !==3){
        U6[0] = parseInt('0');
        U6[1] = parseInt('0');
      }
      else if(pezArr.length == 2){
        U6[0] = parseInt(pezArr[1]);
        U6[1] = parseInt('0');
      }else{
        U6[0] = parseInt('0');
        U6[1] = parseInt('0');
      }
      
      units = [U1[0], U2[0], U3[0], U4[0], U5[0], U6[0]];
      unitsInjured = [U1[1], U2[1], U3[1], U4[1], U5[1], U6[1]];
    }
    else{
      rawUnits = initParse;
      for (i = 0; i <= 1; i++) {
        U1[i] = parseInt(rawUnits[((i + 1) * 2)]);
        U2[i] = parseInt(rawUnits[((i + 1) * 2) + 5]);
        U3[i] = parseInt(rawUnits[((i + 1) * 2) + 10]);
        U4[i] = parseInt(rawUnits[((i + 1) * 2) + 15]);
        U5[i] = parseInt(rawUnits[((i + 1) * 2) + 20]);
      }

      console.log("Army without pez tag");
      U6[0] = parseInt("0");
      U6[1] = parseInt("0");

      units = [U1[0], U2[0], U3[0], U4[0], U5[0], parseInt('0')];
      unitsInjured = [U1[1], U2[1], U3[1], U4[1], U5[1], parseInt('0')];
    }
  }

  // Identifies Race
  const raceName = raceIdentify(rawUnits);
  const race = races[raceName];

  console.log(race);

  // Handles elf mess
  if (raceName === "elf") {
    let mag = magSci > 9 ? 9 : magSci;
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
  op = milSci ? op * (1 + milSci / 10) : op;
  dp = milSci ? dp * (1 + milSci / 10) : dp;
  dp = units[6] > 0 ? dp + units[6] * (5 + parseInt(milSci)) : dp;  // likewise, 6 would be GTs now, not 7

  let output1 = [];
  for (i = 1; i < 7; i++) {
    let unitI = "u".concat(i);
    let filler = '';
    filler = 15 - race[unitI].name.length;
    output1[i - 1] = race[unitI].name + '\xa0'.repeat(filler);
  }

  let output2 = [];
  for (i = 0; i < 6; i++) {
    let filler = '';
    filler = 8 - units[i].toString().length;
    output2[i] = units[i] + '\xa0'.repeat(filler);
  }

  let output3 = [];
  for (i = 0; i < 6; i++) {
    let filler = '';
    filler = 8 - unitsInjured[i].toString().length;
    output3[i] = unitsInjured[i] + '\xa0'.repeat(filler);
  }

  //Output results
  message.channel.send({
    embed: {
      color: 2123412,
      description: ` **Personal Power Check**
        Requested by: ${message.author}
        \`\`\`
Units           | Ready    | Injured 
-------------------------------------
${output1[0]} | ${output2[0]} | ${output3[0]}
${output1[1]} | ${output2[1]} | ${output3[1]}
${output1[2]} | ${output2[2]} | ${output3[2]}
${output1[3]} | ${output2[3]} | ${output3[3]}
${output1[4]} | ${output2[4]} | ${output3[4]}
${output1[5]} | ${output2[5]} | ${output3[5]}
          \`\`\`
            **Power**
            Military Sci: ${milSci}
            Magic Sci: ${magSci}
            Cost: ${numeral(cost).format("0,0")}
            OP: ${numeral(op).format("0,0")}
            DP: ${numeral(dp).format("0,0")}
            OP for 100%: ${numeral(3 * dp).format("0,0")}
            
            **Credit**
            made with :heart: by Percy & Moff`,
    },
  });
  message.delete({ timeout: 1000 });


}