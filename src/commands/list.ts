import { Command, flags } from "@oclif/command";
import axios from "axios";
import cli from "cli-ux";

type TodoResponse = {
  id: number;
  title: string;
  completed: boolean;
};

export default class List extends Command {
  static description = "list of todos";

  static aliases = ["ls"];

  static examples = [
    `todo list --use
    Complete Title
      delectus aut
`
  ];

  static flags = {
    ...cli.table.flags()
  };

  async run() {
    this.parse(List);

    const { data: todos } = await axios.get<TodoResponse[]>(
      "https://jsonplaceholder.typicode.com/todos?userId=1"
    );

    cli.table(
      todos,
      {
        id: {
          header: "ID",
          extended: true
        },
        completed: {
          get: row => (row.completed ? "x" : " ")
        },
        title: {}
      },
      { printLine: this.log, ...flags }
    );

    // this.log("Completed Titles");
    // for (let todo of todos) {
    //   console.log(`${JSON.stringify(todo)}`);
    // }
  }
}
