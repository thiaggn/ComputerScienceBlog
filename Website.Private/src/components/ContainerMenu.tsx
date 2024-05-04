import s from "../styles/ContainerMenu.module.scss";
import {useState} from "react";

import {join} from "../lib/utils/join.ts";

type Properties = {
    items: { label: string, key: any }[]
    onSelect: (key: any) => void,
    className?: string
}
export default function ContainerMenu({items, onSelect, className}: Properties) {

    const [selected, setSelected] = useState(items[0].key)

    const handleSelect = (key: any) => {
        setSelected(key)
        onSelect(key)
    }

    return <div className={join(s.containerMenu, className)}>
        {items.map((item) => {
            const isSelected = item.key === selected;

            const classes = [s.item, isSelected ? s.selected : ""].join(" ");

            return <div className={classes} key={item.key} onClick={handleSelect.bind(null, item.key)}>
                <div className={s.label}>
                    {item.label}
                </div>

                <div className={s.stripWrapper}>
                    <div className={s.strip}></div>
                </div>
            </div>
        })}
    </div>
}