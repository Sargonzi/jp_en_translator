chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
});
