import { PixiGraphics } from "../../plugins/engine";
import { BG_HERO_COLOR } from "../../shared/constant/colors";
import { HERO_SPEED } from "../../shared/constant/constants";

export class Hero extends PixiGraphics {
    constructor(parentWidth: number, parentHeight: number) {
        super();
        this.drawHero(parentWidth, parentHeight);
    }

    private drawHero(parentWidth: number, parentHeight: number): void {
        this.clear();
        this.circle(0, 0, 10).fill(BG_HERO_COLOR);
        this.position.set(parentWidth / 2, parentHeight / 2);
    }

    public moveToPosition(targetPosition: { x: number; y: number }): void {
        const dx = targetPosition.x - this.x;
        const dy = targetPosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            const speed = HERO_SPEED;
            this.x += (dx / distance) * speed;
            this.y += (dy / distance) * speed;
        }
    }
}