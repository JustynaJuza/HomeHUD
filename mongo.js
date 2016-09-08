
var mongo = require('promised-mongo');
var url = 'mongodb://localhost:27017/homeHud';
//
// const mongoClient = mongodb.MongoClient;

function execute(collectionName, operation) {
    var db = mongo(url);

    var collection = db.collection(collectionName);
    return operation(collection).then((results) => {
        db.close();
        return results;
    });
}

function insert(collection) {
    var allLights = [{
        id: 'biurkoBartka',
        state: 1,
        roomIndex: 1
    }, {
        id: 'biurkoJustyny',
        state: 0,
        roomIndex: 1
    }, {
        id: 'lozko',
        state: 2,
        roomIndex: 2
    }, {
        id: 'salon',
        state: 3,
        roomIndex: 3
    }];

    collection.insert(allLights, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted %d documents into the "lights" collection. The documents inserted with "_id" are:', result.ops.length, result);
        }
    });
}

function getAll(collection) {

    return collection
        .find() //, { 'id': true, 'state': true, 'roomIndex': true })
        .toArray();
}

function find(collection, id) {

    collection.find({
        id: id
    }, {
        'id': true,
        'state': true,
        'roomIndex': true
    }).toArray(function(err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Found:', result);
            return result
        } else {
            console.log('No document(s) found with defined "find" criteria!');
        }
    });
}

function update(collection, options){
    return collection.update(options.selector, options.changes);
}

var mapToLightSwitchStates = (all) => {
    return all.map((entry) => {
        return {
            id: entry.id,
            state: entry.state,
            roomIndex: entry.roomIndex
        }
    });
}

module.exports = {
    getLightsState: function() {
        return execute('lights', getAll).then(mapToLightSwitchStates);
    },
    setLightState: function(lightId, lightState) {
        //return execute('lights', update, { selector: { id: lightId }, changes: { state: lightState }});
    }
}
