import { ReactNode } from "react";
import style from "./Button.module.css"

export function Button({ children, onclick}: { children: ReactNode, onclick:()=>void }) {
    return <button className={style.button} onClick={onclick}>
        {children}
    </button>
}