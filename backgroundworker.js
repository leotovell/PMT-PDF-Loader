function parseUrl(url){
    originalUrl = url

    console.log(url)

    // remove first part
    index1 = url.search("=")
    url = url.substr(index1+1)

    console.log(url)

    while(url.search("%2F") != -1){
        index = url.search("%2F")
        url = url.substr(0, index) + "/" + url.substr(index+3)
    }

    while(url.search("%3A") != -1){
        index = url.search("%3A")
        url = url.substr(0, index) + ":" + url.substr(index+3)
    }

    while(url.search("%2520") != -1){
        index = url.search("%2520")
        url = url.substr(0, index) + " " + url.substr(index+5)
    }

    return url

}

// Check tabs.

function redirectAllTabs(){
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            if(tab.url.includes("pdf-pages")){
                newURL = parseUrl(tab.url)
                console.log(newURL)
                chrome.tabs.update(tab.id, { url: newURL })
            }
        });
    })
}

// Register event listeners

chrome.tabs.onUpdated.addListener(redirectAllTabs);