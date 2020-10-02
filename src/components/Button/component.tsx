import * as React from "react";
import * as styles from "./styles.css";

import { Spinner } from "../Spinner/component";
import { classNames } from "../../tools/classnames";

type ButtonProps = {
    spinning?: boolean;
    type: "outline" | "pill";
};

export function Button(
    props: ButtonProps & React.HTMLProps<HTMLButtonElement>
) {
    const { spinning, children, ...otherProps } = props;
    return (
        <button
            {...otherProps}
            className={classNames(styles.button, styles[props.type])}
            type="button"
        >
            {children}
            {spinning ? <Spinner /> : null}
        </button>
    );
}

Button.defaultProps = {
    type: "pill",
};
