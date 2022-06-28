<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# lokalise-sync
Upload translation files to lokalise.com
- Adds new keys translation keys
- Add translations from files if it does not exist on lokalise
- Does not remove keys on lokalise

## Setup
- project: You will need a project setup in lokalise.
- languages: Lokalise project should have all languages added for which you want to upload files.
- Api token: Generate api token. The token can be generated under your Personal profile - [API Tokens](https://app.lokalise.com/profile#apitokens). A user must have an Admin role in the project in order to access the project with the supplied token. 
## Inputs
- `api-token`
Lokalise Api token
- `project-id`
Lokalise project id
- `dir-path`
translation file dir from project root

## Outputs
- `uploaded-files`
A list if files successfully uploaded.

## Contributing
Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws on invalid api token (3ms)
  ✓ throw on files not found (504ms)
  ✓ files uploaded (504ms)

...
```
## Example usage

```yaml
uses: actions/updaate-lokalise@v1.0
with:
  api-token: 'verysecretapitokenigotfromlokalise'
  project-id: 'project-id'
  dir-path: 'i18n'
```

## create new release
## Publish to a distribution branch
Then run build and push the new release:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```
## tag and push
git commit -m "added new feature"
git tag -a -m "new feature release" v*.*
git push --follow-tags
