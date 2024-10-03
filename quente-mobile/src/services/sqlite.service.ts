import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";
import { getMainPrice } from "../utils";

const DATABASE_NAME = "quente.db";

enablePromise(true);

class SqliteService {
  private dbConnection: SQLiteDatabase | null;
  constructor() {
    this.dbConnection = null;
  }

  async getConnection(): Promise<SQLiteDatabase> {
    if (this.dbConnection) return this.dbConnection;
    this.dbConnection = await openDatabase({
      name: DATABASE_NAME,
      location: "default",
    });
    const query = `CREATE TABLE IF NOT EXISTS items(
        code TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        data TEXT NOT NULL
    );`;

    this.dbConnection.executeSql(query);
    return this.dbConnection;
  }

  /**
   *
   * @param tableName
   * @param data
   * @returns
   */
  public async insert(tableName: string, data: any): Promise<number> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const resultSet = await (
      await this.getConnection()
    ).executeSql(
      `
      INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${keys
        .map((_) => "?")
        .join(", ")});
    `,
      values
    );
    return resultSet[0].insertId;
  }

  public async insertBulk(data: any[]) {
    try {
      const dataClone = data.map((dataItem) => ({
        code: dataItem.code,
        name: dataItem.name,
        price: getMainPrice(dataItem),
        data: JSON.stringify(dataItem),
      }));
      (await this.getConnection()).transaction((tx) => {
        dataClone.forEach((item) => {
          tx.executeSql(
            `INSERT OR REPLACE INTO items (code, name, price, data) VALUES (?, ?, ?, ?)`,
            Object.values(item),
            () => {},
            (tx, error) => console.error("Error inserting row", error)
          );
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async query(
    tableName: string,
    params: { [key: string]: string } = {}
  ) {
    let results: any[] = [];
    const paramsEntries = Object.entries(params);

    const clauses = paramsEntries
      .map(([key, value]) => `UPPER(${key}) like "%${value.toUpperCase()}%"`)
      .join(" OR ");

    let query = `SELECT code, name, price, data FROM ${tableName} ${
      paramsEntries.length > 0 ? `WHERE ${clauses}` : ""
    } LIMIT 10`;

    const resultSet = await (await this.getConnection()).executeSql(query);

    resultSet.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        results.push(result.rows.item(index));
      }
    });

    return results;
  }
  public async delete(tableName: string) {
    const resultSet = await (
      await this.getConnection()
    ).executeSql(`DELETE FROM ${tableName} `);
    return resultSet;
  }

  public async drop(tableName: string) {
    const resultSet = await (
      await this.getConnection()
    ).executeSql(`DROP TABLE ${tableName} `);
    return resultSet;
  }
}

const sqliteService = new SqliteService();

export default sqliteService;
