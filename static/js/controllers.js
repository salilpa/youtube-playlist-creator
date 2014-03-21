var youtubeApp = angular.module('youtubeApp', []);

youtubeApp.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
var payload = {
    "url": 'http://www.radiomirchi.com/thiruvananthapuram/countdown/malayalam-top-20',
    "settings": {
        "parser": "html5lib",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:19.0) Gecko/20100101 Firefox/19.0",
        }
    },
    "soup_path_for_list": {
        "tag": "div",
        "attr": {
            "class": "mirchi_20_box2"
        }
    },
    "soup_path_for_keyword": {
        "paths": [
            {
                "tag": "span",
                "attr": {
                    "class": "or12"
                }
            },
            {
                "tag": "span",
                "attr": {
                    "class": "moviename"
                }
            },
        ]
    }
}
var url = "http://youtube-playlist-parser.herokuapp.com/"
var keywords = []

youtubeApp.controller('VideoListCtrl', function ($scope, $http) {
    $scope.videos = []

    $http({method: 'POST', url: url, data: payload}).
        success(function (data, status, headers, config) {
            keywords = data.split("|");
            var body = document.getElementsByTagName('body')[0];
            scope = angular.element(body).scope();
            scope.getVideos();
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    $scope.addVideos = function (video) {
        $scope.videos.push(video);
    }

    $scope.getVideos = function () {
        $.each(keywords, function (index, value) {
            var request = gapi.client.youtube.search.list({
                q: value,
                part: 'snippet',
                type: 'video',
                maxResults: 1
            });

            request.execute(function (response) {
                var items = response.result.items;
                var video_id = typeof (items) == "undefined" ? null : items[0].id.videoId
                console.log(video_id)
                var title = typeof (items) == "undefined" ? null : items[0].snippet.title
                var description = typeof (items) == "undefined" ? null : items[0].snippet.description
                var image_url = typeof (items) == "undefined" ? null : items[0].snippet.thumbnails.high.url
                if (video_id != null) {
                    var body = document.getElementsByTagName('body')[0];
                    scope = angular.element(body).scope();
                    scope.$apply(function () {
                        scope.videos.push({
                            id: video_id,
                            title: title,
                            description: description,
                            image: image_url
                        });
                        if (scope.videos.length == 0){
                            player.loadVideoById("bHQqvYy5KYo");
                        }
                    });
                } else {
                    console.log(response)
                }
            });
        });

    };
});