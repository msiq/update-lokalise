// import * as process from 'process'
// import * as cp from 'child_process'
// import * as path from 'path'
// import fs from 'fs'
// import * as os from 'os'
// import run from '../src/main'
// import {expect, test} from '@jest/globals'
// import * as core from '@actions/core'
import path from 'path';
import fs from 'fs';
import { getProject } from '../src/helpers';
// import {LokaliseApi, PaginatedResult, Project, Projects} from '@lokalise/node-api'
import { LokaliseApi } from '@lokalise/node-api';
// import LokaliseApi from '@lokalise/node-api';
jest.genMockFromModule('LokaliseApi');
jest.mock('LokaliseApi');
// const projectslist = jest.fn().;
// const projects = jest.fn(() => ({
//   list: projectslist
// }));
// const FakeLokaliseApi = jest.mock<LokaliseApi>('LokaliseApi')
//   .fn(() => ({
//   projects: projects,
// }));

describe('Helpers', () => {
  beforeEach(() => {
    const filePath = path.join(__dirname, `test`);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  });

  it('should throw of unknown dir', async () => {
    // const api = jest.mock('LokaliseApi', () => ({
    //   projects: () => {
    //     list: () => []
    //   }
    // }))
    // expect(await getProject({projects.mockResolvedValue().list();};, 'dirname')).toBe(null);
    const api = { projects: { list: () => (['proj1', 'proj2']) } };
    //  as unknown as LokaliseApi;
    const FakeLokaliseApi = jest.mocked<LokaliseApi>(new LokaliseApi({ apiKey: 'api-token' }))
    expect(await getProject(FakeLokaliseApi, 'dirname')).toBe(null);
  });
});

// export async function getProject(api: LokaliseApi, projectName: string): Promise<Project> {
//   const projects = await api.projects().list()
//   const project = projects.items.find((proj: Project) => proj.name === projectName)
//   if (project === undefined) {
//     throw new Error(`project not found: ${projectName}`)
//   }

//   return project
// }

// export function getI18nDir(DirName: string): string {
//   const dir = path.resolve(typeof __dirname === 'undefined' ? path.resolve() : __dirname, DirName)

//   if (fs.existsSync(dir) === false) {
//     throw new Error(`Directory: ${DirName} does not exist!`)
//   }

//   return dir
// }
