var crossApp = angular.module('crossApp', []);
 
crossApp.controller(
    'tweetsCtrl', ['$scope', '$http',
        function($scope, $http) {
            window.MY_SCOPE = $scope; // For debugging scope
            $scope.tweets = {};

            $scope.answers = {};

            $http.get('../server/sample.json').success(function(data) {
                $scope.tweets = data;
                $scope.words = [];
                $scope.clues = [];

                for (var i in $scope.tweets) {
                    var tweet = $scope.tweets[i];
                    var text = tweet['text'];
                    var splitText = [];
                    var answer = tweet['answer'];
                    var splitAnswer = tweet['splitAnswer'];

                    splitText = text.split('$$$ANSWER$$$');
                    splitAnswer = answer.split('');

                    tweet['text'] = splitText;
                    tweet['splitAnswer'] = splitAnswer;

                    chars = splitAnswer.map(function() {
                        return '';
                    })

                    $scope.answers[i] = {
                        'user': chars,
                        'correct': splitAnswer
                    }

                    $scope.words.push(answer);

                    $scope.clues.push(tweet['text'].join('ANSWER'));
                }
            });
        }
    ]
);