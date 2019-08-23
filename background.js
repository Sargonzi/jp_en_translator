 chrome.runtime.onInstalled.addListener(function() {
       const kLocales = {
    'co.jp': 'Japanese',
    'co.uk': 'English'
     };
    for (let key of Object.keys(kLocales)) {
      chrome.contextMenus.create({
        id: key,
        title: kLocales[key],
        type: 'normal',
        contexts: ['selection'],
      });
    }
  });

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
  var sText = info.selectionText;
    console.log(tab);
};
