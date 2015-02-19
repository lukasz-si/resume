define([
    'angular',
    'components/introduction/module',
    'components/introduction/Service'
], function (ng, module) {
    'use strict';

    var imageList = ['keyboard.jpg', 'keyboard2.jpg', 'www.jpg', 'www2.jpg'];

    module.controller('IntroductionController', ['$scope', '$http', '$log', '$sce',
        function ($scope, $http, $log, $sce) {

            var index = (Math.floor((Math.random() * 100)) % imageList.length),
                name = imageList[index];
            $log.log(name + ' : ' + index)

            $scope.imageName = name;
        }
    ]);

    module.controller('LettersController', ['$scope', '$http', '$log', 'LettersService',
        function ($scope, $http, $log, LettersService) {
            $http.get('data/letters.json', {cache: true})
                .success(function (data) {

                    $scope.rows = LettersService.generateRandomLetters(data);
                    LettersService.setInterval($scope.rows);
                });

            $scope.rows = [];
        }
    ]);

    return module;

});

