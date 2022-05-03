export const useDebounce = (fn: Function, delay = 0, immediate = false) => {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => {
		if (immediate && !timeout)
            fn(...args);
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

export const useDebouncedRef = (initialValue: string, delay: number, immediate = false) => {
	const state = ref(initialValue);
	const debouncedRef = customRef((track, trigger) => ({
		get() {
			track();
			return state.value;
		},
		set: useDebounce(
			(value: string) => {
				state.value = value;
				trigger();
			},
			delay,
			immediate
		)
	}));
	return debouncedRef;
};
