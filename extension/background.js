let currentTabId = null;
let currentTabStartTime = null;
const tabTimes = {};
const tabUrls = {};

chrome.tabs.onActivated.addListener(activeInfo => {
    handleTabChange(activeInfo.tabId);
    updateTabUrl(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === 'complete') {
        handleTabChange(tabId);
        updateTabUrl(tabId);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    handleTabChange(null); 
    delete tabTimes[tabId];
    delete tabUrls[tabId];
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        
        handleTabChange(null);
    } else {
        // User has returned to the browser, start tracking the active tab again
        chrome.tabs.query({ active: true, windowId: windowId }, tabs => {
            if (tabs.length > 0) {
                handleTabChange(tabs[0].id);
                updateTabUrl(tabs[0].id);
            }
        });
    }
});

function handleTabChange(newTabId) {
    const currentTime = Date.now();
    
    if (currentTabId !== null && currentTabStartTime !== null) {
        const timeSpent = (currentTime - currentTabStartTime) / 1000; 
        if (!tabTimes[currentTabId]) {
            tabTimes[currentTabId] = 0;
        }
        tabTimes[currentTabId] += timeSpent;
    }
    
    currentTabId = newTabId;
    currentTabStartTime = currentTime;
}

function updateTabUrl(tabId) {
    chrome.tabs.get(tabId, (tab) => {
        if (tab) {
            tabUrls[tabId] = tab.url;
        }
    });
}

function sendTabTimes() {
    chrome.storage.local.get('token', (result) => {
        const token = result.token;
        
        if (!token ) {
            console.error('User token not found');
            return; 
        }

        const payload = Object.keys(tabTimes).map(tabId => ({
            website: tabUrls[tabId], 
            timeSpent: tabTimes[tabId]
        }));

        console.log(payload);

        fetch('http://localhost:5172/api/activities/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data successfully sent:', data);
            
            Object.keys(tabTimes).forEach(tabId => delete tabTimes[tabId]);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    });
}


setInterval(sendTabTimes, 60000);

chrome.runtime.onInstalled.addListener(() => {
    Object.keys(tabTimes).forEach(tabId => delete tabTimes[tabId]);
});
