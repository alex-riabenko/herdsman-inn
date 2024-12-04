import './style.css';
import '@pixi/gif';
import { App } from './app';
import { BG_APP_COLOR } from './shared/constant/colors';
import { Manager } from './entities/manager';
import { IPixiApplicationOptions } from './plugins/engine';
import { GameScene } from './ui/scenes/game.scene';

const boostsrap = async () => {
    const canvas = document.getElementById("pixi-screen") as HTMLCanvasElement;
    const resizeTo = window;
    const resolution = window.devicePixelRatio || 1;
    const autoDensity = true;
    const backgroundColor = BG_APP_COLOR;
    const appOptions: Partial<IPixiApplicationOptions> = {
        canvas,
        resizeTo,
        resolution,
        autoDensity,
        backgroundColor
    }

    const application = new App();
    await application.init(appOptions);

    Manager.init(application);
    Manager.changeScene(new GameScene());
}

boostsrap();
