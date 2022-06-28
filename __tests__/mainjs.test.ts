"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const globals_1 = require("@jest/globals");
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
        if (!fs_1.default.existsSync(filePath)) {
            fs_1.default.mkdirSync(filePath);
        }
    });
    beforeEach(() => {
        for (const key in testEnvVars) {
            process.env[key] = testEnvVars[key];
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
function assertWriteCalls(calls) {
    (0, globals_1.expect)(process.stdout.write).toHaveBeenCalledTimes(calls.length);
    for (let i = 0; i < calls.length; i++) {
        (0, globals_1.expect)(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i]);
    }
}
