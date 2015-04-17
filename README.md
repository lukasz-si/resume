# Resume skeleton

[See demo](http://lukasz-si.github.io/resume/)

# Getting Started

In order to use the skeleton just clone/fork this git repository.

Run the following commands in the main folder:
```
$ npm install
```
```
$ bower install
```

In order to compile changes which were made in the `app/` folder run this command:
```
$ grunt dev
```
or
```
$ grunt prod
```

`dist/` folder contains compiled files accordingly `dist/dev/` and `dist/prod/`.

In order to update `dist/dev/` automatically run this command:
```
$ grunt watch
```


## Dependencies

No external dependencies are necessary, `npm` and `bower` download everything.


## What data should be updated

`app/index.html`
`app/data/work.json` work experience: companies/projects as well as skills
`app/data/letters.json` what characters should be displayed on top of the page
`app/data/background.html`, `app/data/background.js`, `app/data/background.scss` source code what should be shown in the background
