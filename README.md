# Resume template

[See demo](http://lukasz-si.github.io/resume/)

# Getting Started

In order to use the template just clone/fork this git repository. Install `node.js` with `npm`.

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

In order to update `dist/dev/` automatically, run this command:
```
$ grunt watch
```


## Dependencies

No additional dependencies are necessary, `npm` and `bower` download everything.


## What data should be updated

`app/index.html`<br>
"HOME" and "LINKS" sections. First name and last name in the footer.

`app/data/work.json`<br>
work experience: companies/projects. Skills section uses [Font-Awesome](http://fortawesome.github.io/Font-Awesome/icons/) css classes.

`app/components/project/ProjectController.js`<br>
List of technologies which are displayed in the "Filter by language / technology".

`app/data/letters.json`<br>
what characters should be displayed on the top of the page

`app/data/background.html`, `app/data/background.js`, `app/data/background.scss`<br>
source code what should be shown in the background

`app/components/navigation/navigation-template.html`<br>
first name and last name

`bower.json`<br>
Before new changes are released, the version of the application should be increased. This is necessary due to browser data caching.
