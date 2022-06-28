/* eslint-disable filenames/match-regex */
import { LokaliseApi, Project } from '@lokalise/node-api';

export default class LokaliseClient {
  api: LokaliseApi | null = null;
  project: Project | null = null;

  constructor(apiToken: string) {
    this.api = new LokaliseApi({ apiKey: apiToken });
  }

  async setProject(projectId: string): Promise<void> {
    try {
      this.project = await this.api?.projects().get(projectId);

      if (this.project === undefined) {
        throw new Error(`project not found: ${projectId}`);
      }
    } catch (error) {
      console.log('Could not get project', error);
      throw error;
    }
  }

  /**
   * @param fileName name of file to upload 'en.json'
   * @param base64FileData base64 of file contents
   * @returns Promise<boolean>
   */
  async uploadFile(fileName: string, base64FileData: string): Promise<boolean> {
    if (this.api === null || this.project === null) {
      // eslint-disable-next-line no-console
      console.log('api or project not set', this.api ?? 'no api', this.project ?? 'no project');
      return false;
    }

    try {
      const uploadProcess = await this.api.files().upload(this.project.project_id, {
        data: base64FileData,
        filename: fileName,
        lang_iso: fileName.split('.')[0],
      });

      if (uploadProcess === undefined) {
        throw new Error('error uploading file');
      }

      await this.waitUntilFileUploading(uploadProcess.process_id, this.project.project_id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }

    return true;
  }

  async waitUntilFileUploading(processId: string, projectId: string): Promise<string> {
    return new Promise(resolve => {
      const interval = setInterval(async () => {
        const reloadedProcess = await this.api?.queuedProcesses().get(processId, { project_id: projectId });

        if (reloadedProcess.status === 'finished') {
          resolve(reloadedProcess.status);
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
