class LocalStorageUtil {
    static setData(key, value) {
        console.log("setData", key, value);
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

    static getAllKeys() {
        return Object.keys(localStorage);
    }
    static clearAll() {
        console.log("Clearing all local storage data");
        localStorage.clear();
    }
}

export default LocalStorageUtil

