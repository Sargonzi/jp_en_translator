let fromText = document.getElementById('fromText');
let toText = document.getElementById('toText');
let sourceLanguage = "ja";
let targetLanguage = "en";

let base_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";
let audio_url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=";

// reset contents
document.getElementById('reset').addEventListener('click', () => {
    console.log("Reset button is clicked");
    fromText.value = "";
    toText.value = "";
});

//make apiRequest
const makeApiRequest = (data, method) => {
    let url = base_url + sourceLanguage + "&tl=" + targetLanguage + "&dt=t&q=" + encodeURI(data);
 fetch(url)
.then(response => response.json())
.then(data => {
  let taranlatedText = "";
  data[0].forEach(data => {
    taranlatedText += data[0];
  });
  toText.value = taranlatedText;
})
.catch(error => console.error(error))
}

//make audio request
const makeAudioRequest = (data) => {
    let url = audio_url + data + "&tl=" + sourceLanguage + "&client=tw-ob";
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        var context = new AudioContext();

        var source = context.createBufferSource();
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            context.decodeAudioData(request.response, function (buffer) {
                source.buffer = buffer;
            }, null);
        }
        request.send();
        source.connect(context.destination);
        source.start(0);
    }
    catch (e) {
        alert("Web Audio API not supported");
    }
}

let typingTimer;               
let doneTypingInterval = 1000; 
let myInput = document.getElementById('fromText');

myInput.addEventListener('keyup', () => {
    if(fromText.value != "") {
    toText.placeholder = "Translating....";
    } else {
        toText.placeholder = "Translate";
    }
    clearTimeout(typingTimer);
    if (myInput.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});


function doneTyping () {
    makeApiRequest(fromText.value, "GET")
}