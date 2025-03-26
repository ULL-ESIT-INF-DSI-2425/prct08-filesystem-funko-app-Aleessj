import { describe, expect, test } from "vitest";
import { FileManager } from "../src/utils/file_manager"

describe("Test para la clase FileManager", () => {
  test("Está definida", () => {
    expect(FileManager).toBeDefined();
  });
  
  test("Tiene un método getUserDirectory()", () => {
    expect(typeof FileManager.getUserDirectory).toBe("function");
  });

  test("Tiene un método getFunkoPath()", () => {
    expect(typeof FileManager.getFunkoPath).toBe("function");
  });

  test("Tiene un método deleteFile()", () => {
    expect(typeof FileManager.deleteFile).toBe("function");
  });

  test("Tiene un método readJOSN()", () => {
    expect(typeof FileManager.readJSON).toBe("function");
  });

  test("Tiene un método writeJSON()", () => {
    expect(typeof FileManager.writeJSON).toBe("function");
  });

  test("Tiene un método readAllFunkos()", () => {
    expect(typeof FileManager.readAllFunkos).toBe("function");
  });
});