song = '';

leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;

scoreleftWrist = 0;

function   preload(){
    song = loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded); 
    poseNet.on('pose', gotPoses)
}

function gotPoses(results){
    
    if(results.length > 0) {
    
        
        console.log(results);

        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;

        scoreleftWrist = results[0].pose.keypoints[9].score;
    }

}

function modelLoaded(){
    console.log("Model has Loaded");
}

function draw(){
    image(video, 0,0, 500,400);
    fill("#ff0000");
    stroke("#ff0000");

    if(scoreleftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        inNumberleftWristY = Number(leftWristY);

        volume = floor(leftWristY)/400;
        document.getElementById("volume").innerHTML = "Volume :"+volume;
        song.setVolume(volume);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}