define([
    'angular',
    'components/introduction/module'
], function (ng, module) {
    'use strict';

    var imageList = ['keyboard.jpg', 'keyboard2.jpg', 'www.jpg', 'www2.jpg'];

    module.controller('IntroductionController', ['$scope', '$http', '$log', '$sce',
        function ($scope, $http, $log, $sce) {

            var index = (Math.floor((Math.random() * 100)) % imageList.length),
                name = imageList[index];
            $log.log(name +  ' : ' + index)

            $scope.imageName = name;
        }
    ]);

    return module;
})
;

