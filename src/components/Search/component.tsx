import * as React from "react";
import * as styles from "./styles.css";

import { Button } from "../Button/component";
import { Logo } from "../../svg/logo";
import { SelectInput } from "../SelectInput/component";
import { TextInput } from "../TextInput/component";
import { classNames } from "../../tools/classnames";

type ImageSearchProps = {
    collections: any[];
    onSearch?: (searchTerm: string, collection: string) => void;
    searching?: boolean;
    collapsed: boolean;
};
export function ImageSearch(props: ImageSearchProps) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCollection, setCollection] = React.useState("");

    const [shake, setShake] = React.useState(false);

    function searchButtonClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!searchTerm) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 1000);
        } else {
            if (props.onSearch && props.onSearch.call) {
                props.onSearch(searchTerm, selectedCollection);
            }
        }
    }

    const collectionOptions = props.collections.map((c) => {
        return { label: c.title, value: c.id };
    });

    const wrapperClassnames = [styles.wrapper];
    if (props.collapsed) {
        wrapperClassnames.push(styles.wrapperCollapsed);
    }
    return (
        <div className={classNames(wrapperClassnames)}>
            <div className={styles.searchbox}>
                <div className={styles.logo}>
                    <Logo />
                    <br></br>
                    <div className={styles.text}>
                        <strong>image</strong>&nbsp;search
                    </div>
                </div>
                <div className={styles.textinput}>
                    <TextInput
                        className={shake && styles.shake}
                        value={searchTerm}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setSearchTerm((e.target as HTMLInputElement).value)
                        }
                        placeholder="Query"
                    />
                    <SelectInput
                        placeholder="Collections"
                        options={collectionOptions}
                        value={selectedCollection}
                        onChange={(arg) => {
                            setCollection(arg.value);
                        }}
                    ></SelectInput>
                </div>
                <Button
                    onClick={searchButtonClickHandler}
                    disabled={props.searching}
                    spinning={props.searching}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}
