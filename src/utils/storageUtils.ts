function setCookie(name: string, value: string, days: number, domain: string) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; domain=' + domain;
}

function getCookie(name: string): Promise<string | null> {
    return new Promise(resolve => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                resolve(c.substring(nameEQ.length, c.length));
                return;
            }
        }
        resolve(null);
    });
}

function eraseCookie(name: string, domain: string) {
    document.cookie = name + '=; Max-Age=-99999999; path=/; domain=' + domain;
}

function isLocalStorageAvailable(): boolean {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function isSessionStorageAvailable(): boolean {
    try {
        const test = 'test';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

export function setStorageItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            if (isLocalStorageAvailable()) {
                localStorage.setItem(key, value);
            }
            if (isSessionStorageAvailable()) {
                sessionStorage.setItem(key, value);
            }
            const domain = window.location.hostname;
            setCookie(key, value, 7, domain);

            resolve();
        } catch (error) {
            console.error('Error setting storage item:', error);
            reject(error);
        }
    });
}

export function getStorageItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        try {
            if (isLocalStorageAvailable()) {
                const localStorageValue = localStorage.getItem(key);
                if (localStorageValue !== null) {
                    resolve(localStorageValue);
                    return;
                }
            }
            if (isSessionStorageAvailable()) {
                const sessionStorageValue = sessionStorage.getItem(key);
                if (sessionStorageValue !== null) {
                    resolve(sessionStorageValue);
                    return;
                }
            }
            getCookie(key).then(cookieValue => {
                if (cookieValue !== null) {
                    resolve(cookieValue);
                } else {
                    resolve(null);
                }
            });
        } catch (error) {
            console.error('Error getting storage item:', error);
            reject(error);
        }
    });
}

export function removeStorageItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            if (isLocalStorageAvailable()) {
                localStorage.removeItem(key);
            }
            if (isSessionStorageAvailable()) {
                sessionStorage.removeItem(key);
            }
            const domain = window.location.hostname;
            eraseCookie(key, domain);

            resolve();
        } catch (error) {
            console.error('Error removing storage item:', error);
            reject(error);
        }
    });
}
