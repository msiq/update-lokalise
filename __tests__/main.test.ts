import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import fs from 'fs';
import * as os from 'os';
import run from '../src/main';
import { expect, test } from '@jest/globals';
import * as core from '@actions/core';

const testEnvVars = {
  'my var': '',
  'api-token': 'lajshdlfauhsfölaskhdflkasdfk',
  // PATH: `path1${path.delimiter}path2`,
  // Set inputs
  'INPUT_API-TOKEN': 'apitokenlajshkjshfksjdhfksjdhs',
  INPUT_PROJECT: 'nameofProject',
  // INPUT_MISSING: '',
  // INPUT_MY_INPUT_LIST: 'val1\nval2\nval3',

  // Save inputs
  STATE_TEST_1: 'state_val',

  // File Commands
  GITHUB_PATH: '',
  GITHUB_ENV: '',
};

describe('@actions/core', () => {
  beforeAll(() => {
    const filePath = path.join(__dirname, `test`);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  });

  beforeEach(() => {
    for (const key in testEnvVars) {
      process.env[key] = testEnvVars[key as keyof typeof testEnvVars];
    }
    process.stdout.write = jest.fn();
  });

  // it('legacy exportVariable produces the correct command and sets the env', () => {
  //   core.exportVariable('my var', 'var val')
  //   assertWriteCalls([`::set-env name=my var::var val${os.EOL}`])
  // })

  // test('throws on missing api token', async () => {
  //   console.log('------------------------------------------------------')
  //   console.log(core.getInput('api-token'))
  //   console.log('------------------------------------------------------')
  //   await expect(run()).resolves.toBe(undefined)
  //   await expect(core.getInput('api-token')).toBe('apitokenlajshkjshfksjdhfksjdhsss')
  //   // await expect(core.failure).toBe('Error: Instantiation failed: Please pass an API key')
  // })
});

// test('wait 500 ms', async () => {
//   const start = new Date()
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })

// // shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env['INPUT_MILLISECONDS'] = '500'
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execFileSync(np, [ip], options).toString())
// })

function assertWriteCalls(calls: string[]): void {
  expect(process.stdout.write).toHaveBeenCalledTimes(calls.length);

  for (let i = 0; i < calls.length; i++) {
    expect(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i]);
  }
}
