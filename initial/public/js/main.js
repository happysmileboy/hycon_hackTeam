function uploadVideoData(){
	console.log("hello")
	var file = document.getElementById("file1").files[0];
	console.log(file);
	if(file) {
		var name = Number(file.name.split("/").slice(-1).join().split(".").shift());
		var hash = file.lastModified + file.size;
		console.log(name, hash)
		$.get("/uploadVideoData?name=" + name + "&hash=" + hash, function(data) {
			console.log(data);
			alert('page content:' + data);
			// let transaction = transactions.filter(transaction => {
			// 	return transaction.blockHash;
			// })
			$("#blockHash").text("하이");
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
		var bol = $.get('/compareVideoData?name=' + name + "&hash=" + hash, function(data) {
			alert('page content' + data);
		});
	} else {
		alert("please select a file");
	}
}