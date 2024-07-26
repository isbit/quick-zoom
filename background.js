let zoomIndex = 16 // default to 100%

const zoomLevels = [0.25, 0.3028, 0.3556, 0.4083, 0.4611, 0.5139, 0.5667, 0.6194, 0.6722, 0.725, 0.7778, 0.8306, 0.8833, 0.9361, 0.9689, 1, 1.0844, 1.1472, 1.2, 1.2528, 1.3056, 1.3583, 1.4111, 1.4639, 1.5167, 1.5694, 1.6222, 1.675, 1.7278, 1.7806, 1.8333, 1.8861, 1.9389, 1.9917, 2.0444, 2.0972, 2.15, 2.2028, 2.2556, 2.3083, 2.3611, 2.4139, 2.4667, 2.5194, 2.5722, 2.625, 2.6778, 2.7306, 2.7833, 2.8361, 2.8889, 2.9417, 2.9944, 3.0472, 3.1, 3.1528, 3.2056, 3.2583, 3.3111, 3.3639, 3.4167, 3.4694, 3.5222, 3.575, 3.6278, 3.6806, 3.7333, 3.7861, 3.8389, 3.8917, 3.9444, 3.9972, 4.05, 4.1028, 4.1556, 4.2083, 4.2611, 4.3139, 4.3667, 4.4194, 4.4722, 4.525, 4.5778, 4.6306, 4.6833, 4.7361, 4.7889, 4.8417, 4.8944, 4.9472, 5.0]

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
        chrome.tabs.setZoom(zoomLevels[zoomIndex])
    });