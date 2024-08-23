console = chrome.extension.getBackgroundPage().console;

let zoomIndex = 16 // default to 100%

const zoomLevels = [0.25,0.30,0.36,0.41,0.46,0.51,0.57,0.62,0.67,0.72,0.78,0.83,0.88,0.94,0.97,1.00,1.08,1.15,1.20,1.25,1.31,1.36,1.41,1.46,1.52,1.57,1.62,1.68,1.73,1.78,1.83,1.89,1.94,1.99,2.04,2.10,2.15,2.20,2.26,2.31,2.36,2.41,2.47,2.52,2.57,2.62,2.68,2.73,2.78,2.84,2.89,2.94,2.99,3.05,3.10,3.15,3.21,3.26,3.31,3.36,3.42,3.47,3.52,3.58,3.63,3.68,3.73,3.79,3.84,3.89,3.94,4.00,4.05,4.10,4.16,4.21,4.26,4.31,4.37,4.42,4.47,4.53,4.58,4.63,4.68,4.74,4.79,4.84,4.89,4.95,5.00]

const maxZoomIndex = zoomLevels.length - 1 // max index of zoom levels

// get current zoom level of the tab and set the index, if not in zoom levels set to 100%
chrome.tabs.getZoom((currentZoom) => zoomIndex = zoomLevels.indexOf(currentZoom) || 1)

// listen for the message from the content script
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.zoomIn) {
            const newZoomIndex = zoomIndex + 1;
            // increase zoom index, but not above max
            zoomIndex = newZoomIndex > maxZoomIndex ? zoomIndex : newZoomIndex
        } else {
            const newZoomIndex = zoomIndex - 1;
            // increase zoom index, but not below minimum
            zoomIndex = newZoomIndex >= 0 ? newZoomIndex : zoomIndex
        }
        // set tab zoom level
        console.log('foo');
        chrome.tabs.setZoom(zoomLevels[zoomIndex])
    });