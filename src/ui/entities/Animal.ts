import { PixiGraphics } from "../../plugins/engine";
import { ANIMAL_SPEED, DISTANCE_FOR_GROUP } from "../../shared/constant/constants";
import { BG_ANIMAL_COLOR } from "../../shared/constant/colors";
import { getManagerDimensions, getRandomInt } from "../../shared/utils/utils";

export class Animal extends PixiGraphics {
    private speed: number = 0.5;
    private patrolDirection: { x: number; y: number };
    private patrolInterval: number = 0;
    private isFollowing: boolean = false;

    constructor() {
        super();
        this.patrolDirection = { x: 0, y: 0 };
        this.resetPosition();
        this.drawAnimal();
        this.initializePatrol();
    }

    private drawAnimal(): void {
        this.clear();
        this.circle(0, 0, 8).fill(BG_ANIMAL_COLOR);
    }

    resetPosition(): void {
        const { width, height } = getManagerDimensions();

        this.position.set(Math.random() * width + 25, Math.random() * height + 25);
        this.updatePatrolDirection();
    }

    private initializePatrol(): void {
        this.setPatrolInterval();
    }

    private setPatrolInterval(): void {
        if (this.patrolInterval) {
            clearInterval(this.patrolInterval);
        }
        
        this.patrolInterval = setInterval(() => {
            if (!this.isFollowing) {
                this.updatePatrolDirection();
            }
        }, getRandomInt(2000, 1000));
    }

    private updatePatrolDirection(): void {
        const angle = Math.random() * 2 * Math.PI;
        this.patrolDirection = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
    }

    update(): void {
        if (this.isFollowing) return;

        const { width, height } = getManagerDimensions();
        this.position.x += this.patrolDirection.x * this.speed;
        this.position.y += this.patrolDirection.y * this.speed;

        if (this.x < 0 || this.x > width) {
            this.patrolDirection.x *= -1;
        }
        if (this.y < 0 || this.y > height) {
            this.patrolDirection.y *= -1;
        }
    }

    moveToward(target: { x: number; y: number }): void {
        this.isFollowing = true;
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < DISTANCE_FOR_GROUP && distance > 5) {
            this.x += (dx / distance) * ANIMAL_SPEED;
            this.y += (dy / distance) * ANIMAL_SPEED;
        }
    }

    stopFollowing(): void {
        this.isFollowing = false;
    }
}