import { useState, useEffect, useMemo } from "react";

export function useLocalStorageState(initialState, key) {
	const storedValue = useMemo(() => localStorage.getItem(key), [key]);

	const [value, setValue] = useState(() => {
		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	console.log("value", value);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}
