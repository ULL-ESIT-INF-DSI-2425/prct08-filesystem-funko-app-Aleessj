import { describe, expect, test } from "vitest";
import { UserCollection } from "../src/models/user_collection"

const user = new UserCollection("test");

describe("Test para la clase UserCollection", () => {
  test("Está definida", () => {
    expect(UserCollection).toBeDefined();
  });
  
  test("Tiene un método addFunko()", () => {
    expect(typeof user.addFunko).toBe("function");
  });

  test("Tiene un método removeFunko()", () => {
    expect(typeof user.removeFunko).toBe("function");
  });

  test("Tiene un método updateFunko()", () => {
    expect(typeof user.updateFunko).toBe("function");
  });

  test("Tiene un método showFunko()", () => {
    expect(typeof user.showFunko).toBe("function");
  });

  test("Tiene un método listCollection()", () => {
    expect(typeof user.listCollection).toBe("function");
  });

  test("Tiene un método clearCollection()", () => {
    expect(typeof user.clearCollection).toBe("function");
  });
});