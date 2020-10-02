import * as React from "react";
import * as styles from "./styles.css";

import { Button } from "../Button/component";
import { Spinner } from "../Spinner/component";
import imageModalStore from "../../mobx/image-modal";
import imageStore from "../../mobx/images";

type ImageReelProps = {
    images: any[];
    loading?: boolean;
    onNextPage?: (direction: "next" | "previous") => void;
};

function ImageReel(props: ImageReelProps) {
    function imageClickHandler(imageItem: any) {
        imageStore.getSinglePhoto(imageItem.id);
        imageModalStore.toggle();
    }

    const imageMap = props.images.map((item) => {
        return (
            <div className={styles.imageWrapper} key={item["urls"].regular}>
                <img
                    onClick={imageClickHandler.bind(null, item)}
                    className={styles.image}
                    alt={item["alt_description"]}
                    src={item["urls"].regular}
                />
            </div>
        );
    });

    function navButtonsClickHandler(direction: "next" | "previous") {
        if (props.onNextPage) {
            props.onNextPage(direction);
        }
    }

    let node = null;
    if (props.loading) {
        node = <Spinner dark={true} width={100} height={100} />;
    } else if (!props.loading && props.images.length === 0) {
        node = (
            <div className={styles.error}>
                Sorry :( We don't have such photos!
            </div>
        );
    } else {
        node = (
            <>
                <div className={styles.reel}>{imageMap}</div>
                <div className={styles.footer}>
                    <Button
                        type="outline"
                        onClick={navButtonsClickHandler.bind(null, "previous")}
                    >
                        Previous
                    </Button>
                    <Button
                        type="outline"
                        onClick={navButtonsClickHandler.bind(null, "next")}
                    >
                        Next
                    </Button>
                </div>
            </>
        );
    }

    return <div className={styles.pageWrapper}>{node}</div>;
}

export { ImageReel };
