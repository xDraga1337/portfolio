document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');  // Ensure video element has the correct ID
    const videoSource = 'video/stream.m3u8';  // Replace with your actual .m3u8 file path

    if (Hls.isSupported()) {
        const hls = new Hls();  // Create a new HLS instance
        hls.loadSource(videoSource);  // Load the .m3u8 file
        hls.attachMedia(video);  // Attach the video element

        hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
            console.log('Manifest parsed, found', data.levels.length, 'quality levels');
        });

        hls.on(Hls.Events.ERROR, function(event, data) {
            console.error('HLS.js error:', data);
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari's native HLS support
        video.src = videoSource;
    } else {
        console.error('HLS.js is not supported by this browser.');
    }
});
