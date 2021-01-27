module.exports = (client, message) => {
  // checks to see if prefix is there, and that it wasn't a bot calling it.
  if (!message.content.startsWith(client.config.prefix) || message.author.bot)
    return;

  // Command and Argument Defining.
  let args = [];
  let command;

  // All arguments now handled the same
  args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  command = args.shift().toLowerCase();

  // Command Handling.
  let cmd = client.commands.get(command);
  if (!cmd) return;
  console.log(`${command} called by ${message.author} with arguments:${args}`);

  // only execute the new request/response style
  // command for the "range" command
  if (["range"].includes(cmd)) {
    console.log("executing range command using the new request / response pattern");
    let request = {authorId: message.author.id, author: message.author, messageString: message.string, args: args};
    let response = cmd(request);
    response.messages.forEach(m => message.send(m));
    if (response.deleteOriginalMessage) message.delete({timeout: 1000});

  } else {
    cmd(client, message, args);
  }

};
