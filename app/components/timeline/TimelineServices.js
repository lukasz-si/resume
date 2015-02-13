/**
 * Created by meep_sitl on 11/02/15.
 */
define([
    'angular',
    'jquery',
    'components/timeline/module',
    'vis',
    'moment'
], function (ng, $, module, vis, moment) {
    'use strict';

    module.factory('TimelineServices', ['$document', '$log', '$window', function ($document, $log, $window) {

        var timeline = null,
            zoom = 10,
            DEFAULT_TIMELINE_OPTIONS = {
                autoResize: true,
                stack: true,
                zoomable: true,
                clickToUse: true,
                align: 'center',
                type: 'point'
            };

        return {
//            convertStringToDate: function (value) {
//                var project = ng.extend({}, value),
//                    dateArray = project.start.split('-');
//
//                if (dateArray.length === 3) {
//                    project.start = new Date(dateArray[0], dateArray[1], dateArray[2]);
//                }
//
//                if (ng.isString(project.end)) {
//                    dateArray = project.end.split('-');
//                    if (dateArray.length === 3) {
//                        project.end = new Date(dateArray[0], dateArray[1], dateArray[2]);
//                    }
//                }
//
//                return project;
//            },
            calculateMonths: function (start, end) {
                var startDate = moment(start),
                    endDate = moment(end),
                    months = -1;

                if (startDate.isValid()) {
                    if (!endDate.isValid()) {
                        endDate = moment();
                    }
                    months = endDate.diff(startDate, 'months');
                }

                return months;
            },
            createTimeline: function (selector, items, groups, options) {

                if (timeline === null) {
                    var opts = ng.extend({}, DEFAULT_TIMELINE_OPTIONS, options);

                    timeline = new vis.Timeline($(selector)[0], items, groups, opts);

                    timeline.on('select', function (properties) {
                        $log.log(properties)
                    });

                } else {
                    this.updateTimeline(items, groups, options);
                }
            },
            updateTimeline: function (items, groups, options) {
                if (timeline === null) {
                    $log.error('Timeline component is not created!');
                } else {
                    if (items) {
                        timeline.setItems(items);
                    }
                    if (groups) {
                        timeline.setGroups(groups);
                    }
                    if (options) {
                        timeline.setOptions(options);
                    }
                }
            }
        };
    }]);

    return module;
});

