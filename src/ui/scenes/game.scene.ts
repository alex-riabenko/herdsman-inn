import { PixiContainer } from "../../plugins/engine";
import { Hero } from "../entities/Hero";
import { Animal } from "../entities/Animal";
import { Yard } from "../entities/Yard";
import { Score } from "../entities/Score";
import { Background } from "../entities/Background";
import { getRandomInt } from "../../shared/utils/utils";
import { getOffsetPosition, getManagerDimensions } from "../../shared/utils/utils";
import { SceneInterface } from "../../entities/manager";
import { MAX_ANIMALS, MAX_GROUP_SIZE, DISTANCE_FOR_GROUP } from "../../shared/constant/constants";

export class GameScene extends PixiContainer implements SceneInterface {
    private _mainHero: Hero;
    private _animals: Animal[] = [];
    private _yard: Yard;
    private _score: Score;
    private _background: Background;

    private targetPosition: { x: number; y: number } | null = null;
    private maxGroupSize: number = MAX_GROUP_SIZE;
    private spawnTimer: number | null = null;

    constructor() {
        super();
        this.interactive = true;
        this.position.set(0);

        const { width: parentWidth, height: parentHeight } = getManagerDimensions();
        this._mainHero = new Hero(parentWidth, parentHeight);
        this._background = new Background(parentWidth, parentHeight);
        
        const { x: yardX, y: yardY } = getOffsetPosition();
        this._yard = new Yard(yardX, yardY);

        this._score = new Score(10, 10);

        this.on("click", (event) => {
            if (!event) return;

            this.onClick(event.client);
        });
        
        this.addChild(this._background, this._mainHero, this._yard, this._score);

        this.spawnAnimals(MAX_ANIMALS);
        this.startAnimalSpawning();
    }

    startAnimalSpawning(): void {
        const spawnInterval = getRandomInt(3000, 10000);

        this.spawnTimer = setInterval(() => {
            const count = getRandomInt(1, 5);

            this.spawnAnimals(count);
        }, spawnInterval);
    }

    public clearSpawnTimer(): void {
        if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
            this.spawnTimer = null;
        }
    }

    update(): void {
        if (this.targetPosition) {
            this._mainHero.moveToPosition(this.targetPosition);
        }

        this._animals.forEach(animal => animal.update());
        this.moveAnimalsTowardHero();
        this.checkAnimalsInYard();
    }

    resize(parentWidth: number, parentHeight: number): void {
        const { x, y } = getOffsetPosition();

        this._mainHero.position.set(parentWidth / 2, parentHeight / 2);
        this._yard.updatePosition(x, y);
        this._background.resize(parentWidth, parentHeight);
        this.clearSpawnTimer();
    }

    private onClick(clientPosition: { x: number; y: number }): void {
        this.targetPosition = clientPosition;
    }

    private spawnAnimals(count: number): void {
        for (let i = 0; i < count; i++) {
            const animal = new Animal();
            this._animals.push(animal);
            this.addChild(animal);
        }
    }

    private moveAnimalsTowardHero(): void {
        let groupCount = 0; 
        this._animals.forEach(animal => {
            const distance = Math.sqrt(
                Math.pow(animal.x - this._mainHero.x, 2) +
                Math.pow(animal.y - this._mainHero.y, 2)
            );

            if (groupCount < this.maxGroupSize && distance < DISTANCE_FOR_GROUP) {
                animal.moveToward({ x: this._mainHero.x, y: this._mainHero.y });
                
                if (distance < 90) {
                    groupCount++;
                }
            } else {
              animal.stopFollowing();
            }
        });
    }

    private checkAnimalsInYard(): void {
        this._animals = this._animals.filter(animal => {
            if (!this.isInYard(animal)) {
                return true;
            }

            this._score.increment();
            this.removeChild(animal);
            return false;
        });
    }

    private isInYard(animal: Animal): boolean {
        const yardBounds = this._yard.getBounds();
        const animalBounds = animal.getBounds();

        return (
            animalBounds.x + animalBounds.width > yardBounds.x &&
            animalBounds.x < yardBounds.x + yardBounds.width &&
            animalBounds.y + animalBounds.height > yardBounds.y &&
            animalBounds.y < yardBounds.y + yardBounds.height
        );
    }
}