import { describe, it, expect } from "vitest";

describe("Smoke tests", () => {
  it("environment loads", () => {
    expect(true).toBe(true);
  });

  it("React is available", async () => {
    const React = await import("react");
    expect(React.version).toBeDefined();
  });

  it("GSAP is importable", async () => {
    const { gsap } = await import("gsap");
    expect(gsap).toBeDefined();
    expect(gsap.version).toBeDefined();
  });

  it("Motion is importable", async () => {
    const motion = await import("motion/react");
    expect(motion).toBeDefined();
  });
});
