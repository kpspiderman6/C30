song = "";

scorel=0;
scorer=0;

left_wrist_y=0;
left_wrist_x=0;

right_wrist_x=0;
right_wrist_y=0;

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(500,250);

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialised");
}

function draw(){
    image(video,0,0,600,600);
    if(scorer>0.2){

        circle(right_wrist_x,right_wrist_y,15);
    if(right_wrist_x>0 && right_wrist_x<=100){
        document.getElementById("h11").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    if(right_wrist_x>100 && right_wrist_x<=200){
        document.getElementById("h11").innerHTML="Speed = 1x";
        song.rate(1);
    }
    if(right_wrist_x>200 && right_wrist_x<=300){
        document.getElementById("h11").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    if(right_wrist_x>300 && right_wrist_x<=400){
        document.getElementById("h11").innerHTML="Speed = 2x";
        song.rate(2);
    }
    if(right_wrist_x>400 && right_wrist_x<=500){
        document.getElementById("h11").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scorel>=0.2){
        circle(left_wrist_x,left_wrist_y,15);
    innumber= Number(left_wrist_x);
    rounded_no = floor(left_wrist_x);
    rounded_no2 = rounded_no/1000;
    volume = rounded_no2*2;
    document.getElementById("h22").innerHTML="Volume ="+volume;
    song.setVolume(volume);
    }
}
function preload(){
    song=loadSound("https://kpspiderman6.github.io/MUSIC/Muqabla%20-%20Street%20Dancer%203D%20128%20Kbps.mp3");
    
}
function play_sound(){
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}
function stop_sound(){
    song.stop();
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorel = results[0].pose.keypoints[9].score;
        scorer = results[0].pose.keypoints[10].score;
        left_wrist_x= results[0].pose.leftWrist.x;
        left_wrist_y= results[0].pose.leftWrist.y;
        console.log("left wrist x ="+left_wrist_x+"left wrist y="+left_wrist_y);

        right_wrist_x= results[0].pose.rightWrist.x;
        right_wrist_y= results[0].pose.rightWrist.y;
        console.log("right wrist x ="+right_wrist_x+"right wrist y="+right_wrist_y);
    }
}
