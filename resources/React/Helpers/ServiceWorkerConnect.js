import Logger from "./Logger";

/**
 * Sends a message to the service worker
 * @param message
 */
export const sendSwMessage = (message, callback = () => {}) => {
    if (navigator.serviceWorker.controller) {
        // create a new message channel for bi-directional communication
        const messageChannel = new MessageChannel();

        // set callback for onmessage listener
        messageChannel.port1.onmessage = callback;

        // post the message to the service worker
        navigator.serviceWorker.controller.postMessage(message, [
            messageChannel.port2
        ]);
    }
};

/**
 * clear all service worker cache
 */
export const clearSw = () => {
    sendSwMessage({ type: "CLEAR_ALL" }, message => {
        Logger.debug("CLEAR_ALL response: ", message.data);
        // if we have a swRegistration unregister it to avoid warnings
        if (window.swRegistration) {
            window.swRegistration.unregister();
            Logger.debug("Unregistered the service worker");
        }
    });
};

/**
 * Refresh a specific page
 *
 * @param path
 */
export const refreshSw = path => {
    sendSwMessage(
        {
            type: "REFRESH_CACHE",
            url: path
        },
        message => {
            Logger.debug("REFRESH_CACHE response: ", message.data);
        }
    );
};
