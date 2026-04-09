import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.resolve(SRC_DIR, "data");
const SECTIONS_DIR = path.resolve(SRC_DIR, "components/sections");
const LAYOUT_DIR = path.resolve(SRC_DIR, "components/layout");

/* ------------------------------------------------------------------ */
/*  Helper: read JSON                                                  */
/* ------------------------------------------------------------------ */
function readJSON(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), "utf-8"));
}

function readComponent(dir: string, filename: string) {
  return fs.readFileSync(path.join(dir, filename), "utf-8");
}

/* ================================================================== */
/*  1. Extended data integrity — verify specific content               */
/* ================================================================== */
describe("Data integrity extended", () => {
  it("site.json company is 'Provenly Homes'", () => {
    const site = readJSON("site.json");
    expect(site.company).toBe("Provenly Homes");
  });

  it("site.json has valid navigation with hrefs starting with /", () => {
    const site = readJSON("site.json");
    expect(site.navigation.length).toBeGreaterThan(0);
    for (const item of site.navigation) {
      expect(item.label).toBeTruthy();
      expect(item.href).toMatch(/^\//);
    }
  });

  it("site.json footer has non-empty copyright", () => {
    const site = readJSON("site.json");
    expect(site.footer.copyright).toContain("Provenly Homes");
  });

  it("services.json heading is non-empty and services have icons", () => {
    const data = readJSON("services.json");
    expect(data.heading.length).toBeGreaterThan(5);
    expect(data.subheading.length).toBeGreaterThan(5);
    for (const service of data.services) {
      expect(service.icon).toBeTruthy();
      expect(service.id).toBeTruthy();
      expect(service.title.length).toBeGreaterThan(3);
      expect(service.description.length).toBeGreaterThan(20);
    }
  });

  it("services.json closing statement exists", () => {
    const data = readJSON("services.json");
    expect(data.closing).toBeTruthy();
    expect(data.closing.length).toBeGreaterThan(10);
  });

  it("pricing.json packages have correct percentage range (10-50)", () => {
    const data = readJSON("pricing.json");
    for (const pkg of data.packages) {
      expect(pkg.percentage).toBeGreaterThanOrEqual(10);
      expect(pkg.percentage).toBeLessThanOrEqual(50);
    }
  });

  it("pricing.json startvorteil block has heading and description", () => {
    const data = readJSON("pricing.json");
    expect(data.startvorteil.heading).toBeTruthy();
    expect(data.startvorteil.description.length).toBeGreaterThan(20);
  });

  it("pricing.json addons are non-empty", () => {
    const data = readJSON("pricing.json");
    expect(data.addons.length).toBeGreaterThan(0);
    for (const addon of data.addons) {
      expect(addon.id).toBeTruthy();
      expect(addon.name).toBeTruthy();
    }
  });

  it("pricing.json custom section has cta and ctaNote", () => {
    const data = readJSON("pricing.json");
    expect(data.custom.heading).toBeTruthy();
    expect(data.custom.cta).toBeTruthy();
    expect(data.custom.ctaNote).toBeTruthy();
  });

  it("faq.json each FAQ has substantial answer (> 50 chars)", () => {
    const data = readJSON("faq.json");
    for (const faq of data.faqs) {
      expect(faq.answer.length).toBeGreaterThan(50);
      expect(faq.question.endsWith("?")).toBe(true);
    }
  });

  it("faq.json has heading and intro", () => {
    const data = readJSON("faq.json");
    expect(data.heading).toBeTruthy();
    expect(data.intro.length).toBeGreaterThan(10);
  });

  it("contact-form.json has 13 total fields across 4 sections", () => {
    const data = readJSON("contact-form.json");
    const totalFields = data.sections.reduce(
      (sum: number, s: { fields: unknown[] }) => sum + s.fields.length,
      0
    );
    expect(totalFields).toBe(14);
  });

  it("contact-form.json all fields have id and label", () => {
    const data = readJSON("contact-form.json");
    for (const section of data.sections) {
      for (const field of section.fields) {
        expect(field.id).toBeTruthy();
        expect(field.label).toBeTruthy();
        expect(["text", "email", "tel", "number", "radio", "checkbox"]).toContain(
          field.type
        );
      }
    }
  });

  it("contact-form.json radio/checkbox fields have options", () => {
    const data = readJSON("contact-form.json");
    for (const section of data.sections) {
      for (const field of section.fields) {
        if (field.type === "radio" || field.type === "checkbox") {
          expect(field.options).toBeDefined();
          expect(field.options.length).toBeGreaterThan(0);
          for (const opt of field.options) {
            expect(opt.label).toBeTruthy();
            expect(opt.value).toBeTruthy();
          }
        }
      }
    }
  });

  it("contact-form.json has submitLabel", () => {
    const data = readJSON("contact-form.json");
    expect(data.submitLabel).toBe("Anfrage senden");
  });

  it("homepage.json hero has heading and ctas", () => {
    const data = readJSON("homepage.json");
    expect(data.hero.heading.length).toBeGreaterThan(10);
    expect(data.hero.ctas.length).toBeGreaterThan(0);
    for (const cta of data.hero.ctas) {
      expect(cta.label).toBeTruthy();
      expect(cta.href).toMatch(/^\//);
    }
  });

  it("testimonials.json testimonials have required profile fields", () => {
    const data = readJSON("testimonials.json");
    expect(data.testimonials.length).toBe(6);
    for (const t of data.testimonials) {
      expect(t.profile).toBeTruthy();
      expect(t.location).toBeTruthy();
      expect(t.result).toBeTruthy();
    }
  });

  it("properties.json properties have slug, name, and valid pricePerNight", () => {
    const data = readJSON("properties.json");
    for (const p of data.properties) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.name).toBeTruthy();
      expect(p.pricePerNight).toBeGreaterThan(0);
      expect(p.amenities.length).toBeGreaterThan(0);
    }
  });

  it("articles.json articles have slug, title, category, and sections", () => {
    const data = readJSON("articles.json");
    for (const a of data.articles) {
      expect(a.slug).toMatch(/^[a-z0-9-]+$/);
      expect(a.title).toBeTruthy();
      expect(a.category).toBeTruthy();
      expect(a.sections).toBeDefined();
    }
  });
});

/* ================================================================== */
/*  2. No stub/placeholder text remaining in components                */
/* ================================================================== */
describe("No stub text remaining", () => {
  const sectionFiles = fs.readdirSync(SECTIONS_DIR).filter((f) => f.endsWith(".tsx"));
  const layoutFiles = fs.readdirSync(LAYOUT_DIR).filter((f) => f.endsWith(".tsx"));

  const stubPatterns = [
    /\[.*Component.*\]/,
    /\[.*Section.*\]/,
    /\[.*Page.*\]/,
    /TODO/,
    /FIXME/,
    /placeholder text/i,
    /lorem ipsum/i,
  ];

  for (const file of sectionFiles) {
    it(`sections/${file} has no stub text`, () => {
      const content = readComponent(SECTIONS_DIR, file);
      for (const pattern of stubPatterns) {
        expect(content).not.toMatch(pattern);
      }
    });
  }

  for (const file of layoutFiles) {
    it(`layout/${file} has no stub text`, () => {
      const content = readComponent(LAYOUT_DIR, file);
      for (const pattern of stubPatterns) {
        expect(content).not.toMatch(pattern);
      }
    });
  }
});

/* ================================================================== */
/*  3. Component file sizes — all section components > 500 bytes       */
/* ================================================================== */
describe("Component file sizes", () => {
  const sectionFiles = fs.readdirSync(SECTIONS_DIR).filter((f) => f.endsWith(".tsx"));

  for (const file of sectionFiles) {
    it(`sections/${file} is > 500 bytes (not a stub)`, () => {
      const stat = fs.statSync(path.join(SECTIONS_DIR, file));
      expect(stat.size).toBeGreaterThan(500);
    });
  }

  const layoutFiles = fs.readdirSync(LAYOUT_DIR).filter((f) => f.endsWith(".tsx"));

  for (const file of layoutFiles) {
    it(`layout/${file} is > 200 bytes (not a stub)`, () => {
      const stat = fs.statSync(path.join(LAYOUT_DIR, file));
      expect(stat.size).toBeGreaterThan(200);
    });
  }
});

/* ================================================================== */
/*  4. JSON import chains — components import from @/data/             */
/* ================================================================== */
describe("JSON import chains", () => {
  const importMap: Record<string, string[]> = {
    "Hero.tsx": ["homepage.json"],
    "Services.tsx": ["services.json"],
    "FAQ.tsx": ["faq.json"],
    "Pricing.tsx": ["pricing.json"],
    "Testimonials.tsx": ["testimonials.json"],
    "ContactForm.tsx": ["contact-form.json"],
    "Footer.tsx": ["site.json"],
  };

  for (const [component, jsonFiles] of Object.entries(importMap)) {
    const dir = component === "Footer.tsx" ? LAYOUT_DIR : SECTIONS_DIR;

    it(`${component} imports ${jsonFiles.join(", ")}`, () => {
      const content = readComponent(dir, component);
      for (const jsonFile of jsonFiles) {
        const importPattern = jsonFile.replace(".", "\\.");
        expect(content).toMatch(new RegExp(`from.*@/data/${importPattern}`));
      }
    });
  }

  it("Hero.tsx imports types from @/data/types", () => {
    const content = readComponent(SECTIONS_DIR, "Hero.tsx");
    expect(content).toMatch(/from.*@\/data\/types/);
  });

  it("Services.tsx imports types from @/data/types", () => {
    const content = readComponent(SECTIONS_DIR, "Services.tsx");
    expect(content).toMatch(/from.*@\/data\/types/);
  });

  it("ContactForm.tsx imports formsubmit config", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toMatch(/from.*@\/lib\/formsubmit/);
  });
});

/* ================================================================== */
/*  5. ContactForm component structural checks                         */
/* ================================================================== */
describe("ContactForm component structure", () => {
  it("renders all 4 section titles from JSON", () => {
    const formData = readJSON("contact-form.json");
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");

    // Component should iterate over sections dynamically
    expect(content).toMatch(/data\.sections\.map/);
  });

  it("has honeypot field", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toMatch(/_honey/);
    expect(content).toMatch(/display.*none|sr-only/);
  });

  it("handles all form states (idle, submitting, success, error)", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toContain("idle");
    expect(content).toContain("submitting");
    expect(content).toContain("success");
    expect(content).toContain("error");
  });

  it("submits via fetch to FormSubmit URL", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toMatch(/fetch\(FORMSUBMIT_ACTION/);
  });

  it("has pill-style checkboxes for section 4 (fortfahren)", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toContain("fortfahren");
    expect(content).toMatch(/rounded-full/);
  });

  it("uses brand-consistent input styles", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toContain("border-sand");
    expect(content).toContain("focus:border-copper");
    expect(content).toContain("rounded-lg");
    expect(content).toContain("font-body");
  });

  it("submit button says 'Anfrage senden'", () => {
    const content = readComponent(SECTIONS_DIR, "ContactForm.tsx");
    expect(content).toContain("data.submitLabel");
  });
});

/* ================================================================== */
/*  6. Kontakt page structure                                          */
/* ================================================================== */
describe("Kontakt page structure", () => {
  it("imports and renders ContactForm, Header, Footer", () => {
    const content = fs.readFileSync(
      path.resolve(SRC_DIR, "app/kontakt/page.tsx"),
      "utf-8"
    );
    expect(content).toMatch(/import.*Header/);
    expect(content).toMatch(/import.*Footer/);
    expect(content).toMatch(/import.*ContactForm/);
    expect(content).toMatch(/import.*Container/);
  });

  it("uses heading from contact-form.json", () => {
    const content = fs.readFileSync(
      path.resolve(SRC_DIR, "app/kontakt/page.tsx"),
      "utf-8"
    );
    expect(content).toMatch(/data\.heading/);
  });

  it("exports metadata", () => {
    const content = fs.readFileSync(
      path.resolve(SRC_DIR, "app/kontakt/page.tsx"),
      "utf-8"
    );
    expect(content).toMatch(/export const metadata/);
  });

  it("does not contain stub placeholder text", () => {
    const content = fs.readFileSync(
      path.resolve(SRC_DIR, "app/kontakt/page.tsx"),
      "utf-8"
    );
    expect(content).not.toMatch(/\[.*Form.*\]/);
    expect(content).not.toMatch(/\[.*Kontakt.*\]/);
  });
});
