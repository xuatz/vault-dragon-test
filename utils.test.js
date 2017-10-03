const { isValueValid } = require("./utils.js");

describe("isValueValid()", () => {
    it("should return false when null", () => {
        expect(isValueValid(null)).toEqual(false);
    });
    it("should return false when undefined", () => {
        expect(isValueValid(undefined)).toEqual(false);
    });
    it("should return false when empty", () => {
        expect(isValueValid("")).toEqual(false);
    });

    it("should return true when 1", () => {
        expect(isValueValid(1)).toEqual(true);
    });

    it("should return true when 'woohoo'", () => {
        expect(isValueValid("woohoo")).toEqual(true);
    });

    it("should return true when provided boolean false", () => {
        expect(isValueValid(false)).toEqual(true);
    });

    it("should return true when provided boolean true", () => {
        expect(isValueValid(true)).toEqual(true);
    });

    let tmp = {
        someKey: "someValue"
    };

    it("should return true when receive json", () => {
        expect(isValueValid(tmp)).toEqual(true);
    });
    it("should return true when receive json string", () => {
        expect(isValueValid(JSON.stringify(tmp))).toEqual(true);
    });
});
