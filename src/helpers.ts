// import * as core from "@actions/core";
import path from 'path';
import fs from 'fs';
import { LokaliseApi, Project } from '@lokalise/node-api';

export async function getProject(api: LokaliseApi, projectId: string): Promise<Project> {
  const project = await api.projects().get(projectId);
  if (project === undefined) {
    throw new Error(`project not found: ${projectId}`);
  }

  return project;
}

export function getI18nDir(DirName: string): string {
  const dir = path.resolve(typeof __dirname === 'undefined' ? path.resolve() : __dirname, DirName);

  if (fs.existsSync(dir) === false) {
    throw new Error(`Directory: ${DirName} does not exist!`);
  }

  return dir;
}
