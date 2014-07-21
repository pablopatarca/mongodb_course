var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/exam', function(err, db){
	
	var find = {};

	var select = {
		_id : 1	
	};

	var options = {};


	var cursor = db.collection('images').find(find, select, options);
	console.log('cursor');
	cursor.each(function(err, doc){
		if(err) throw err;
		if (doc == null) {
			console.log('doc null');
			return db.close();
		};
		if (doc){
			console.log('elemento detectado');
		};
	});

});