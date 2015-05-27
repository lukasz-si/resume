define([
    'angular',
    'components/navigation/module',
    'jquery'
], function (ng, module, $) {
    'use strict';

    module.controller('NavigationController', ['$scope', '$window', '$timeout',
        function ($scope, $window, $timeout) {

            $scope.printResume = function () {
                var footerPosition = $('#footer').offset().top,
                    printDialogShown = false;

                $('body,html').stop(false, false).animate(
                    {
                        scrollTop: footerPosition
                    },
                    {
                        duration: 500,
                        complete: function () {
                            $('body,html').stop(false, false).animate(
                                {
                                    scrollTop: 0
                                },
                                {
                                    duration: 200,
                                    complete: function () {
                                        if (!printDialogShown) {
                                            printDialogShown = true;
                                            $timeout(function () {
                                                $window.print();
                                            }, 200);
                                        }
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    ]);

    return module;
});

