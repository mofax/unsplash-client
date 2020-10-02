import * as React from "react";
import * as styles from "./styles.css";

import { classNames } from "../../tools/classnames";

type SpinnerProps = {
    width?: number;
    height?: number;
    dark?: boolean;
};

export function Spinner(props: SpinnerProps) {
    const inline = {
        width: props.width,
        height: props.height,
    };
    const optionalClasses: string[] = [];
    if (props.dark) {
        optionalClasses.push(styles.dark);
    }
    const classes = classNames(styles.spinner, optionalClasses);

    return <span className={classes} style={inline}></span>;
}

Spinner.defaultProps = {
    width: 16,
    height: 16,
};
