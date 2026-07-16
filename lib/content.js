import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const CHECKLISTS_DIR = path.join(process.cwd(), 'content', 'checklists');

/**
 * Content layer for HarborCare Circle.
 *
 * Today this reads flat JSON files from /content — a lightweight stand-in
 * for a real headless CMS. Every function below is written so that a real
 * CMS (Contentful, Sanity, or a Postgres-backed admin per Deliverable 5)
 * can be swapped in later by changing only this file — nothing in the
 * components or pages needs to know where content actually comes from.
 */

export function getAllArticleSlugs() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function getArticleBySlug(slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getAllArticles() {
  return getAllArticleSlugs()
    .map(getArticleBySlug)
    .filter(Boolean);
}

export function getAllChecklistSlugs() {
  if (!fs.existsSync(CHECKLISTS_DIR)) return [];
  return fs
    .readdirSync(CHECKLISTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function getChecklistBySlug(slug) {
  const filePath = path.join(CHECKLISTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getAllChecklists() {
  return getAllChecklistSlugs()
    .map(getChecklistBySlug)
    .filter(Boolean);
}

// Groups the granular auto-generated categories (from the editorial-calendar
// month themes) into the 4 top-level nav sections. "Caregiving 101" is a
// catch-all for content that doesn't fit the other 3 — worth knowing that
// no articles were ever drafted specifically under a "Caregiving 101" theme;
// what lands here is the evergreen/seasonal and app-bridge content instead.
export function getArticlesForNavSection(section) {
  const all = getAllArticles();
  const matches = (cat, keywords) => keywords.some((k) => cat.toLowerCase().includes(k));

  if (section === 'conditions') {
    return all.filter((a) => matches(a.category, ['conditions']));
  }
  if (section === 'life-transitions') {
    return all.filter((a) => matches(a.category, ['life transitions']));
  }
  if (section === 'after-a-loss') {
    return all.filter((a) => matches(a.category, ['after a loss', 'death of a loved one', 'hospice']));
  }
  if (section === 'caregiving-101') {
    return all.filter(
      (a) => !matches(a.category, ['conditions', 'life transitions', 'after a loss', 'death of a loved one', 'hospice'])
    );
  }
  return [];
}

const ASSESSMENTS_DIR = path.join(process.cwd(), 'content', 'assessments');
const CALCULATORS_DIR = path.join(process.cwd(), 'content', 'calculators');
const ROADMAP_DIR = path.join(process.cwd(), 'content', 'roadmap');

export function getAssessmentBySlug(slug) {
  const filePath = path.join(ASSESSMENTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function getAllAssessmentSlugs() {
  if (!fs.existsSync(ASSESSMENTS_DIR)) return [];
  return fs.readdirSync(ASSESSMENTS_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

export function getCalculatorBySlug(slug) {
  const filePath = path.join(CALCULATORS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function getAllCalculatorSlugs() {
  if (!fs.existsSync(CALCULATORS_DIR)) return [];
  return fs.readdirSync(CALCULATORS_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

export function getAllCalculators() {
  return getAllCalculatorSlugs()
    .map(getCalculatorBySlug)
    .filter(Boolean);
}

export function getRoadmapConfig() {
  const filePath = path.join(ROADMAP_DIR, 'care-journey-roadmap.json');
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
