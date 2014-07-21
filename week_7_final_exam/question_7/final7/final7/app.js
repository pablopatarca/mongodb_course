
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/exam', function(err, db){
	
	var find = {};
	var count = 0;
	var count2 = 0;

	var cursor = db.collection('images').find(find);
	//setTimeout(function() {
		cursor.each(function(err, doc){

			if (doc){
			
				var findA = {
					images : doc._id
				};

				//console.log(findA);
				db.collection('albums').findOne(findA, function(errA, docA){
					
					//if(errA) throw errA;
					//if(errA) console.log('error');
					
					if (docA) {
						console.log('Encuentra: ' + count2++);
					} else {
						console.log('Orphan images :' + count++);
						db.collection('images').remove({'_id': doc._id}, function(err, id){
							if(err) throw err;

							console.log('err');
						});
					}

				});
			};

		});

    // }, 1000);

});