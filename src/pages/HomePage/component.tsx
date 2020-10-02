import * as React from "react";

import { ImageDetailsModal } from "../../components/ImageDetailsModal/component";
import { ImageReel } from "../../components/ImageReel/component";
import { ImageSearch } from "../../components/Search/component";
import imageDetailsStore from "../../mobx/image-modal";
import imageStore from "../../mobx/images";
import { observer } from "mobx-react-lite";

function HomePageComponent() {
    async function searchImages(term: string, collection?: string) {
        await imageStore.search(term, collection);
    }

    async function navigatePage(direction: "next" | "previous") {
        if (direction === "next") {
            imageStore.gotoNextPage();
        } else {
            imageStore.gotoPreviousPage();
        }
    }

    React.useEffect(() => {
        imageStore.fetchCollections();
    }, []);

    let reelNode = null;
    if (!!imageStore.searchResults) {
        reelNode = (
            <>
                <ImageReel
                    loading={imageStore.searching}
                    images={imageStore.searchResults?.results}
                    onNextPage={navigatePage}
                />
                <ImageDetailsModal
                    store={imageDetailsStore}
                    imageStore={imageStore}
                />
            </>
        );
    }
    return (
        <div>
            <ImageSearch
                collapsed={!!imageStore.searchResults}
                collections={imageStore.collections}
                onSearch={searchImages}
                searching={imageStore.searching}
            />
            {reelNode}
        </div>
    );
}

export const HomePage = observer(HomePageComponent);
