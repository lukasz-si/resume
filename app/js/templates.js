define(["angular"], function(ng) { ng.module("templates", []).run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('navigation-template.html',
    "<div id=navigation class=\"navbar navbar-default navbar-fixed-top\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <span class=navbar-brand>Resume</span></div><div class=\"collapse navbar-collapse\" id=bs-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\"><li class=current><a href=#home><span class=\"glyphicon glyphicon-home\" aria-hidden=true></span><br>Home</a></li><li><a href=#timeline><span class=\"glyphicon glyphicon-time\" aria-hidden=true></span><br>Timeline</a></li><li><a href=#projects><span class=\"glyphicon glyphicon-tasks\" aria-hidden=true></span><br>Projects</a></li><li><a href=#contact><span class=\"glyphicon glyphicon-envelope\" aria-hidden=true></span><br>Contact</a></li><li><a href=#links><span class=\"glyphicon glyphicon-link\" aria-hidden=true></span><br>Links</a></li></ul></div></div></div>"
  );


  $templateCache.put('project-template.html',
    "<div><h3>{{project.content}}</h3><h4><a ng-href={{project.website}} target=_blank>{{project.website}}</a></h4><h5>{{project.position}}</h5><div><span>{{project.start}}</span> - <span>{{project.end}}</span></div><div><span>{{project.description}}</span></div></div>"
  );


  $templateCache.put('projects-template.html',
    "<h3>Filter projects by:</h3>Company: <button ng-click=\"selectedCompany={$:1}\">All</button><div ng-repeat=\"company in companies\"><button ng-click=\"selectedCompany.group=company.id\">{{company.name}}</button></div>Technology: <button ng-click=\"selectedTechnology={$:1}\">All</button><div ng-repeat=\"technology in technologies\"><button ng-click=\"selectedTechnology.technologies=[technology.id]\">{{technology.name}}</button></div><div class=project ng-repeat=\"project in projects | filter:selectedCompany | filter:selectedTechnology:compareTechnologies\"><div class=\"row {{companies[project.group-1].className}}\"><div class=\"col-md-3 wow fadeInLeft brand\" ng-bind-html=trustAsHtml(companies[project.group-1].content)></div><div class=\"col-md-5 wow fadeInUp\" ui-project-component></div><div class=\"col-md-4 wow fadeInRight technologies\" ui-technologies-component></div></div></div>"
  );


  $templateCache.put('technologies-template.html',
    "<span class=technology ng-repeat=\"technology in project.technologies\"><span class=\"wow {{technologies[technology].animation ? technologies[technology].animation : 'fadeIn'}} {{technologies[technology].style}}\">{{technologies[technology].name}}</span></span>"
  );
 }]); return ng; });