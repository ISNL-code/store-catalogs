// storageUtils.js

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name, callback) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            const value = c.substring(nameEQ.length, c.length);
            callback(value);
            return;
        }
    }
    callback(null);
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function isLocalStorageAvailable() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function isSessionStorageAvailable() {
    try {
        const test = 'test';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

export function setStorageItem(key, value, callback) {
    try {
        if (isLocalStorageAvailable()) {
            localStorage.setItem(key, value);
        } else if (isSessionStorageAvailable()) {
            sessionStorage.setItem(key, value);
        } else {
            setCookie(key, value, 7);
        }
        callback();
    } catch (error) {
        console.error('Error setting storage item:', error);
    }
}

export function getStorageItem(key, callback) {
    try {
        if (isLocalStorageAvailable()) {
            callback(localStorage.getItem(key));
        } else if (isSessionStorageAvailable()) {
            callback(sessionStorage.getItem(key));
        } else {
            getCookie(key, callback);
        }
    } catch (error) {
        console.error('Error getting storage item:', error);
    }
}

export function removeStorageItem(key, callback) {
    try {
        if (isLocalStorageAvailable()) {
            localStorage.removeItem(key);
        } else if (isSessionStorageAvailable()) {
            sessionStorage.removeItem(key);
        } else {
            eraseCookie(key);
        }
        callback();
    } catch (error) {
        console.error('Error removing storage item:', error);
    }
}
