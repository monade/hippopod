import inquirer from "inquirer";

export default class Asker {
  async ask(message, validation) {
    const answer = await inquirer.prompt({
      name: 'response',
      type: 'input',
      message,
      validate: validation,
    });
    return answer.response;
  }

  async askList(message, choices) {
    const answer = await inquirer.prompt({
      name: 'response',
      type: 'list',
      message,
      choices,
    });
    return answer.response;
  }

  async askCheckbox(message, choices) {
    const answer = await inquirer.prompt({
      name: 'response',
      type: 'checkbox',
      message,
      choices,
    });
    return answer.response;
  }
}
