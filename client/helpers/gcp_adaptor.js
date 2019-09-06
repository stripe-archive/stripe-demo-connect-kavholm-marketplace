import {Storage} from '@google-cloud/storage';

const stringify = (obj) => JSON.stringify(obj, null, 2);

class GcloudAdapter {
  constructor(
    source = 'db.json',
    {
      defaultValue = {},
      serialize = stringify,
      deserialize = JSON.parse,
      projectId,
      keyFilename,
      bucketName,
    } = {},
  ) {
    this.source = source;
    this.defaultValue = defaultValue;
    this.serialize = serialize;
    this.deserialize = deserialize;
    this.bucketName = bucketName;

    // Creates a client
    this.storage = new Storage({
      projectId,
    });

    this.bucket = this.storage.bucket(this.bucketName);
    this.file = this.bucket.file(this.source);
  }

  async read() {
    // return this.defaultValue;
    return new Promise((resolve, reject) => {
      this.file
        .download()
        .then((data) => {
          const file = data[0];
          const contents = this.deserialize(file);
          resolve(contents);
        })
        .catch((err) => {
          if (err.code === 404) {
            this.write(this.defaultValue)
              .then(() => resolve(this.defaultValue))
              .catch(reject);
          } else {
            reject(err);
          }
        });
    });
  }

  async write(data) {
    const contents = this.serialize(data);
    return this.file.save(contents, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
        contentType: 'application/json',
        cacheControl: 'no-cache',
      },
    });
  }
}

module.exports = GcloudAdapter;
