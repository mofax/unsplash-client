import { UNSPLASH_ACCESS_KEY } from "../../keys";
import Unsplash from "unsplash-js";
import { makeAutoObservable } from "mobx";

const unsplash = new Unsplash({
    accessKey: UNSPLASH_ACCESS_KEY,

    headers: {
        "X-Custom-Header": "Mastermind",
    },
});

// XXX: The unsplash SDK does not have topics, we implement a quick hack here
function topics() {
    const request = unsplash.request.bind(unsplash);

    return {
        listTopics(page = 1, perPage = 10) {
            const url = "/topics";
            const query = {
                page,
                per_page: perPage,
            };
            return request({ url, method: "GET", query });
        },
    };
}

const unsplashTopics = topics();

export class ImageStore {
    searching = false;
    fetchingSinglePhoto = false;
    searchTerm = "";
    searchResults: any = null;
    collections: any[] = [];
    currentPage = 1;
    selectedPhoto: any = null;
    constructor() {
        makeAutoObservable(this);
    }
    async gotoNextPage() {
        this.currentPage += 1;
        await this.search(this.searchTerm);
    }
    async gotoPreviousPage() {
        if (this.currentPage === 1) return;
        this.currentPage -= 1;
        await this.search(this.searchTerm);
    }
    search = async (term: string, collection?: string) => {
        this.searchTerm = term;
        this.searching = true;
        const res = await unsplash.search.photos(term, this.currentPage, 10, {
            collections: [collection as string],
        });
        const json = await res.json();
        this.searchResults = json;
        this.searching = false;
    };
    fetchCollections = async () => {
        this.searching = true;
        // const res = await unsplash.collections.listCollections(1, 10, "oldest");
        const res = await unsplashTopics.listTopics();
        const json = await res.json();
        if (Array.isArray(json)) {
            this.collections = json;
        } else {
            this.collections = json.results;
        }
        this.searching = false;
    };
    getSinglePhoto = async (id: string) => {
        this.fetchingSinglePhoto = true;
        const res = await unsplash.photos.getPhoto(id);
        const json = await res.json();
        this.selectedPhoto = json;
        this.fetchingSinglePhoto = false;
    };
}

export default new ImageStore();
