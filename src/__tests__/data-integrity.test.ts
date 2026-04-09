import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(__dirname, "../data");

const requiredFiles = [
  "site.json",
  "services.json",
  "pricing.json",
  "testimonials.json",
  "faq.json",
  "properties.json",
  "articles.json",
  "contact-form.json",
  "homepage.json",
];

describe("Data integrity", () => {
  it("all required JSON files exist", () => {
    for (const file of requiredFiles) {
      const filePath = path.join(DATA_DIR, file);
      expect(fs.existsSync(filePath), `${file} should exist`).toBe(true);
    }
  });

  it("all JSON files are valid JSON", () => {
    for (const file of requiredFiles) {
      const filePath = path.join(DATA_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(() => JSON.parse(content), `${file} should be valid JSON`).not.toThrow();
    }
  });

  it("site.json has required company info", () => {
    const site = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "site.json"), "utf-8")
    );
    expect(site.company).toBe("Provenly Homes");
    expect(site.phone).toBeTruthy();
    expect(site.address).toBeTruthy();
  });

  it("services.json has 6 services", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "services.json"), "utf-8")
    );
    expect(data.services).toHaveLength(6);
    for (const service of data.services) {
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
    }
  });

  it("pricing.json has 3 packages", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "pricing.json"), "utf-8")
    );
    expect(data.packages).toHaveLength(3);
    for (const pkg of data.packages) {
      expect(pkg.name).toBeTruthy();
      expect(pkg.percentage).toBeGreaterThan(0);
      expect(pkg.features.length).toBeGreaterThan(0);
    }
  });

  it("testimonials.json has 6 testimonials", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "testimonials.json"), "utf-8")
    );
    expect(data.testimonials).toHaveLength(6);
  });

  it("faq.json has 7 FAQs", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "faq.json"), "utf-8")
    );
    expect(data.faqs).toHaveLength(7);
    for (const faq of data.faqs) {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
    }
  });

  it("properties.json has 3 properties with slugs", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "properties.json"), "utf-8")
    );
    expect(data.properties).toHaveLength(3);
    for (const prop of data.properties) {
      expect(prop.slug).toBeTruthy();
      expect(prop.name).toBeTruthy();
      expect(prop.pricePerNight).toBeGreaterThan(0);
    }
  });

  it("articles.json has 5 articles with slugs", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "articles.json"), "utf-8")
    );
    expect(data.articles).toHaveLength(5);
    for (const article of data.articles) {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
    }
  });

  it("contact-form.json has 4 sections", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "contact-form.json"), "utf-8")
    );
    expect(data.sections).toHaveLength(4);
  });

  it("no known typos in any JSON file", () => {
    const typos = [
      "Gästekommuniktation",
      "Gastgeberstandarts",
      "Immobilienexpertiese",
      "Orintierung",
      "Möblierungsstattus",
    ];
    for (const file of requiredFiles) {
      const content = fs.readFileSync(
        path.join(DATA_DIR, file),
        "utf-8"
      );
      for (const typo of typos) {
        expect(content, `${file} contains typo "${typo}"`).not.toContain(typo);
      }
    }
  });

  it("no empty strings in required fields", () => {
    const site = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "site.json"), "utf-8")
    );
    expect(site.company).not.toBe("");
    expect(site.phone).not.toBe("");
    expect(site.address).not.toBe("");
  });
});
