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
import pgPromise from "pg-promise";
var Query;
(function (Query) {
    Query.fetchOneCat = sql("../sql/fetch-one-cat.sql");
    Query.searchCats = sql("../sql/search-cats.sql");
    function sql(path) {
        const queryFile = new pgPromise.QueryFile(path, {
            minify: true,
        });
        queryFile.prepare();
        return queryFile;
    }
})(Query || (Query = {}));
export class PostgresRepository {
    constructor(config) {
        _PostgresRepository_instances.add(this);
        _PostgresRepository_db.set(this, void 0);
        const initOptions = {};
        const cn = {
            ...config,
            max: 30, // use up to 30 connections
        };
        const pgp = pgPromise(initOptions);
        __classPrivateFieldSet(this, _PostgresRepository_db, pgp(cn), "f");
    }
    async fetchOneCat(uuid) {
        const query = new pgPromise.ParameterizedQuery({
            text: Query.fetchOneCat,
            values: [uuid],
        });
        const result = await __classPrivateFieldGet(this, _PostgresRepository_db, "f").oneOrNone(query);
        return result.map(__classPrivateFieldGet(this, _PostgresRepository_instances, "m", _PostgresRepository_catMapper));
    }
    async searchCats(queryString, limit, after) {
        const query = new pgPromise.ParameterizedQuery({
            text: Query.searchCats,
            values: [queryString, after, limit],
        });
        const result = await __classPrivateFieldGet(this, _PostgresRepository_db, "f").any(query);
        return result.map(__classPrivateFieldGet(this, _PostgresRepository_instances, "m", _PostgresRepository_catMapper));
    }
}
_PostgresRepository_db = new WeakMap(), _PostgresRepository_instances = new WeakSet(), _PostgresRepository_catMapper = function _PostgresRepository_catMapper({ id, uuid, name, age, owner_uuid, owner_name }) {
    const owner = { uuid: owner_uuid, name: owner_name };
    return { id, uuid, name, age, owner };
};
