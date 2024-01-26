var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
export function init(kyselyConstructor, adapter, introspector, queryCompiler) {
    const kysely = new kyselyConstructor({
        dialect: new PlaygroundDialect(queryCompiler, adapter, introspector),
    });
    return { kysely };
}
class PlaygroundDialect {
    constructor(queryCompiler, adapter, introspector) {
        this.queryCompiler = queryCompiler;
        this.adapter = adapter;
        this.introspector = introspector;
    }
    createDriver() {
        return new PlaygroundDriver();
    }
    createQueryCompiler() {
        return this.queryCompiler;
    }
    createAdapter() {
        return this.adapter;
    }
    createIntrospector(db) {
        return this.introspector;
    }
}
const resolved = Promise.resolve();
function dispatch(method, detail = {}) {
    window.dispatchEvent(new CustomEvent("playground", { detail: Object.assign({ method }, detail) }));
}
class PlaygroundDriver {
    init() {
        dispatch("init");
        return resolved;
    }
    acquireConnection() {
        dispatch("acquireConnection");
        return Promise.resolve(new PlaygroundConnection());
    }
    beginTransaction(connection, settings) {
        dispatch("beginTransaction", { settings });
        return resolved;
    }
    commitTransaction(connection) {
        dispatch("commitTransaction");
        return resolved;
    }
    rollbackTransaction(connection) {
        dispatch("rollbackTransaction");
        return resolved;
    }
    releaseConnection(connection) {
        dispatch("releaseConnection");
        return resolved;
    }
    destroy() {
        dispatch("destroy");
        return resolved;
    }
}
const queryResult = { rows: [] };
class PlaygroundConnection {
    executeQuery(compiledQuery) {
        dispatch("executeQuery", { compiledQuery });
        return Promise.resolve(queryResult);
    }
    streamQuery(compiledQuery, chunkSize) {
        dispatch("streamQuery", { compiledQuery, chunkSize });
        return (function g() {
            return __asyncGenerator(this, arguments, function* g_1() {
                yield yield __await(queryResult);
            });
        })();
    }
}
