let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrl = document.getElementById('ctrl');
	

song.onloadedmetadata=function() {
	progress.max = song.duration;
	progress.value = song.currentTime;

}

function playPause() {
	console.log('ciao')
	if(ctrl.classList.contains("fa-pause")){
		console.log('pause');
		song.pause();
		ctrl.classList.remove("fa-pause");
		ctrl.classList.add("fa-play");
	}
	else{
		console.log('play');
		song.play();
		ctrl.classList.add("fa-pause");
		ctrl.classList.remove("fa-play");
	} 

}
if(song.play()){
	setInterval(()=>{
		progress.value = song.currentTime;
	},500);
}

progress.onchange = function(){
	song.play();
	song.currentTime = progrss.value
	ctrl.classList.add("fa-pause");
	ctrl.classList.remove("fa-play");
}