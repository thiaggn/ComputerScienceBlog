import s from "./GIcon.module.scss";
import {useState} from "react";

import {join} from "../lib/utils/join.ts";

type Properties = {
    children: string,
    fill?: boolean,
    weight?: number,
    grade?: number,
    opticalsize?: number,
    color?: string,
    size?: number
    className?: string
}

export default function GIcon({children, fill, weight, grade, opticalsize, color, size, className}: Properties){

    const [isFilled, setIsFilled] = useState(0);

    if(fill && !isFilled) {
        setIsFilled(1);
    }

    else if(!fill && isFilled) {
        setIsFilled(0);
    }

    return <span className={join('gicon', className)}
        style={{
            fontVariationSettings: `'FILL' ${isFilled}, 'wght' ${weight || 400}, 'GRAD' ${grade || 0}, 'opsz' ${opticalsize || 24}`,
            color: 'inherit',
            fontSize: size || 24,
        }}
    >
        {children}
    </span>
}