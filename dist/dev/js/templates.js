define(["angular"], function(ng) { ng.module("templates", []).run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('background-template.html',
    "<div class=background-code ng-controller=BackgroundController><div class=js-code><pre class=sunlight-highlight-javascript>\r" +
    "\n" +
    "{{javascript}}\r" +
    "\n" +
    "        </pre></div><div class=html-code><pre class=sunlight-highlight-xml>\r" +
    "\n" +
    "{{html}}\r" +
    "\n" +
    "        </pre></div><div class=css-code><pre class=sunlight-highlight-css>\r" +
    "\n" +
    "{{css}}\r" +
    "\n" +
    "        </pre></div></div>"
  );


  $templateCache.put('letters-template.html',
    "<div ng-controller=LettersController class=\"letters-container hidden-xs\"><div class=letters-row ng-repeat=\"row in rows\"><span class=\"letters-cell {{cell.class}}\" ng-class=\"\" ng-repeat=\"cell in row.cells\">{{cell.random}}</span></div></div>"
  );


  $templateCache.put('navigation-template.html',
    "<div id=navigation class=\"navbar navbar-default navbar-fixed-top sticky-nav fixednav\" role=navigation><div class=container><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <span class=navbar-brand>Lukasz Sitnik</span></div><div class=\"collapse navbar-collapse\" id=bs-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\"><li class=current><a href=#home><span class=\"fa fa-home\" aria-hidden=true></span><br>Home</a></li><li><a href=#timeline><span class=\"fa fa-clock-o\" aria-hidden=true></span><br>Timeline</a></li><li><a href=#projects><span class=\"fa fa-tasks\" aria-hidden=true></span><br>Projects</a></li><li><a href=#skills><span class=\"fa fa-link\" aria-hidden=true></span><br>Skills</a></li><li><a href=#links><span class=\"fa fa-link\" aria-hidden=true></span><br>Links</a></li></ul></div></div></div>"
  );


  $templateCache.put('projects-template.html',
    "<div ng-controller=ProjectController><h1>Projects</h1><br><div class=well><div class=row><div class=col-sm-4><p class=bold>Filter by company</p><div class=\"button-group clearfix\" data-toggle=buttons><label class=\"btn btn-default active\" ng-click=\"projectFilter.company='all'\"><input type=radio name=options autocomplete=off checked>All</label><label class=\"btn btn-default\" ng-repeat=\"company in companies\" ng-click=\"projectFilter.company=company.id\"><input type=radio name=options autocomplete=off>{{company.name}}</label></div></div><div class=col-sm-8><p class=bold>Filter by language / technology</p><div class=\"button-group clearfix\" data-toggle=buttons><label class=\"btn btn-default active\" ng-click=\"projectFilter.technology='all'\"><input type=radio name=options autocomplete=off checked>All</label><label class=\"btn btn-default\" ng-repeat=\"technology in technologies\" ng-click=\"projectFilter.technology=technology\"><input type=radio name=options autocomplete=off>{{technology}}</label></div></div></div></div><br><div class=\"row wow fadeIn\" data-wow-delay=0.3s><div class=\"col-sm-10 col-sm-offset-1\"><div class=project ng-repeat=\"project in projects | filter:projectFilter.filter | orderBy:'start':true as results\"><div class=\"row {{getCompany(project.group).className}}\"><div class=\"col-md-3 company\" ng-bind-html=trustAsHtml(getCompany(project.group).content)></div><div class=col-md-5><div><div class=name>{{project.content}}</div><div class=website><a ng-href={{project.website}} target=_blank>{{project.website}}</a></div><div class=position>{{project.position}}</div><div class=date>{{project.start}} - {{project.end}}</div><div class=description>{{project.description}}</div></div></div><div class=\"col-md-4 technologies\">{{project.technologies.slice().join(', ')}}</div></div></div><div class=project ng-if=\"results.length == 0\"><span>No results found...</span></div></div></div></div>"
  );


  $templateCache.put('skill-template.html',
    "<div ng-controller=SkillController><h1>Skills</h1><br><div class=row><div class=\"col-sm-10 col-sm-offset-1\"><div class=row><div class=\"col-sm-3 wow fadeIn\" ng-repeat=\"skill in skills | orderBy:'level':true\" data-wow-delay=\"{{$index * 0.1}}s\"><div class=skill-wrapper><div>{{skill.name}}</div><input class=skill value={{skill.level}} data-fgcolor={{getColor(skill.level)}}></div></div></div></div></div></div>"
  );


  $templateCache.put('timeline-template.html',
    "<div ng-controller=TimelineController><h1>Timeline</h1><br><div class=\"navigation-buttons wow fadeIn\" data-wow-delay=0.3s data-wow-duration=1s><button class=\"btn btn-default zoomIn\" ng-click=zoomIn()><span class=\"fa fa-plus-square\"></span> Zoom In</button> <button class=\"btn btn-default zoomOut\" ng-click=zoomOut()><span class=\"fa fa-minus-square\"></span> Zoom Out</button> <button class=\"btn btn-default moveLeft\" ng-click=moveLeft()><span class=\"fa fa-chevron-left\"></span> Move Left</button> <button class=\"btn btn-default moveRight\" ng-click=moveRight()>Move Right <span class=\"fa fa-chevron-right\"></span></button></div><div id=timeline-container class=\"wow fadeIn\" data-wow-delay=0.3s data-wow-duration=1s></div><div class=row><div class=\"col-md-10 col-md-offset-1\"><div class=project ng-repeat=\"selectedProject in selectedProjects track by $index\"><div class=company>{{getCompany(selectedProject.group).name}}</div><div class=name>{{selectedProject.contentParsed}}</div><div class=website><a ng-href={{selectedProject.website}} target=_blank>{{selectedProject.website}}</a></div><div class=position>{{selectedProject.position}}</div><div class=date>{{selectedProject.start}}{{(selectedProject.end ? ' - ' : '') + selectedProject.end}}{{selectedProject.months}}</div><div class=description>{{selectedProject.description}}</div><div>Technologies:</div><div class=technologies>{{selectedProject.technologies.slice().join(', ')}}</div></div></div></div></div>"
  );
 }]); return ng; });