import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Assim que "value" atualizar, o componente vai desmontar
        // e o timeout será cancelado.
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}