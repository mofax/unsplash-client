import * as React from "react";
import * as styles from "./styles.css";

import { ImageStore } from "../../mobx/images";
import { Spinner } from "../Spinner/component";
import { classNames } from "../../tools/classnames";
import imageModalStore from "../../mobx/image-modal";
import { observer } from "mobx-react";

type ImageDetailsModalProps = {
    store?: any;
    imageStore: ImageStore;
};

export class ImageDetailsModalComponent extends React.PureComponent<
    ImageDetailsModalProps,
    {}
> {
    constructor(props: any) {
        super(props);
    }
    async componentDidMount() {
        if (!this.props.store.currentImage) {
            return;
        }

        const body = document.getElementById("body");
        body?.classList.add("noscroll");

        await this.props.imageStore.getSinglePhoto(
            this.props.store.currentImage.id
        );
    }
    componentWillUnmount() {
        const body = document.getElementById("body");
        body?.classList.remove("noscroll");
    }

    render() {
        const overlayClasses = [styles.overlay];

        if (this.props.store.open !== true)
            [overlayClasses.push(styles.hidden)];

        if (this.props.imageStore.fetchingSinglePhoto) {
            return (
                <div
                    className={classNames(overlayClasses)}
                    onClick={() => imageModalStore.toggle()}
                >
                    <div className={styles.detailsBox}>
                        <Spinner dark />
                    </div>
                </div>
            );
        }

        const image = this.props.imageStore.selectedPhoto;

        if (!image) {
            return null;
        }

        const imageUrl = image["urls"].regular;
        const user = image["user"];

        const userDetails = {
            name: user.name,
            username: user.username,
            thumbnail: user["profile_image"].small,
            link: user["links"].html,
        };

        let exifNode = null;

        if (image.exif) {
            const data = [
                "make",
                "model",
                "iso",
                "aperture",
                "exposure_time",
                "focal_length",
            ];

            exifNode = (
                <div>
                    {data.map((item: string) => {
                        if (!image.exif[item]) return null;

                        return (
                            <div>
                                <strong>{item}</strong>: {image.exif[item]}
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div
                className={classNames(overlayClasses)}
                onClick={() => imageModalStore.toggle()}
            >
                <div className={styles.detailsBox}>
                    <img src={imageUrl} />
                    <div className={styles.userDetails}>
                        <img src={userDetails.thumbnail} />
                        <div>
                            <h2>{userDetails.name}</h2>
                            <a href={userDetails.link}>
                                @{userDetails.username}
                            </a>
                        </div>
                    </div>

                    <div className={styles.exif}>{exifNode}</div>
                </div>
            </div>
        );
    }
}

export const ImageDetailsModal = observer(ImageDetailsModalComponent);
