var youtubeApp = angular.module('youtubeApp', []);

youtubeApp.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

youtubeApp.controller('VideoListCtrl', function ($scope) {
    $scope.$on('$viewContentLoaded', function() {
        $scope.videos.push([
            {'title':'Queen - Bohemian Rhapsody (Official Video)',
                'description':"Subscribe to the Official Queen Channel Here http://bit.ly/Subscribe2Queen Queen - 'Bohemian Rhapsody' The official 'Bohemian Rhapsody' music video.",
                'image': 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
                'id': 'fJ9rUzIMcZQ'
            }
        ]);
        console.log("been here")
    });
    $scope.videos = [
        {'title':'Queen - Bohemian Rhapsody (Official Video)',
            'description':"Subscribe to the Official Queen Channel Here http://bit.ly/Subscribe2Queen Queen - 'Bohemian Rhapsody' The official 'Bohemian Rhapsody' music video.",
            'image': 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
            'id': 'fJ9rUzIMcZQ'
        },
        {'title':'Metallica - Nothing Else Matters [Official Music Video]',
            'description':'SONG FACTS: Singer and rhythm guitarist \"James Hetfield\" wrote this song while he was on the phone with his girlfriend at this time. Since he held the phone ...',
            'image': 'https://i.ytimg.com/vi/Tj75Arhq5ho/hqdefault.jpg',
            'id': 'Tj75Arhq5ho'
        }
    ];
});