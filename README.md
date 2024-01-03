# create-project

# NPX Create

https://blog.shahednasser.com/how-to-create-a-npx-tool/

https://petermekhaeil.com/how-to-build-an-npx-starter-template/

https://bonsaiilabs.com/create-npx-starter-command/

https://www.youtube.com/watch?v=UxdSoefSxrA

https://www.npmjs.com/package/@wordpress/create-block

## Test locally

```
npm i -g
cd path/to/new/project
npx create-project
```

## Publish

in create-project:

```
npm login
npm publish --access=public

cd path/to/another/new/project
npx @socketd/create-project
```

## Update package

```
npm version <type (patch|minor|major)>
npm publish
```
