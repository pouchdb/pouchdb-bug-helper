/* global PouchDB, log */

var DB_NAME = 'test';
var REMOTE_DB_URL = 
    document.location.origin + '/db/' + DB_NAME;

var db, remote;

function run() { 
  ensureClean().then(function() { 
    log('Creating Databases'); 
    db = new PouchDB(DB_NAME);
    remote = new PouchDB(REMOTE_DB_URL);
  }).then(function() { 
    log('Posting Document');
    return db.post({foo: 'bar'});
  }).then(function (result) {
    log('Syncing Data');  
    return db.sync(remote);
  }).then(function() { 
    log('Sync Complete!');
  });
}

document.getElementById('run')
  .addEventListener('click', run);

// Data will persist between refreshes
// clean up any data from previous loads
function ensureClean() { 
  return Promise.all([
    new PouchDB(DB_NAME).destroy(), 
    new PouchDB(REMOTE_DB_URL).destroy()
  ]);
}