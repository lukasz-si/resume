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

    module.factory('TimelinePromise', ['$q', function ($q) {

        var deferred = $q.defer();

        return {
            getPromise: function () {
                return deferred.promise;
            },
            getDefer: function () {
                return deferred;
            }
        };
    }]);

    module.factory('TimelineServices', ['$document', '$log', function ($document, $log) {

        var timeline = null,
            zoom = 10,
            DEFAULT_TIMELINE_OPTIONS = {
                autoResize: true,
                stack: true,
                zoomable: false,
                clickToUse: false,
                align: 'center',
                type: 'point'
            };

        return {
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
                var opts = ng.extend({}, DEFAULT_TIMELINE_OPTIONS, options);
                timeline = new vis.Timeline($(selector)[0], items, groups, opts);

                return timeline;
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
            },
            /**
             * Move the timeline a given percentage to left or right
             * @param {Number} percentage For example 0.1 (left) or -0.1 (right)
             */
            move: function (percentage) {
                var range = timeline.getWindow();
                var interval = range.end - range.start;
                timeline.setWindow({
                    start: range.start.valueOf() - interval * percentage,
                    end: range.end.valueOf() - interval * percentage
                });
            },
            /**
             * Zoom the timeline a given percentage in or out
             * @param {Number} percentage For example 0.1 (zoom out) or -0.1 (zoom in)
             */
            zoom: function (percentage) {
                var range = timeline.getWindow();
                var interval = range.end - range.start;
                timeline.setWindow({
                    start: range.start.valueOf() - interval * percentage,
                    end: range.end.valueOf() + interval * percentage
                });
            }
        };
    }]);

    return module;
});

