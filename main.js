cozy_music="";
relaxing_music="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
music_relax= "";
music_cozy = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    cozy_music = loadSound("Cozy~.mp3");
    relaxing_music = loadSound("Relax...mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#202020");
    stroke("#202020");

    music_relax = cozy_music.isPlaying();
    console.log(music_relax);

    music_cozy = relaxing_music.isPlaying();
    console.log(music_cozy);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        relaxing_music.stop();
        if(music_relax == false){
            cozy_music.play();
        }
        else{
            console.log(" Music: Relaxing... ");
            document.getElementById("music_id").innerHTML = " Music: Relaxing... ";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        cozy_music.stop();
        if(music_cozy == false){
            relaxing_music.play();
        }
        else{
            console.log(" Music: Cozy~ ");
            document.getElementById("music_id").innerHTML = " Music: Cozy~ ";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}