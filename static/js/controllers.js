var youtubeApp = angular.module('youtubeApp', []);

youtubeApp.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var keywords = ["highway to hell", "queen we will rock you", "hamma hamma"]

youtubeApp.controller('VideoListCtrl', function ($scope) {
    $scope.getVideos = function () {
        $.each(keywords, function (index, value) {
            var request = gapi.client.youtube.search.list({
                q: value,
                part:'snippet',
                type:'video',
                maxResults:1
            });

            request.execute(function (response) {
                var items = response.result.items;
                var video_id = typeof (items) == "undefined" ? null : items[0].id.videoId
                var title = typeof (items) == "undefined" ? null : items[0].snippet.title
                var description = typeof (items) == "undefined" ? null : items[0].snippet.description
                var image_url = typeof (items) == "undefined" ? null : items[0].snippet.thumbnails.high.url
                if (video_id != null) {
                    $scope.videos.push(
                        {
                            title:title,
                            id:video_id,
                            description:description,
                            image:image_url
                        }
                    );
                }
            });
        });

    };

    $scope.videos = [
        {'title':'Queen - Bohemian Rhapsody (Official Video)',
            'description':"Subscribe to the Official Queen Channel Here http://bit.ly/Subscribe2Queen Queen - 'Bohemian Rhapsody' The official 'Bohemian Rhapsody' music video.",
            'image':'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
            'id':'fJ9rUzIMcZQ'
        },
        {'title':'Metallica - Nothing Else Matters [Official Music Video]',
            'description':'SONG FACTS: Singer and rhythm guitarist \"James Hetfield\" wrote this song while he was on the phone with his girlfriend at this time. Since he held the phone ...',
            'image':'https://i.ytimg.com/vi/Tj75Arhq5ho/hqdefault.jpg',
            'id':'Tj75Arhq5ho'
        }
    ];
});