define(["angular"], function(ng) { ng.module("templates", []).run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('project-template.html',
    "<div class=project ng-repeat=\"project in projects\"><h3>{{project.content}}</h3><h4><a ng-href={{project.website}} target=_blank>{{project.website}}</a></h4><h5>{{project.position}}</h5><div><span>{{project.start}}</span> - <span>{{project.endd}}</span> ({{project.months}}) month(s)</div><div><span>{{project.description}}</span></div></div>"
  );
 }]); return ng; });