define(["angular"], function(ng) { ng.module("templates", []).run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('navigation-template.html',
    "<div id=navigation class=\"navbar navbar-default navbar-fixed-top\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <span class=navbar-brand>Resume</span></div><div class=\"collapse navbar-collapse\" id=bs-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\"><li class=current><a href=#home><span class=\"glyphicon glyphicon-home\" aria-hidden=true></span><br>Home</a></li><li><a href=#timeline><span class=\"glyphicon glyphicon-time\" aria-hidden=true></span><br>Timeline</a></li><li><a href=#projects><span class=\"glyphicon glyphicon-tasks\" aria-hidden=true></span><br>Projects</a></li><li><a href=#contact><span class=\"glyphicon glyphicon-envelope\" aria-hidden=true></span><br>Contact</a></li><li><a href=#links><span class=\"glyphicon glyphicon-link\" aria-hidden=true></span><br>Links</a></li></ul></div></div></div>"
  );


  $templateCache.put('project-template.html',
    "<div class=project><h3>{{project.content}}</h3><h4><a ng-href={{project.website}} target=_blank>{{project.website}}</a></h4><h5>{{project.position}}</h5><div><span>{{project.start}}</span> - <span>{{project.end}}</span></div><div><span>{{project.description}}</span></div></div>"
  );


  $templateCache.put('projects-template.html',
    "<div class=row ng-repeat=\"project in projects\"><div class=\"col-md-6 wow\" ng-class=setAnimationType()><div style=\"height: 40px; width: 40px; background-color: #536273\"></div></div><div class=\"col-md-6 wow\" ng-class=setAnimationType() ui-project-component></div></div>"
  );
 }]); return ng; });