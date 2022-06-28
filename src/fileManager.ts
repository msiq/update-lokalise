/* eslint-disable filenames/match-regex */
import path from 'path';
import fs from 'fs';
const fsPromises = fs.promises;

export type FileData = {
  name: string;
  data: string;
};

export default class FileManager {
  path: string;

  extention = 'json';

  constructor(pathtofiles: string, extension: string) {
    this.path = pathtofiles;
    this.extention = extension;
  }

  /**
   * Generates file data as base64 string one by one
   * @returns AsyncGenerator<FileData, void, void>
   */
  // async getBase64Encodedfiles(): Promise<AsyncGenerator<FileData, void, void>> {
  // async getBase64Encodedfiles(): Promise<string> {
  async getBase64Encodedfiles(): Promise<Generator<string, void, void>> {
    // try {
    const files = await fsPromises.readdir(this.path);

    function* theGenerator(): Generator<string, void, void> {
      for (const file of files) {
        yield file;
      }
    };
    theGenerator.next = () => {};
    theGenerator.return = () => {};
    theGenerator.throw = () => {};
    theGenerator.iterator = () => {};
    // [Symbol.iterator]: function () { },
    // const iterName = [Symbol.iterator];

    return theGenerator();

    // {
    //   [Symbol.iterator]: () => {
    //     for (const file of files) {
    //       yield { name: file, data: base64File };
    //     },
    //   }
  }

  // for (const file of files) {
  //   if (!file.endsWith(`.${this.extention}`)) {
  //     // eslint-disable-next-line no-console
  //     console.log('Skipping file, unexpected file extenstion: ', file);
  //   }

  //   const fileData = fs.readFileSync(path.join(this.path, file), 'utf8');
  //   const buff = Buffer.from(fileData, 'utf8');
  //   const base64File = buff.toString('base64');
  //   // eslint-disable-next-line no-console
  //   console.log(`Uploading: ${file}`);

  //   yield { name: file, data: base64File };
  // }

  // } catch (error) {
  //   if (error instanceof Error) core.setFailed(error?.message);
  // }
  // }

  // async upload(projectId: string, i18nDir: string): Promise<void> {
  //   try {
  //     const uploadedFiles: string[] = [];
  //     const files = await fsPromises.readdir(i18nDir);
  //     await Promise.all(
  //       files.map(async file => {
  //         if (!file.endsWith('.json')) {
  //           // eslint-disable-next-line no-console
  //           console.log('File skipped: ', file);
  //         }

  //         const fileData = fs.readFileSync(path.join(i18nDir, file), 'utf8');
  //         const buff = Buffer.from(fileData, 'utf8');
  //         const base64File = buff.toString('base64');

  //         // eslint-disable-next-line no-console
  //         console.log(`Uploading: ${file}`);
  //         try {
  //           const uploadProcess = await this.api.files().upload(projectId, {
  //             data: base64File,
  //             filename: file,
  //             lang_iso: file.split('.')[0],
  //           });

  //           await this.waitUntilUploadingDone(uploadProcess.process_id, projectId);

  //           // eslint-disable-next-line no-console
  //           console.log(`Upload complete: ${file}`);
  //           uploadedFiles.push(file); // collecting file name for output
  //         } catch (err) {
  //           // eslint-disable-next-line no-console
  //           console.log(`Upload error: ${file}; ${err}`);
  //         }
  //       })
  //     );

  //     core.setOutput('uploaded-files', uploadedFiles);
  //   } catch (error) {
  //     if (error instanceof Error) core.setFailed(error?.message);
  //   }
  // }

  // async waitUntilUploadingDone(processId: string, projectId: string): Promise<string> {
  //   return new Promise(resolve => {
  //     const interval = setInterval(async () => {
  //       const reloadedProcess = await this.api.queuedProcesses().get(processId, { project_id: projectId });

  //       if (reloadedProcess.status === 'finished') {
  //         resolve(reloadedProcess.status);
  //         clearInterval(interval);
  //       }
  //     }, 1000);
  //   });
  // }
}

// class fileDataGenerator {

//   files: string[] = [];
//   i: number = 0;
//   constructor(files: string[]) {
//     this.files = files;
//     this.i = 0;
//   }

//   [Symbol.iterator]() {
//     return this;
//   }

//   next() {
//     if (this.i === this.files.length) return {done: true}
//     return {value: this.arr[this.i++], done: false}
//   }
// }
