# Contributions

If you would like to help, join the Discord Channel [#club-site-apigroup](https://discord.gg/8pJS4zk)

Basic API specifications are given in [@Carleton-Web-Dev-Club/CWDC-Wiki](https://github.com/Carleton-Web-Dev-Club/CWDC-Wiki/blob/master/api/discussion.adoc)

## Project Structure
```
.
├── README.md
├── .vscode
├── backend    <-- API
├── frontend   <-- React App
├── docs       <-- Documentation Site
├── package-lock.json
└── package.json
```

## Coding Guidelines

### Linting
`frontend` and `backend` use ESLint. 
> ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

We use [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for ESLint. 

Overrides done to base airbnb config:
- `frontend`
  - `react/jsx-filename-extension`: Since this is a react site we should be able to write JSX in in non `.jsx` files


### Commits

To use tooling that will make it easy to generate changelogs and automated release and enforce good standards we use [commitlint](https://commitlint.js.org/#/) that runs as a [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) using [husky](https://typicode.github.io/husky/#/). This allows us standardize commit messages which are human readable and machines can also understand meaning.

Commitlint uses [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/). Since this spec dovetails with [SemVer](https://semver.org) which is also followed for release cycle. 

We use [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) config with some defined scopes and types because we are not using all the type enums for messages. Another custom rule is to allow for long body since base config restricts to 100 characters and that is not enough at times for commit body.

For commit message examples and more details please read docs for [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/) because they go in detail.
