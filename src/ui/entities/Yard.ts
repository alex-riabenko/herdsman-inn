import { PixiGraphics } from "../../plugins/engine";
import { BG_YARD_COLOR } from "../../shared/constant/colors";

export class Yard extends PixiGraphics {
    constructor(x: number, y: number) {
        super();
        this.drawYard();
        this.position.set(x, y);
    }

    private drawYard(): void {
        this.clear();
        this.rect(0, 0, 50, 50).fill(BG_YARD_COLOR);
    }

    public updatePosition(x: number, y: number): void {
        this.position.set(x, y);
    }
}