import { expect, test } from "@oclif/test";

describe("list", () => {
  test
    .nock("https://jsonplaceholder.typicode.com", api => {
      api.get("/todos?userId=1").reply(200, [
        {
          id: 1,
          completed: false,
          title: "get to work!"
        },
        {
          id: 2,
          completed: false,
          title: "get to work!"
        }
      ]);
    })

    .stdout()
    .command("list")
    .it("list todos", ctx => {
      expect(ctx.stdout).to.contain("Completed Title");
      expect(ctx.stdout).to.contain("Completed Title");
      expect(ctx.stdout).to.contain("Completed Title");
    });
});
