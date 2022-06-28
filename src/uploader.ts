import * as core from '@actions/core';
import { LokaliseApi } from '@lokalise/node-api';
import path from 'path';
import fs from 'fs';
const fsPromises = fs.promises;

export default class uploader {
  api: LokaliseApi;

  constructor(api: LokaliseApi) {
    this.api = api;
  }

  async upload(projectId: string, i18nDir: string): Promise<void> {
    try {
      const uploadedFiles: string[] = [];
      const files = await fsPromises.readdir(i18nDir);
      await Promise.all(
        files.map(async file => {
          if (!file.endsWith('.json')) {
            // eslint-disable-next-line no-console
            console.log('File skipped: ', file);
          }

          const fileData = fs.readFileSync(path.join(i18nDir, file), 'utf8');
          const buff = Buffer.from(fileData, 'utf8');
          const base64File = buff.toString('base64');

          // eslint-disable-next-line no-console
          console.log(`Uploading: ${file}`);
          try {
            const uploadProcess = await this.api.files().upload(projectId, {
              data: base64File,
              filename: file,
              lang_iso: file.split('.')[0],
            });

            await this.waitUntilUploadingDone(uploadProcess.process_id, projectId);

            // eslint-disable-next-line no-console
            console.log(`Upload complete: ${file}`);
            uploadedFiles.push(file); // collecting file name for output
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`Upload error: ${file}; ${err}`);
          }
        })
      );

      core.setOutput('uploaded-files', uploadedFiles);
    } catch (error) {
      if (error instanceof Error) core.setFailed(error?.message);
    }
  }

  async waitUntilUploadingDone(processId: string, projectId: string): Promise<string> {
    return new Promise(resolve => {
      const interval = setInterval(async () => {
        const reloadedProcess = await this.api.queuedProcesses().get(processId, { project_id: projectId });

        if (reloadedProcess.status === 'finished') {
          resolve(reloadedProcess.status);
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
