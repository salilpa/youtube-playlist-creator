// Define some variables used to remember state.
var playlistId, channelId;

// After the API loads, call a function to enable the playlist creation form.
function handleAPILoaded() {
    getPlaylist(5)
}


function getPlaylist(numberOfResults){
    var request = gapi.client.youtube.playlists.list({
        part: 'snippet',
        maxResults: numberOfResults,
        mine: true
    });
    request.execute(function (response) {
        var result = response.result;
        if (result) {
            $.each(result.items, function( index, value ) {
                $( "#playlist-container" ).append( "<div><p>" + value.id + "," + value.snippet.title + "," + value.snippet.description + "</p></div>" );
                console.log(value);
            });
        } else {
            $('#status').html('Could not get playlists');
        }
    });
}
// Create a private playlist.
function createPlaylist() {
    var request = gapi.client.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
            snippet: {
                title: 'gaana top 10',
                description: 'top 20 malayalam songs'
            },
            status: {
                privacyStatus: 'private'
            }
        }
    });
    request.execute(function (response) {
        var result = response.result;
        if (result) {
            playlistId = result.id;
            $('#playlist-id').val(playlistId);
            $('#playlist-title').html(result.snippet.title);
            $('#playlist-description').html(result.snippet.description);
        } else {
            $('#status').html('Could not create playlist');
        }
    });
}


// Add a video ID specified in the form to the playlist.
function addVideoToPlaylist() {
    addToPlaylist($('#video-id').val());
}

// Add a video to a playlist. The "startPos" and "endPos" values let you
// start and stop the video at specific times when the video is played as
// part of the playlist. However, these values are not set in this example.
function addToPlaylist(id, startPos, endPos) {
    var details = {
        videoId: id,
        kind: 'youtube#video'
    }
    if (startPos != undefined) {
        details['startAt'] = startPos;
    }
    if (endPos != undefined) {
        details['endAt'] = endPos;
    }
    var request = gapi.client.youtube.playlistItems.insert({
        part: 'snippet',
        resource: {
            snippet: {
                playlistId: playlistId,
                resourceId: details
            }
        }
    });
    request.execute(function (response) {
        $('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
    });
}

function search(query) {
    var request = gapi.client.youtube.search.list({
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 1
    });

    request.execute(function(response) {
        var items = response.result.items;
        var video_id = typeof (items) == "undefined" ? null : items[0].id.videoId
        if (video_id != null){
            addToPlaylist(video_id);
        }
    });
}

function keyWordListToPlaylist(keywordList){
    $.each(keywordList, function( index, value ) {
        search(value);
    });
}