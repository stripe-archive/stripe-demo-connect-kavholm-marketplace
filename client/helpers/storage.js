var path = require('path');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const GcloudAdapter = require('./gcp_adaptor');

class Storage {
  constructor() {
    this.setup();
  }

  async setup() {
    let adapter;
    if (process.env.GOOGLE_CLOUD_PROJECT) {
      adapter = new GcloudAdapter('kavholm.json', {
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: 'kavholm.json',
        bucketName: 'kavholm',
      });
    } else {
      this.path = path.resolve('./', 'db', 'kavholm.json');
      adapter = new FileSync(this.path);
    }

    this.db = await low(adapter);

    // Set some defaults (required if your JSON file is empty)
    this.db.defaults({users: [], listings: [], bookings: []}).write();
  }

  set(key, value) {
    return this.db.set(key, value);
  }

  get(key) {
    return this.db.get(key);
  }
}

export default new Storage();
