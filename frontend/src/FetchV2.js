const { fetch: originalFetch } = window;

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