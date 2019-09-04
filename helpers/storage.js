var path = require('path');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class Storage {
  constructor() {
    this.path = path.resolve('db', 'kavholm.json');

    const adapter = new FileSync(this.path);
    this.db = low(adapter);

    // Set some defaults (required if your JSON file is empty)
    this.db.defaults({users: [], listings: []}).write();

    console.log('storage.path', this.path);
  }

  set(key, value) {
    return this.db.set(key, value);
  }

  get(key) {
    return this.db.get(key);
  }
}

export default new Storage();
