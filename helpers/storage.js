var path = require('path');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const GcloudAdapter = require('./storage_gcp');

class Storage {
  constructor() {
    this.setup();
  }

  async setup() {
    let adapter;
    this.path = path.resolve('./', 'db', 'database.json');

    if (process.env.GOOGLE_CLOUD_PROJECT) {
      adapter = new GcloudAdapter('database.json', {
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: 'database.json',
        bucketName: 'kavholm',
      });
    } else {
      adapter = new FileSync(this.path);
    }

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
