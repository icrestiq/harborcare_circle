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
