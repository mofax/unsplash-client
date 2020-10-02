import "react-dropdown/style.css";

import * as React from "react";
import * as styles from "./styles.css";

import Dropdown, { ReactDropdownProps } from "react-dropdown";

export function SelectInput(props: ReactDropdownProps) {
    return (
        <Dropdown
            className={styles.input}
            placeholderClassName={styles.placeholder}
            menuClassName={styles.menu}
            {...props}
        />
    );
}
