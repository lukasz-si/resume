define(["angular"], function(ng) { ng.module("templates", []).run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('letters-template.html',
    "<div ng-controller=LettersController class=letters-container><div class=letters-row ng-repeat=\"row in rows\"><span class=\"letters-cell {{cell.class}}\" ng-class=\"\" ng-repeat=\"cell in row.cells\">{{cell.random}}</span></div></div>"
  );


  $templateCache.put('navigation-template.html',
    "<div id=navigation class=\"navbar navbar-default navbar-fixed-top sticky-nav fixednav\" role=navigation><div class=container><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <span class=navbar-brand>Resume</span></div><div class=\"collapse navbar-collapse\" id=bs-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\"><li class=current><a href=#home><span class=\"glyphicon glyphicon-home\" aria-hidden=true></span><br>Home</a></li><li><a href=#timeline><span class=\"glyphicon glyphicon-time\" aria-hidden=true></span><br>Timeline</a></li><li><a href=#projects><span class=\"glyphicon glyphicon-tasks\" aria-hidden=true></span><br>Projects</a></li><li><a href=#contact><span class=\"glyphicon glyphicon-envelope\" aria-hidden=true></span><br>Contact</a></li><li><a href=#links><span class=\"glyphicon glyphicon-link\" aria-hidden=true></span><br>Links</a></li></ul></div></div></div>"
  );


  $templateCache.put('project-template.html',
    "<div><h3>{{project.content}}</h3><h4><a ng-href={{project.website}} target=_blank>{{project.website}}</a></h4><h5>{{project.position}}</h5><div><span>{{project.start}}</span> - <span>{{project.end}}</span></div><div><span>{{project.description}}</span></div></div>"
  );


  $templateCache.put('projects-template.html',
    "<h3>Filter projects by:</h3>Company:<div class=\"button-group clearfix\" data-toggle=buttons><label class=\"btn btn-warning active\" ng-click=\"selectedCompany={$:1}\"><input type=radio name=options id=project-filter-technology autocomplete=off checked>All</label><label class=\"btn btn-warning\" ng-repeat=\"company in companies\" ng-click=\"selectedCompany.group=company.id\"><input type=radio name=options id=project-filter-technology autocomplete=off>{{company.name}}</label></div>Technology:<div class=\"button-group clearfix\" data-toggle=buttons><label class=\"btn btn-primary active\" ng-click=\"selectedTechnology.search='all'\"><input type=radio name=options id=project-filter-technology autocomplete=off checked>All</label><label class=\"btn btn-primary\" ng-repeat=\"technology in technologies\" ng-click=\"selectedTechnology.search=technology.id\"><input type=radio name=options id=project-filter-technology autocomplete=off>{{technology.name}}</label></div><div class=project ng-repeat=\"project in projects | filter:selectedTechnology.compareTechnologies | filter:selectedCompany\"><div class=\"row {{companies[project.group-1].className}}\"><div class=\"col-md-3 wow fadeInLeft brand\" ng-bind-html=trustAsHtml(companies[project.group-1].content)></div><div class=\"col-md-5 wow fadeInUp\" ui-project-component></div><div class=\"col-md-4 wow fadeInRight technologies\" ui-technologies-component></div></div></div>"
  );


  $templateCache.put('technologies-template.html',
    "<span class=technology ng-repeat=\"technology in project.technologies\"><span class=\"wow {{technologies[technology-1].animation ? technologies[technology-1].animation : 'fadeIn'}} {{technologies[technology-1].style}}\">{{technologies[technology-1].name}}</span></span>"
  );
 }]); return ng; });