import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { champions, dataDragonVersion } from "../src/data/champions";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOf = (type: string) => api.nodes.filter((node) => node.type === type);

describe("champion mastery course contract", () => {
  it("runs one lecture and one Champion Lab in each of twelve weeks", () => {
    const expectedWeeks = Array.from({ length: 12 }, (_, index) => index + 1);
    const weeksFor = (type: string) =>
      nodesOf(type)
        .map((node) => Number(node.meta?.week))
        .sort((a, b) => a - b);

    expect(weeksFor("lectures")).toEqual(expectedWeeks);
    expect(weeksFor("sessions")).toEqual(expectedWeeks);
  });

  it("uses the promised 20/40/40 assessment structure", () => {
    const weights = nodesOf("assessments")
      .map((node) => Number(node.meta?.weight))
      .sort((a, b) => a - b);

    expect(weights).toEqual([20, 40, 40]);
    expect(weights.reduce((sum, weight) => sum + weight, 0)).toBe(100);
  });

  it("keeps every stage of the improvement loop in the teaching sequence", () => {
    const stages = new Set(nodesOf("lectures").map((node) => node.meta?.loopStage));
    expect(stages).toEqual(new Set(["plan", "drill", "test", "review", "revise"]));
  });

  it("publishes policies into the generated course graph", () => {
    expect(nodesOf("policies")).toHaveLength(1);
  });
});

describe("matchup atlas contract", () => {
  it("freezes a complete, unique Data Dragon 16.17.1 roster", () => {
    expect(dataDragonVersion).toBe("16.17.1");
    expect(champions).toHaveLength(173);
    expect(new Set(champions.map((champion) => champion.id)).size).toBe(champions.length);
  });

  it("provides direct-lane coverage and a ten-opponent Volibear pressure queue", () => {
    expect(champions.filter((champion) => champion.lanePool).length).toBeGreaterThanOrEqual(50);
    expect(champions.filter((champion) => champion.priority)).toHaveLength(10);
    expect(champions.find((champion) => champion.id === "Volibear")?.lanePool).toBe(true);
  });

  it("renders one persistent status control per roster entry", () => {
    const html = readFileSync(resolve("dist/tools/matchup-atlas/index.html"), "utf8");
    expect(html.match(/data-status-button=/g)).toHaveLength(champions.length);
    expect(html).toContain("slop3745-matchup-atlas-v2");
    expect(html).toContain("Export evidence JSON");
  });
});
