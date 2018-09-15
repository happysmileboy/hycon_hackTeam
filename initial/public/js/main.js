function uploadVideoData(){
	console.log("hello")
	var file = document.getElementById("file1").files[0];
	console.log(file);
	if(file) {
		var name = Number(file.name.split("/").slice(-1).join().split(".").shift());
		var hash = file.lastModified + file.size;
		console.log(name, hash)
		$.get("/uploadVideoData?name=" + name + "&hash=" + hash, function(data, json) {
			console.log(data);
			$("#blockHash").text(data.blockHash);
			$("#blockNumber").text(data.blockNumber);
			$("#from").text(data.from);
			$("#gasUsed").text(data.gasUsed);
			$("#status").text(data.status);
			$("#to").text(data.to);
			$("#transactionHash").text(data.transactionHash);


			alert('page content:' + data);
		})
	} else {
		alert("Please select a file");
	}
}

function compareVideoData(){
	console.log("hola");
	var file = document.getElementById("file2").files[0];
	console.log(file);
	if (file){
		var name = Number(file.name.split("/").slice(-1).join().split(".").shift());
		var hash = file.lastModified + file.size;
		console.log(name,hash);
		$.get('/compareVideoData?name=' + name + "&hash=" + hash, function(data, json) {
			console.log(data);
			$("#yourHash").text(data.yourHash);
			$("#result").text(data.result);
			$("#foundHash").text(data.hashfound);


			alert('page content' + data);
		});
	} else {
		alert("please select a file");
	}
}