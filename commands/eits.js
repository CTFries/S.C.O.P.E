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
  let dp = 0;
  let cost = 0;
  let military = 0;
  let magic = 0;
  let units = [];
  let rawUnits = 0;
  let rawUnknown = 0;
  let rawGTs = 0;
  let rawMTs = 0;
  let GTs = 0;
  let MTs = 0;
  let extraArmies = 0;
  let extraTroops = 0;
  let tempArray = "N/A",
    Type = "N/A",
    interm = "N/A",
    Owner = "N/A",
    Target = "N/A",
    tempEndOwner = "N/A",
    startTarget = "N/A",
    endTarget = "N/A",
    startOwner = "N/A",
    endOwner = "N/A",
    tempOwner = "N/A";

  if (args[0] >= 0 && args[1] >= 0) {
    military = args[0];
    magic = args[1];
    tempArray = args.slice(2, args.length).toString().split(`,`);
  } else {
    tempArray = args.toString().split(`,`);
  }

  console.log(args);
  console.log(args.length);

  // Army EITS reports (short)
  if (args.length < 20) {
    Type = "Army";
    rawUnits = args
      .toString()
      .split("\n")
      .slice(1)
      .toString()
      .replace("Pony,riders", "Pony riders")
      .toString()
      .split(":")
      .toString()
      .split(",");
    rawNames = args.toString().split("\n").slice(0, 1).toString().split(",");
    console.log(rawUnits);

    interm = rawNames.indexOf("from");
    Owner = rawNames
      .slice(interm + 1)
      .toString()
      .split(",")
      .join(" ");

    Target = rawNames.slice(0, interm).toString().split(",").join(" ");
  }
  // City EITS reports
  else {
    Type = "City";
    rawUnits = args
      .toString()
      .split(`\n`)
      .slice(1, 7)
      .toString()
      .replace("Pony,riders", "Pony riders")
      .toString()
      .split(":")
      .toString()
      .split(",");
    rawGTs = args
      .toString()
      .split(`\n`)
      .slice(12, 13)
      .toString()
      .split(`,`)
      .slice(1, 2)
      .toString()
      .split(`:`);
    rawMTs = args
      .toString()
      .split(`\n`)
      .slice(11, 12)
      .toString()
      .split(`,`)
      .slice(1, 2)
      .toString()
      .split(`:`);
    rawUnknown = args
      .toString()
      .split(`\n`)
      .slice(19, 20)
      .toString()
      .split(`,`);
    GTs = rawGTs[1];
    MTs = rawMTs[1];
    extraArmies = parseInt(rawUnknown[4]);
    extraTroops = parseInt(rawUnknown[6]);

    rawUnits.push("GTs", GTs);

    startTarget = tempArray.indexOf("about");
    endTarget = tempArray.indexOf("");
    startOwner = tempArray.indexOf("by");
    // last part of Owner name
    tempEndOwner = tempArray[tempArray.length - 11]
      .split(`\n`)[0]
      .replace(":", "");
    endOwner = tempArray.length - 11;

    Target = tempArray.slice(startTarget + 1, endTarget).join(" ");
    tempOwner = tempArray.slice(startOwner + 1, endOwner);
    tempOwner.push(tempEndOwner);

    Owner = tempOwner.join(" ");
  }

  for (i = 0; i < rawUnits.length / 2; i++) {
    units[i] = rawUnits[i * 2 + 1];
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
      cost = isNaN(units[i - 1])
        ? cost
        : cost + units[i - 1] * race[unitI].cost;
    }
  }
  op = military ? op * (1 + military / 10) : op;
  dp = military ? dp * (1 + military / 10) : dp;
  dp = units[6] > 0 ? dp + units[6] * (5 + parseInt(military)) : dp; // likewise, 6 would be GTs now, not 7

  if (Type == "City") {
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
};
