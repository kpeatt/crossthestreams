var crossApp = angular.module('crossApp', []);
 
crossApp.controller(
    'tweetsCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.test = 'test';
            $scope.tweets = 'fail';
            $http.get('../server/sample.json').success(function(data) {
                $scope.tweets = data;
            });
        }
    ]
);