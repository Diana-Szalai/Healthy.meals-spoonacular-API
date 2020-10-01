import { handleSubmit } from "./formHandler";

describe("Testing if the submit is defined", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    });
});
