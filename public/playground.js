let interceptor;
export function init(kyselyConstructor, adapter, introspector, queryCompiler, i) {
    interceptor = i;
    interceptor.log = (...args) => {
        dispatch("log", { args: args.map((it) => JSON.stringify(it)) });
    };
    const db = new kyselyConstructor({
        dialect: new PlaygroundDialect(queryCompiler, adapter, introspector),
    });
    return { db };
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
    window.dispatchEvent(new CustomEvent("playground", { detail: { method, ...detail } }));
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
class PlaygroundConnection {
    executeQuery(compiledQuery) {
        dispatch("executeQuery", { compiledQuery });
        return Promise.resolve(playgroundResult());
    }
    streamQuery(compiledQuery, chunkSize) {
        dispatch("streamQuery", { compiledQuery, chunkSize });
        return (async function* g() {
            yield playgroundResult();
        })();
    }
}
function playgroundResult() {
    if (interceptor === null || interceptor === void 0 ? void 0 : interceptor.result) {
        return interceptor.result;
    }
    return { rows: [{}] };
}
