import { PixiContainer } from "../../plugins/engine";
import { Manager, SceneInterface } from "../../entities/manager";
import { LoadingBarContainer } from "../containers/loading-bar.container";
import { LOADER_WIDTH } from "../../shared/constant/constants";

export class LoaderScene extends PixiContainer implements SceneInterface {
    private _loadingBar: LoadingBarContainer;

    constructor() {
        super();
        const parentWidth = Manager.width;
        const parentHeight = Manager.height;

        const loaderBarWidth = LOADER_WIDTH;
        this._loadingBar = new LoadingBarContainer(loaderBarWidth, parentWidth, parentHeight);
        this.addChild(this._loadingBar);
    }

    progressCallback(progress: number): void {
        this._loadingBar.scaleProgress(progress);
    }

    update(): void {}
    resize(screenWidth: number, screenHeight: number): void { 
        this.width = screenWidth; 
        this.height = screenHeight; 
        this._loadingBar.resize(screenWidth, screenHeight);
    }
}