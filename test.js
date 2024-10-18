// Adapted to work in both Node.js and the browser
import jsSubtype from './index.js';

function testSubtypes() {
    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    let testValues = [
        "", // empty string
        "    ", // whitespace string
        "Hello, World!", // character string
        0, // integer
        42.5, // float
        NaN, // NaN
        Infinity, // Infinity
        -Infinity, // -Infinity
        -0, // -0
        true, // boolean true
        false, // boolean false
        undefined, // undefined
        null, // null
        [], // array
        new Date(), // date
        /abc/, // regexp
        new Map(), // map
        new Set(), // set
        new WeakMap(), // weakmap
        new WeakSet(), // weakset
        typeof WeakRef !== "undefined" ? new WeakRef({}) : null, // weakref
        new Promise((resolve) => resolve()), // promise
        new Error("Test Error"), // error
        new ArrayBuffer(8), // arraybuffer
        typeof SharedArrayBuffer !== "undefined" ? new SharedArrayBuffer(8) : null, // sharedarraybuffer
        new DataView(new ArrayBuffer(16)), // dataview
        new Int8Array(8), // typed array
        function () { }, // function
        async function () { }, // async function
        function* () { }, // generator function
        Symbol("test"), // symbol
        BigInt(12345), // bigint
        typeof Intl !== "undefined" && Intl.Collator ? new Intl.Collator() : null, // intl collator
        typeof Intl !== "undefined" && Intl.DateTimeFormat ? new Intl.DateTimeFormat() : null, // intl datetimeformat
        typeof Intl !== "undefined" && Intl.NumberFormat ? new Intl.NumberFormat() : null, // intl numberformat
        Object.create(null), // object without prototype
        Object.create({}), // object with custom prototype
        { a: 1, b: 2 }, // JSON-like object
        typeof Proxy !== "undefined" ? new Proxy({}, {}) : null, // Proxy
        { toString: () => { throw new Error('non-serializable'); } } // non-serializable object
    ];

    if (isBrowser) {
        testValues.push(
            document, // document
            document.createElement("div"), // html element
            window // window
        );
    }

    const filteredTestValues = testValues.filter(value => value !== null);

    filteredTestValues.forEach((value, index) => {
        const result = jsSubtype(value);
        console.log(`Test #${index + 1}:`, result);
    });
}

testSubtypes();
