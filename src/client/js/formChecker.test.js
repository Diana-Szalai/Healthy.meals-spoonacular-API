
import { handleURL } from "./formChecker";
let url = 'https://ABa12C.constant.com/';
let constant ='AB'
test('comparing', () => {
    describe("Testing if the submit is defined", () => {
    expect( 'https://ABa12C.constant.com/').toMatch(/AB/);
    })
});
test("Testing the handleURL() function", () => {
    expect(handleURL).toBeDefined();
 });




