function setCookie(name: string, value: string, days: number) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
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

function eraseCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// function isLocalStorageAvailable(): boolean {
//     try {
//         const test = 'test';
//         localStorage.setItem(test, test);
//         localStorage.removeItem(test);
//         return true;
//     } catch (e) {
//         return false;
//     }
// }

// function isSessionStorageAvailable(): boolean {
//     try {
//         const test = 'test';
//         sessionStorage.setItem(test, test);
//         sessionStorage.removeItem(test);
//         return true;
//     } catch (e) {
//         return false;
//     }
// }

export function setStorageItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            setCookie(key, value, 7);
            // if (isLocalStorageAvailable()) {
            //     localStorage.setItem(key, value);
            // } else if (isSessionStorageAvailable()) {
            //     sessionStorage.setItem(key, value);
            // } else {
            //     setCookie(key, value, 7);
            // }
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
            getCookie(key).then(resolve);
            // if (isLocalStorageAvailable()) {
            //     resolve(localStorage.getItem(key));
            // } else if (isSessionStorageAvailable()) {
            //     resolve(sessionStorage.getItem(key));
            // } else {
            //     getCookie(key).then(resolve);
            // }
        } catch (error) {
            console.error('Error getting storage item:', error);
            reject(error);
        }
    });
}

export function removeStorageItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            eraseCookie(key);
            // if (isLocalStorageAvailable()) {
            //     localStorage.removeItem(key);
            // } else if (isSessionStorageAvailable()) {
            //     sessionStorage.removeItem(key);
            // } else {
            //     eraseCookie(key);
            // }
            resolve();
        } catch (error) {
            console.error('Error removing storage item:', error);
            reject(error);
        }
    });
}
