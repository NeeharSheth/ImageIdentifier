function take_snapshot(){
    Webcam.snap(function(data_uri){document.getElementById("result").innerHTML = '<img id="selfie_image" download="captured_image.png" src="'+data_uri+'"/>';})
}

function download(){
    link= document.getElementById("link");
 image= document.getElementById("selfie_image").src;   
link.href= image;
link.click();
}
console.log("ml5 version",ml5.version);

Webcam.set({
    width: 320,
    height: 400,
    image_format: 'png',
png_quality: 70
});
camera= document.getElementById("camera");
Webcam.attach(camera);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hymotIPM4/model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function check(){
    img= document.getElementById("selfie_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("object_label").innerHTML="Object: " + result[0].label;
        document.getElementById("acc_label").innerHTML= "Accuracy: " + Math.round(result[0].confidence*100)+ "%"
    }
}