(function () {
    document.addEventListener('wheel', onWheel, { passive: false })
    var slowdown = 1
    function onWheel(event) {
        // Check that cmd key is held
        if (event.metaKey) {
            // Prevent wheel event from default behaviour
            event.preventDefault()

            // mouse scroll forward (towards front of the mouse) is negative,
            // backwards (towards rear of mouse) is positive
            const zoomIn = event.deltaY >= 0

            // send message to background script
            if (slowdown) {
                chrome.runtime.sendMessage({zoomIn})
                slowdown = 0
            } else {
                slowdown = 1
            }
        }
    }
})()