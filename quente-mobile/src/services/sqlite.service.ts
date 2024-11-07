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

    const statement = `CREATE TABLE IF NOT EXISTS items(
        _id TEXT NOT NULL PRIMARY KEY,
        code TEXT NOT NULL,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        data TEXT NOT NULL
    );`;
    this.dbConnection.executeSql(statement);
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
    const findByIdObjc = await this.findById(tableName, data._id);
    return findByIdObjc;
  }

  /**
   *
   * @param tableName
   * @param data
   * @returns
   */
  public async update(tableName: string, id: string, data: any) {
    const values = Object.values(data);
    const columns = Object.keys(data).map((key) => `${key} = ? `);
    const sql = `UPDATE ${tableName} SET ${columns.join()} WHERE _id = ?`;
    const resultSet = await (
      await this.getConnection()
    ).executeSql(sql, [...values, id]);
    const findByIdObjc = await this.findById(tableName, id);
    return findByIdObjc;
  }

  /**
   *
   * @param data
   */
  public async insertBulk(tableName: string, data: any[]) {
    const columns = Object.keys(data);
    (await this.getConnection()).transaction((tx) => {
      data.forEach((item) => {
        tx.executeSql(
          `INSERT OR REPLACE INTO ${tableName} (${columns.join()}) VALUES (${[
            ...columns,
          ]
            .map((_) => " ? ")
            .join()})`,
          Object.values(item),
          () => {},
          (tx, error) => console.error("Error inserting row", error)
        );
      });
    });
  }

  public async query(
    tableName: string,
    params: { [key: string]: string } = {},
    select: string = " * ",
    limit: number = 10
  ) {
    let results: any[] = [];
    const paramsEntries = Object.entries(params);
    const clauses = paramsEntries
      .map(([key, value]) => `UPPER(${key}) like "%${value.toUpperCase()}%"`)
      .join(" OR ");

    let query = `SELECT ${select} FROM ${tableName} ${
      paramsEntries.length > 0 ? `WHERE ${clauses}` : ""
    } LIMIT ${limit}`;
    const resultSet = await (await this.getConnection()).executeSql(query);
    resultSet.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        results.push(result.rows.item(index));
      }
    });

    return results;
  }

  public async findById(tableName: string, id: string, select = ' * ') {
    let query = `SELECT ${select} FROM ${tableName} WHERE _id = ?`;
    const resultSet = await (
      await this.getConnection()
    ).executeSql(query, [id]);
    return resultSet.length > 0 ? resultSet[0].rows.item(0) : null;
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
