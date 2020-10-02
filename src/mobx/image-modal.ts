import { makeAutoObservable } from "mobx";

class ImageModalStore {
    open = false;
    currentImage: any = null;
    constructor() {
        makeAutoObservable(this);
    }
    toggle() {
        this.open = !this.open;
    }
}

export default new ImageModalStore();
