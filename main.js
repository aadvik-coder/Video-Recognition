video = "";
status1 = "";
objects = [];
mode = "playing";
check = "not playing";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createVideo('video.mp4');
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    color = "";
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("status").style.background = "linear-gradient(#5479ff 0%, #6054ff 50%, #7f54ff 100%)";
            document.getElementById("num_objects").innerHTML = "Number of objects detected are: " + objects.length;
            if (objects.length <= 0) {
                document.getElementById("num_objects").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
            } else {
                document.getElementById("num_objects").style.background = "linear-gradient(#5479ff 0%, #6054ff 50%, #7f54ff 100%)";
            }
            
            fill(color);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(color);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(percent <= 50){
                color = "#ff3030";
            } else if(percent > 50 && percent <= 70){
                color = "#ff8a30";
            } else if(percent > 70 && percent <= 90){
                color = "#ffe730";
            } else if(percent > 90 && percent <= 100){
                color = "#56ff30";
            }
        }

    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    document.getElementById("status").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
    check = "is playing";
}

function modelLoaded() {
    console.log("Model Loaded!!1!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function pause_play() {
    if (check == "not playing") {
        document.getElementById("status").innerHTML = "Please play the video before pausing";
    } else {
        if (mode == "playing") {
            video.pause();
            mode = "pause";
            document.getElementById("pause_play").innerHTML = "Continue";
        } else {
            video.play();
            mode = "playing";
            document.getElementById("pause_play").innerHTML = "Pause";
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}