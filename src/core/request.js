class Request {
    constructor(url, args) {
        this.url = url
        this.args = args === undefined ? {} : args
        this.xhr = new XMLHttpRequest()
        this._bindEvents(this.xhr)
        this._setArgs(this.args)
    }

    onLoad(callback) {
        this.onLoadCallback = callback
        return this
    }

    onLoadEnd(callback) {
        this.onLoadEndCallback = callback
        return this
    }

    onError(callback) {
        this.onErrorCallback = callback
        return this
    }

    onProgress(callback) {
        this.onProgressCallback = callback
        return this
    }

    onAbort(callback) {
        this.onAbortCallback = callback
        return this
    }

    abort() {
        if (this.xhr) this.xhr.abort()
        return this
    }

    _setArgs(args) {
        if (args.mimeType) {
            xhr.overrideMimeType(args.mimeType)
        }

        if (args.responseType) {
            xhr.responseType = args.responseType
        }

        if (args.headers) {
            for (let key in args.headers) {
                xhr.setRequestHeader(key, args.headers[key])
            }
        }

        if (args.timeout) {
            xhr.timeout = args.timeout
        }

        if (args.withCredentials) {
            xhr.withCredentials = args.withCredentials
        }

        if (args.data) {
            this.data = new FormData()
            for (let key in args.data) {
                this.data.append(key, args.data[key])
            }
        }
    }

    _bindEvents(xhr) {
        xhr.onload = () => {
            if (this.onLoadCallback) this.onLoadCallback(xhr)
        }
        xhr.onloadend = () => {
            if (this.onLoadEndCallback) this.onLoadEndCallback(xhr)
        }
        xhr.onerror = () => {
            if (this.onErrorCallback) this.onErrorCallback(xhr)
        }
        xhr.onprogress = () => {
            if (this.onProgressCallback) this.onProgressCallback(xhr)
        }
        xhr.onabort = () => {
            if (this.onAbortCallback) this.onAbortCallback(xhr)
        }
    }

    send(method) {
        this.xhr.open(method.toUpperCase(), this.url, true)

        if (this.data) {
            this.xhr.send(this.data)
        } else {
            this.xhr.send()
        }
        return this
    }
}


const request = (url, args) => new Request(url, args)

export { request }

// request("http://httpbin.org/ip").send("get")
