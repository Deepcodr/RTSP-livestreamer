//Constants
var SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
var STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
var session;
var stream;
  
window.onload = ()=>{
    init_api();
}
//Init Flashphoner API on page load
function init_api() {
    Flashphoner.init({});
    publishBtn.onclick = connect;
    playBtn.onclick = playStream;
    stopBtn.onclick = stopPublish;
}
  
//Connect to WCS server over websockets
function connect() {
    session = Flashphoner.createSession({
        urlServer: "wss://demo.flashphoner.com"
    }).on(SESSION_STATUS.ESTABLISHED, function(session) {
        publishStream(session);
    });
}
  
//Publish stream
function publishStream(session) {
    stream = session.createStream({
        name: "stream",
        display: document.getElementById("publish"),
    });
    stream.publish();
}
  
//Playing stream
function playStream() {
    session.createStream({
        name: "stream",
        display: document.getElementById("play"),
    }).play();
}
 
//Stopping stream
function stopPublish() {
    stream.stop();
}

export default init_api;
// export default stopPublish;