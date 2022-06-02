class Extension {
    any(collection, callback) {
        for (let i in collection) {
            if (callback(collection[i], i, collection)) {
                return true
            }
        }
        return false
    }

    all(collection, callback) {
        for (let i in collection) {
            if (!callback(collection[i], i, collection)) {
                return false
            }
        }
        return true
    }

    map(collection, callback) {
        let result = []
        for (let i in collection) {
            result.push(callback(collection[i], i, collection))
        }
        return result
    }

    filter(collection, callback) {
        let result = []
        for (let i in collection) {
            if (callback(collection[i], i, collection)) {
                result.push(collection[i])
            }
        }
        return result
    }

    reduce(collection, callback, initialValue) {
        let result = initialValue
        for (let i in collection) {
            result = callback(result, collection[i], i, collection)
        }
        return result
    }

    reduceRight(collection, callback, initialValue) {
        let result = initialValue
        for (let i = collection.length - 1; i >= 0; i--) {
            result = callback(result, collection[i], i, collection)
        }
        return result
    }

    reverse(collection) {
        let result = []
        for (let i = collection.length - 1; i >= 0; i--) {
            result.push(collection[i])
        }
        return result
    }

    find(collection, callback) {
        for (let i in collection) {
            if (callback(collection[i], i, collection)) {
                return collection[i]
            }
        }
        return null
    }

    findIndex(collection, callback) {
        for (let i in collection) {
            if (callback(collection[i], i, collection)) {
                return i
            }
        }
        return -1
    }

    findLast(collection, callback) {
        let result = null
        for (let i in collection) {
            if (callback(collection[i], i, collection)) {
                result = collection[i]
            }
        }
        return result
    }

    findLastIndex(collection, callback) {
        let result = -1
        for (let i in collection) {
            if (callback(collection[i], i, collection)) {
                result = i
            }
        }
        return result
    }

    dropLast(collection, count) {
        if (typeof collection === "string") {
            return collection.substring(0, collection.length - count)
        }

        let result = []
        for (let i in collection) {
            if (i < collection.length - count) {
                result.push(collection[i])
            }
        }
        return result
    }

    drop(collection, count) {
        if (typeof collection === "string") {
            return collection.substring(count)
        }

        let result = []
        for (let i in collection) {
            if (i >= count) {
                result.push(collection[i])
            }
        }
        return result
    }

    clone(collection) {
        if (typeof collection === "string") {
            return collection
        }
        return JSON.parse(JSON.stringify(collection))
    }

    flatten(collection) {
        let result = []
        for (let i in collection) {
            if (Array.isArray(collection[i])) {
                result = result.concat(this.flatten(collection[i]))
            } else {
                result.push(collection[i])
            }
        }
        return result
    }

    isArray(val) {
        return Array.isArray(val)
    }

    isObject(val) {
        return typeof val === "object" && val !== null
    }

    isString(val) {
        return typeof val === "string"
    }

    isNumber(val) {
        return typeof val === "number"
    }

    isFunction(val) {
        return typeof val === "function"
    }

    isBoolean(val) {
        return typeof val === "boolean"
    }

    isNull(val) {
        return val === null
    }

    isUndefined(val) {
        return typeof val === "undefined"
    }

    isEmpty(val) {
        if (this.isString(val)) {
            return val.length === 0
        }
        if (this.isArray(val)) {
            return val.length === 0
        }
        if (this.isObject(val)) {
            return Object.keys(val).length === 0
        }
        return false
    }

    isNotEmpty(val) {
        return !this.isEmpty(val)
    }

    isEqual(val1, val2) {
        if (this.isArray(val1) && this.isArray(val2)) {
            if (val1.length !== val2.length) {
                return false
            }
            for (let i = 0; i < val1.length; i++) {
                if (!this.isEqual(val1[i], val2[i])) {
                    return false
                }
            }
            return true
        }
        if (this.isObject(val1) && this.isObject(val2)) {
            if (Object.keys(val1).length !== Object.keys(val2).length) {
                return false
            }
            for (let i in val1) {
                if (!this.isEqual(val1[i], val2[i])) {
                    return false
                }
            }
            return true
        }
        return val1 === val2
    }


    isNotEqual(val1, val2) {
        return !this.isEqual(val1, val2)
    }
}


export { Extension }