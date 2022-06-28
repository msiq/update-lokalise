import * as core from '@actions/core';
// import { LokaliseApi } from '@lokalise/node-api';
// import Uploader from './uploader';
// import { getI18nDir, getProject } from './helpers';
import LokaliseClient from './lokaliseClient';
import FileManager from './fileManager';

export default async function run(): Promise<void> {
  try {
    // const api = new LokaliseApi({ apiKey: core.getInput('api-token').trim() });
    // const project: Project = await getProject(api, core.getInput('project-id').trim());
    // const i18nDir = getI18nDir(core.getInput('dir-path').trim());

    // const lapi = new LokaliseClient(core.getInput('api-token').trim());
    const lapi = new LokaliseClient('2348373fae9fb7fcf45be9c66e615bab824fb5b5');
    // lapi.setProject(core.getInput('project-id').trim());
    await lapi.setProject('29761614627704f6512b99.95393186');

    // const pathtofiles = core.getInput('dir-path').trim();
    const pathtofiles = 'i18n';
    const extension = 'json';
    const fileManager = new FileManager(pathtofiles, extension);

    for (const file of await fileManager.getBase64Encodedfiles()) {
      console.log('------------------------------------->', file);
      // await lapi.uploadFile(file.name, file.data);
    }

    // new Uploader(api).upload(project.project_id, i18nDir);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
