define(["angular"], function(ng) { ng.module("templates", []).run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('letters-template.html',
    "<div ng-controller=LettersController class=letters-container><div class=letters-row ng-repeat=\"row in rows\"><span class=\"letters-cell {{cell.class}}\" ng-class=\"\" ng-repeat=\"cell in row.cells\">{{cell.random}}</span></div></div>"
  );


  $templateCache.put('navigation-template.html',
    "<div id=navigation class=\"navbar navbar-default navbar-fixed-top sticky-nav fixednav\" role=navigation><div class=container><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <span class=navbar-brand>Resume</span></div><div class=\"collapse navbar-collapse\" id=bs-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\"><li class=current><a href=#home><span class=\"fa fa-home\" aria-hidden=true></span><br>Home</a></li><li><a href=#timeline><span class=\"fa fa-clock-o\" aria-hidden=true></span><br>Timeline</a></li><li><a href=#projects><span class=\"fa fa-tasks\" aria-hidden=true></span><br>Projects</a></li><li><a href=#links><span class=\"fa fa-link\" aria-hidden=true></span><br>Links</a></li></ul></div></div></div>"
  );


  $templateCache.put('projects-template.html',
    "<h2>Projects</h2><h4>Filter by:</h4>Company:<div class=\"button-group clearfix\" data-toggle=buttons><label class=\"btn btn-warning active\" ng-click=\"projectFilter.company='all'\"><input type=radio name=options autocomplete=off checked>All</label><label class=\"btn btn-warning\" ng-repeat=\"company in companies\" ng-click=\"projectFilter.company=company.id\"><input type=radio name=options autocomplete=off>{{company.name}}</label></div>Technology:<div class=\"button-group clearfix\" data-toggle=buttons><label class=\"btn btn-primary active\" ng-click=\"projectFilter.technology='all'\"><input type=radio name=options autocomplete=off checked>All</label><label class=\"btn btn-primary\" ng-repeat=\"technology in technologies\" ng-click=\"projectFilter.technology=technology\"><input type=radio name=options autocomplete=off>{{technology}}</label></div><div class=project ng-repeat=\"project in projects | filter:projectFilter.filter | orderBy:'start':true\"><div class=\"row {{getCompany(project.group).className}}\"><div class=\"col-md-3 wow fadeInLeft brand\" ng-bind-html=trustAsHtml(getCompany(project.group).content)></div><div class=\"col-md-5 wow fadeInUp\"><div><h3>{{project.content}}</h3><h4><a ng-href={{project.website}} target=_blank>{{project.website}}</a></h4><h5>{{project.position}}</h5><div><span>{{project.start}}</span> - <span>{{project.end}}</span></div><div><span>{{project.description}}</span></div></div></div><div class=\"col-md-4 wow fadeInRight technologies\"><div class=\"technology wow fadeIn\">{{project.technologies.slice().join(', ')}}</div></div></div></div>"
  );


  $templateCache.put('timeline-template.html',
    "<h2>Timeline</h2><span data-toggle=tooltip data-placement=right title=\"Click on the timeline in order to zoom or move it\"><span class=\"fa fa-info-circle info-sign\"></span></span><div id=timeline-container class=\"wow flipInX\"></div><div class=row><div class=\"project-description col-md-6\" ng-repeat=\"selectedProject in selectedProjects\"><h3>{{getCompany(selectedProject.group).name}}</h3><div>{{selectedProject.content}}</div><div>{{selectedProject.website}}</div><div>{{selectedProject.position}}</div><div>{{selectedProject.start}}{{(selectedProject.end ? ' - ' : '') + selectedProject.end}}</div><div>{{selectedProject.description}}</div><div><div>Technologies:</div><div>{{selectedProject.technologies.slice().join(', ')}}</div></div></div></div>"
  );
 }]); return ng; });