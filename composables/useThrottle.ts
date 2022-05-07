export const useThrottle = (fn: Function, delay = 1000) => {
    let shouldWait = false;
    let waitingArgs: any;

    const timeout = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            fn(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeout, delay);
        }
    };

    return (...args: any[]) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        fn(...args);
        shouldWait = true;

        setTimeout(timeout, delay);
    };
};
