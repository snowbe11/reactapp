import hotkeys from "hotkeys-js"

const observerMap = {};

export function addKeyObserver(key, callback) {
    if (!observerMap[key]) {
        observerMap[key] = [];
        hotkeys(key, () => executeCallback(key));
    }

    observerMap[key].push(callback);
}

export function removekeyObserver(key, callback) {
    if (observerMap[key]) {
        observerMap[key] = observerMap[key].filter(item => item !== callback);
    }
}

function executeCallback(key) {
    for (const callback of observerMap[key]) {
        callback();
    }
}