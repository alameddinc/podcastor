/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* global TimelineDataSeries, TimelineGraphView */

'use strict';
const audio = document.getElementById('callPoint');
const username = document.getElementById("username")
const toUsername = document.querySelector('input#toUsername');
const connectButton = document.querySelector('button#saveButton');
const callButton = document.querySelector('button#callButton');
const hangupButton = document.querySelector('button#hangupButton');
hangupButton.disabled = true;
callButton.onclick = call;
var peer = new Peer({
    config: {'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
        ]} /* Sample servers, please use appropriate ones */
});
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    document.getElementById("username").value = id
});
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function (call) {
    getUserMedia({video: false, audio: true}, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream) {
            document.querySelector( 'video' ).srcObject = remoteStream;
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });
});


function call() {
    callButton.disabled = true;
    console.log('Starting call');
    var peer = new Peer();
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video: false, audio: true}, function (stream) {
        var call = peer.call(toUsername.value, stream);
        call.on('stream', function (remoteStream) {
            document.querySelector( 'video' ).srcObject = remoteStream;
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });
}