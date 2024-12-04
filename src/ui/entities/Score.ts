import { PixiText } from "../../plugins/engine";
import { SCORE_TEXT } from "../../shared/constant/constants";
import { TEXT_COLOR } from "../../shared/constant/colors";

export class Score extends PixiText {
    private score: number;

    constructor(initialX: number, initialY: number) {
        super({
            text: `${SCORE_TEXT}: 0`,
            style: { 
                fontSize: 24,
                fill: TEXT_COLOR
            }
        });
        this.score = 0;
        this.position.set(initialX, initialY);
    }

    public increment(): void {
        this.score++;
        this.updateText();
    }

    private updateText(): void {
        this.text = `${SCORE_TEXT}: ${this.score}`;
    }
}