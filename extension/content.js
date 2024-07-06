chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'sendWebsiteActivity') {
        sendWebsiteActivity();
    }
});

function sendWebsiteActivity() {
    const website = window.location.href; // Current website URL
    const timeSpent = Math.floor(performance.now()); // Time spent on the current page (in milliseconds)

    chrome.runtime.sendMessage({
        action: 'recordActivity',
        website: website,
        timeSpent: timeSpent
    });
}
