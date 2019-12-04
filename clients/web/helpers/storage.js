var path = require('path');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class Storage {
  constructor() {
    this.setup();
  }

  async setup() {
    this.path = path.resolve('./', 'db', 'database.json');
    let adapter = new FileSync(this.path);

    this.db = await low(adapter);

    // Set some defaults (required if your JSON file is empty)
    this.db.defaults({users: [], listings: [], transactions: []}).write();
  }

  set(key, value) {
    return this.db.set(key, value);
  }

  get(key) {
    return this.db.get(key);
  }
}

export default new Storage();
