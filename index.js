const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const isNode = !isBrowser && typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

let Buffer, Stream, EventEmitter;
if (isNode) {
    (async () => {
        Buffer = (await import('buffer')).Buffer;
        Stream = (await import('stream')).Stream;
        EventEmitter = (await import('events')).EventEmitter;
    })();
}

function jsSubtype(value) {
    const simpleType = typeof value;

    const getSubType = {
        string: (value) =>
            value === ""
                ? "empty string"
                : /^\s*$/.test(value)
                    ? "whitespace string"
                    : "character string",
        number: (value) => {
            if (isNaN(value)) return "NaN";
            if (value === Infinity) return "Infinity";
            if (value === -Infinity) return "-Infinity";
            if (Object.is(value, -0)) return "-0";
            if (Number.isInteger(value)) return "integer";
            return "float";
        },
        boolean: () => "just boolean",
        undefined: () => "undefined",
        object: (value) => {
            if (value === null) return "null";
            if (Array.isArray(value)) return "array";
            if (value instanceof Date) return "date";
            if (value instanceof Function) return "function";
            if (value instanceof RegExp) return "regexp";
            if (value instanceof Map) return "map";
            if (value instanceof Set) return "set";
            if (value instanceof WeakMap) return "weakmap";
            if (value instanceof WeakSet) return "weakset";
            if (value instanceof WeakRef) return "weakref";
            if (value instanceof Promise) return "promise";
            if (value instanceof Error) return "error";
            if (value instanceof ArrayBuffer) return "arraybuffer";
            if (typeof SharedArrayBuffer !== "undefined" && value instanceof SharedArrayBuffer) return "sharedarraybuffer";
            if (value instanceof DataView) return "dataview";
            if (ArrayBuffer.isView(value)) return "typed array";

            if (isBrowser) {
                if (value instanceof Document) return "Document";
                if (value instanceof HTMLElement) return "html element";
                if (value instanceof Window) return "window";
            }

            if (isNode) {
                if (Buffer && Buffer.isBuffer(value)) return "buffer";
                if (Stream && value instanceof Stream) return "stream";
                if (EventEmitter && value instanceof EventEmitter) return "event emitter";
            }

            if (value instanceof Intl.Collator ||
                value instanceof Intl.DateTimeFormat ||
                value instanceof Intl.NumberFormat) {
                return "intl object";
            }

            if (Object.getPrototypeOf(value) === null) return "object without prototype";
            if (Object.getPrototypeOf(value) !== Object.prototype) return "object with custom prototype";
            if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                try {
                    JSON.stringify(value);
                    return "JSON-like object";
                } catch {
                    return "non-serializable object";
                }
            }

            return "object";
        },
        function: (value) => {
            if (value.constructor.name === "AsyncFunction") return "async function";
            if (value.constructor.name === "GeneratorFunction") return "generator function";
            return "function";
        },
        symbol: () => "symbol",
        bigint: () => "bigint"
    };

    let subType = getSubType[simpleType] ? getSubType[simpleType](value) : undefined;

    return {
        value: value,
        type: simpleType,
        subType: subType,
    };
}

export default jsSubtype;
