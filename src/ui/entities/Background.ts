import { PixiGraphics } from "../../plugins/engine";
import { BG_SCENE_COLOR } from '../../shared/constant/colors'; // Import the background color constant

export class Background extends PixiGraphics {
    constructor(parentWidth: number, parentHeight: number) {
        super();
        this.drawBackground(parentWidth, parentHeight);
    }

    private drawBackground(width: number, height: number): void {
        this.clear();
        this.rect(0, 0, width, height).fill(BG_SCENE_COLOR);
    }

    public resize(width: number, height: number): void {
        this.drawBackground(width, height);
    }
}