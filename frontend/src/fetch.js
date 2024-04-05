/**
 * @file Defines the fetch object that will be used to make requests by the Blacket frontend.
 */

/**
 * The original fetch function that will be used to make requests.
 * @type {Function}
 */
const { fetch: originalFetch } = window;

/**
 * Intercepts all fetch requests and adds the necessary headers.
 * This will add the Content-Type and Authorization headers to all requests.
 * @param {*} method The method of the fetch request, to be obtained internally by the window.fetch object.
 * @returns {Function} The resulting, patched fetch function.
 */
const fetchInterceptor = method => (url, body) => new Promise(async (resolve, reject) => {
    const response = await originalFetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify(body)
    });

    try {
        var data = await response.json();
    } catch {
        var data = null;
    }

    if (!response.ok) reject({
        ok: false,
        status: response.status,
        data: data
    });
    else resolve({
        ok: true,
        status: response.status,
        data: data
    });
});

/**
 * The fetch object that will be used to make requests.
 * This object will contain all the necessary methods to make requests.
 * Uses the fetchInterceptor function to intercept all requests and add the necessary headers.
 * @type {Object}
 * @property {Function} get The patched GET method.
 * @property {Function} head The patched HEAD method.
 * @property {Function} post The patched POST method.
 * @property {Function} put The patched PUT method.
 * @property {Function} delete The patched DELETE method.
 * @property {Function} connect The patched CONNECT method.
 * @property {Function} options The patched OPTIONS method.
 * @property {Function} trace The patched TRACE method.
 * @property {Function} patch The patched PATCH method.
 */
window.fetch = {
    get: fetchInterceptor("GET"),
    head: fetchInterceptor("HEAD"),
    post: fetchInterceptor("POST"),
    put: fetchInterceptor("PUT"),
    delete: fetchInterceptor("DELETE"),
    connect: fetchInterceptor("CONNECT"),
    options: fetchInterceptor("OPTIONS"),
    trace: fetchInterceptor("TRACE"),
    patch: fetchInterceptor("PATCH")
}