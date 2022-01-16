
const modelParams = {
    flipHorizontal: true, // flip e.g for video
    imageScaleFactor: 0.7,
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.89, // confidence threshold for predictions.
};

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;


const video = document.querySelector('#video');
const audio = document.querySelector('#audio');


let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                video.srcObject = stream;
                //run detection
                setInterval(runDetection, 300);
            }, function () { console.warn("Error getting audio stream from getUserMedia") })
        }
    });


function runDetection() {
    model.detect(video)
        .then(predictions => {
            if (predictions.length !== 0) {
                let hand1 = predictions[0].bbox;
                let x = hand1[0];
                let y = hand1[1];
                // console.log(x);
                // console.log(y);

                if (x < 200) {
                    audio.src = "a-chord.mp3";
                } else if (x > 300) {
                    audio.src = "c-chord.mp3";
                } else if (x > 200) {
                    audio.src = "b-chord.mp3";
                }
                else {
                    audio.src = "e-chord.mp3";
                }

                audio.play();
            }
        });
    // requestAnimationFrame(runDetection)
}


handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    })