module.exports = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 3447003,
      description: `Hi there! I'm **S.C.O.P.E.** or, *"Specific Calculation Of Power from EiTS"*
          I am a bot created by Grand Moff and Percy for Visual Utopia! Here is a list of my commands:`,
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!eits**
        Calcs:
        OP, DP, troop cost, OP to slaughter

        Format:
        !eits [milSci](opt) [magSci](opt) *"paste"*

        __EX: !eits 7 4 *"paste"*__
        `
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!atck**
        Calcs:
        Attack chances over prep duration

        Format:
        !atck [milSci](opt) [magSci](opt) *"paste"*

        __EX: !atck 7 4 *"paste"*__
        `
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!range**
        Calcs: MT range estimation

        Format: !range [race] [number]

        __EX: !range elf 2500__

        **Note:**
        over 200: MT input, tick output
        under 200: tick input, MT output
        `
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!army**
        Calcs:
        OP/DP ratio and enemy mod DP

        Format:
        !army [yourModOP] [%chance]

        __EX: 542000 75__
        `
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!opdp**
        Calcs:
        Your army's mod/raw OP and DP
        Copy army screen, paste into output
        [How to copy army data](https://github.com/CTFries/S.C.O.P.E/blob/LeviRoss2-ImageRefs/ImageRefs/CopyArmyData.PNG)

        Format:
        !opdp [milSci](opt) [magSci](opt) *"paste"*

        __EX: 5 7 *"paste"*__
        `
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!prep**
        Calcs:
        Prep time given # troops, city icon size

        Format:
        !prep [#Troops] [cityIconSize]
        [What are city icon sizes?](http://visual-utopia.com/mobile/forum.asp?f=Guides+and+Articles&t=City+Sizes&page=1)

        __EX: 425000 4__

        **Note:**
        City size is based on VISUAL size
        Not based on building count
        `
    },
  });

  message.channel.send({
    embed: {
      color: 3447003,
      description: `
        **!bugs**
        Calcs:
        Sends bugged command and message to devs for review

        Format:
        !bugs *paste all info, including !command*

        __EX: !bugs [!atck *battle report*]__
        `

    },
  });

  message.channel.send({
    embed: {
      color: 3447003,
      description: `If you're interested in helping out or have any ideas, here's a link to my repository on github:
          https://github.com/CTFries/S.C.O.P.E`,
    },
  });
}



      // color: 3447003,
      // description: `A list of my commands:

      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!eits**
      //   Calcs:
      //   OP, DP, troop cost, OP to slaughter

      //   Format:
      //   !eits military(opt) magic(opt) *"paste"*

      //   __EX: !eits 7 4 *"paste"*__
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!atck**
      //   Calcs:
      //   Attack chances over prep duration

      //   Format:
      //   !atck military(opt) magic(opt) *"paste"*

      //   __EX: !atck 7 4 *"paste"*__
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!range**
      //   Calcs: MT range estimation

      //   Format: !range race number

      //   __EX: !range elf 2500__

      //   **Note:**
      //   over 200: MT input, tick output
      //   under 200: tick input, MT output
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!army**
      //   Calcs:
      //   OP/DP ratio and enemy mod DP

      //   Format:
      //   !army youModOP %chance

      //   __EX: 542000 75__
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!opdp**
      //   Calcs:
      //   Army's mod/raw OP and DP

      //   Format:
      //   !opdp race U1 U2 U3 U4 5 MilSci(opt) MagSci(opt)

      //   __EX: Orc 1 0 0 350000 23000 8 6__
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!prep**
      //   Calcs:
      //   Prep time given # troops, city icon size

      //   Format:
      //   !prep #Troops cityIconSize

      //   __EX: 425000 4__

      //   **Note:**
      //   City size is based on VISUAL size
      //   Not based on building count
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   **!bugs**
      //   Calcs:
      //   Sends bugged command and message to devs for review

      //   Format:
      //   !bugs *paste all info, including !command*

      //   __EX: !bugs !atck *battle report*__
      //   - - - - - - - - - - - - - - - - - - - - - - - - - -
      //   `
