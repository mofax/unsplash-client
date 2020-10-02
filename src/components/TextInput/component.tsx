import * as React from "react";
import * as styles from "./styles.css";

import { classNames } from "../../tools/classnames";

export function TextInput(props: React.HTMLProps<HTMLInputElement>) {
    const { className, ...otherProps } = props;
    const classes = classNames(className, styles.input);

    return (
        <div className={styles.inputWrapper}>
            <input {...otherProps} className={classes} />
        </div>
    );
}
