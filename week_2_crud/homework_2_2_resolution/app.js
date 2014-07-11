var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    //var cursor = grades.find({});
    //cursor.skip(1);
    //cursor.limit(4);
    //cursor.sort('grade', 1);
    //cursor.sort([['grade', 1], ['student', -1]]);

    var options = { //'skip' : 1,
                    //'limit' : 4,
                    'sort' : [['State', 1], ['Temperature', -1]] };
    var cursor = db.collection('data').find({}, {}, options);

    var stateName = "";
    var count = 0;
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
	
	if(doc.State != stateName) {
		count++;
		db.collection('data').update( doc, { $set : { month_high : true }}, function(erro, docu){
			if(err) throw err;
			if(doc == null) {
			    return db.close();
			}
		});
        	console.dir(doc);
        	console.dir(count);
	stateName = doc.State;
	}

    });
});
