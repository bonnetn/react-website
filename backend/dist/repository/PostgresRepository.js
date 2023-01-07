var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PostgresRepository_instances, _PostgresRepository_db, _PostgresRepository_catMapper;
import { fetchCatQuery, queries, searchCatsQuery } from "./Query.js";
export class PostgresRepository {
    constructor(pool) {
        _PostgresRepository_instances.add(this);
        _PostgresRepository_db.set(this, void 0);
        pool.on("connect", this.registerQueries);
        __classPrivateFieldSet(this, _PostgresRepository_db, pool, "f");
    }
    async registerQueries(client) {
        for (const { name, content } of queries) {
            console.log(`Registering ${name}`);
            await client.query(content);
        }
    }
    async fetchCat(uuid) {
        const { rows } = await __classPrivateFieldGet(this, _PostgresRepository_db, "f").query(fetchCatQuery, [uuid]);
        const result = rows.map(__classPrivateFieldGet(this, _PostgresRepository_instances, "m", _PostgresRepository_catMapper));
        return result.at(0) ?? null;
    }
    async searchCats(queryString, first, after, last, before) {
        const r = await __classPrivateFieldGet(this, _PostgresRepository_db, "f").query("EXPLAIN ANALYZE " + searchCatsQuery, [
            queryString,
            first,
            after,
            last,
            before,
        ]);
        for (const l of r.rows) {
            console.log(l["QUERY PLAN"]);
        }
        const { rows } = await __classPrivateFieldGet(this, _PostgresRepository_db, "f").query(searchCatsQuery, [
            queryString,
            first,
            after,
            last,
            before,
        ]);
        return rows.map(__classPrivateFieldGet(this, _PostgresRepository_instances, "m", _PostgresRepository_catMapper));
    }
}
_PostgresRepository_db = new WeakMap(), _PostgresRepository_instances = new WeakSet(), _PostgresRepository_catMapper = function _PostgresRepository_catMapper({ id, uuid, name, age, owner_uuid, owner_name }) {
    const owner = { uuid: owner_uuid, name: owner_name };
    return { id, uuid, name, age, owner };
};
