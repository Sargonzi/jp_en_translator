let langJP = document.getElementById('fromText');
let langEN = document.getElementById('toText');
let sourceLanguage = "ja";
let targetLanguage = "en";

const apiKey = "AIzaSyDmWyrzg-HnoTrrOufODeBdSYTGKmqA5Js";
let base_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";
let audio_url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=";

// reset contents
document.getElementById('reset').addEventListener('click', () => {
    console.log("Reset button is clicked");
    langJP.value = "";
    langEN.value = "";
});

//make apiRequest
const makeApiRequest = (data, method) => {
    let url = base_url + sourceLanguage + "&tl=" + targetLanguage + "&dt=t&q=" + encodeURI(data);
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onprogress = (e) => {

    }
    xhr.onload = (response) => {
        if (xhr.status == 200) {
            console.log(response);

            translatedText = response[0][0][0];

            var json = {
                'sourceText': sourceText,
                'translatedText': translatedText
            };
            langEN.value = JSON.stringify(json);
        }
    }

    xhr.onerror = (error) => {

    }

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

document.getElementById('btnAudioJa').addEventListener('click', () => {
    if (langJP.value != "") {
        makeAudioRequest(langJP.value)
    } else {
        alert("message empty");
    }
});

document.getElementById('translate').addEventListener('click', () => {
    if (langJP.value != "") {
        makeApiRequest(langJP.value, "GET")
    } else {
        alert("message empty");
    }

});

