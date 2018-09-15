function uploadVideoData(){
	console.log("hello")
	var file = document.getElementById("file1").files[0];
	console.log(file);
	if(file) {
		var hash = file.lastModified + file.size + timestamp;
		$.get("/uploadVideoData?")
	} else {
		alert("Please select a file");
	}
}

function getVideoData(){

}