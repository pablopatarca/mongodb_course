var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {

	if (err) throw err;

	var options = {};

	var cursor = db.collection('students').find({});

	cursor.each(function(err, doc) {

		if (err) throw err;

		if (doc == null) {
			return db.close();
		};

		//console.log('Doc: ' + JSON.stringify(doc));
		if(doc.scores){
			var min = 10;
			var indexArray;
			console.log(JSON.stringify(doc.scores));
			for (var i = 0; i < doc.scores.length; i++) {
				if(doc.scores[i].score < min){
					min = doc.scores[i].score;
					indexArray = i;
				}
			};

			doc.scores.splice(indexArray, 1);

			//db.collection('students').update(doc, {"$set" : { "scores" : doc.scores } } , function(erro, docu) {
			db.collection('students').update(doc, { '$pull' : { "scores" :  doc.scores[indexArray] }} , function(erro, docu){
				if(err) throw err;
				if(doc == null) {
				    return db.close();
				}
				console.log('Done!' + docu);
				//console.log(JSON.stringify(doc.scores));
			});

			
		}

		// doc.scores.forEach(function(entry){
		// 	if(entry.score < min) {
		// 		min = entry.score;
		// 		indexArray = entry
		// 	}
		// });

	});

});