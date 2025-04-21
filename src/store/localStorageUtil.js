class LocalStorageUtil {
    static setData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getData(key) {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null
        } else if (value === undefined || value==="undefined") {
            return null
        } else {
            return JSON.parse(value);
        }

    }

    static hasData(key) {
        return localStorage.getItem(key) !== null;
    }

    static removeData(key) {
        localStorage.removeItem(key);
    }
}

export default LocalStorageUtil

