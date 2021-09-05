import { Db, MongoClient, ObjectId } from "mongodb";

export default class Database {
  static _client = null;
  static _connection = null;

  /**
   * Create a connection with a mongo client.
   * @returns {Promise<Db>}
   */
  static get connection() {
    return new Promise((resolve, reject) => {
      try {
        if (!this._connection) {
          console.log("Creating mongodb connection!");
          if (!this._client) {
            this._client = new MongoClient(process.env.MONGO_URL);
          }
          this._client.connect().then(() => {
            this._connection = this._client.db("psk");
            resolve(this._connection);
          });
        } else {
          resolve(this._connection);
        }
      } catch (error) {
        console.log("error on connect");
        console.log(error);
        reject(error);
      }
    });
  }

  /**
   * Insert a new entry on the database.
   * @param {String} collection
   * @param {Object|Object[]} data
   */
  static async createMany(collection, data) {
    if (Array.isArray(data)) {
      for (let obj of data) {
        if (!obj._id) obj._id = new ObjectId().toHexString();
      }
    }

    const conn = await this.connection;
    return await conn.collection(collection).insertMany();
  }

  /**
   * Insert a new entry on the database.
   * @param {String} collection
   * @param {Object|Object[]} data
   */
  static async createOne(collection, data) {
    if (!data._id) {
      data._id = new ObjectId().toHexString();
    }

    const conn = await this.connection;
    return await conn.collection(collection).insertOne(data);
  }

  /**
   * Retrieve all documents from the given collection that matches the query.
   */
  static async retrieve(collection, query) {
    const conn = await this.connection;
    console.log(collection, query);
    return await conn.collection(collection).find(query).toArray();
  }

  /**
   * Update an entry on the database.
   * @param {String} collection
   * @param {Filter<TSchema>} query
   * @param {Object|Object[]} data
   */
  static async updateMany(collection, query, data) {
    const conn = await this.connection;
    return await conn.collection(collection).updateMany(query, { $set: data });
  }

  /**
   * Update an entry on the database.
   * @param {String} collection
   * @param {Filter<TSchema>} query
   * @param {Object|Object[]} data
   */
  static async updateOne(collection, query, data) {
    console.log(collection, query, data);
    const conn = await this.connection;
    return await conn.collection(collection).updateOne(query, { $set: data });
  }

  /**
   * Delete an entry from the given collection.
   * @param {String} collection
   * @param {String} id
   */
  static async delete(collection, id) {
    const conn = await this.connection;
    return await conn.collection(collection).deleteOne({ _id: id });
  }
}
