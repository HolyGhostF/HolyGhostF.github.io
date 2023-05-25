document.addEventListener('DOMContentLoaded', function() {
    // window.parent.document.getElementById('#checkbox')
    document.querySelector('#startButton').onclick = function() {
        document.querySelector('#overlay').style.display = 'none';
		if (!cardFFlag || !cardEFlag){
			modelFile = fuModelPath;
            motionFiles = ["./luotianyi/201904202121169044.vmd"];
            cameraFiles = ["./luotianyi/201904202121539841.vmd"];
            audioFile =    "./luotianyi/201904202132351044.mp3";
			LoadMMDFileInit();
            flag = true;
		}
        document.querySelector('#progressBarF').style.display = 'block';
    }
})