var connection = new RTCMultiConnection();

// or a free signaling server
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.session = {
    audio: true,
    video: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

var localVideosContainer = document.getElementById('local-videos-container');
var remoteVideosContainer = document.getElementById('remote-videos-container');

connection.onstream = function (event) {
    var video = event.mediaElement;

    if (event.type === 'local') {
        localVideosContainer.appendChild(video);
    }

    if (event.type === 'remote') {
        remoteVideosContainer.appendChild(video);
    }
}

var roomid = document.getElementById('txt-roomid');

roomid.value = connection.token();

document.getElementById('btnStartVideoConferency').onclick = function () {
    this.disabled = true;
    connection.openOrJoin(roomid.value || 'predefinida-roomid');
};
