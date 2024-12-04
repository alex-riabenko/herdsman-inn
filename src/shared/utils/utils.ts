import { Manager } from "../../entities/manager";

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getManagerDimensions(): { width: number; height: number } {
    return {
        width: Manager.width,
        height: Manager.height
    };
}

export function getOffsetPosition(offsetX: number = 60, offsetY: number = 60): { x: number; y: number } {
    const { width, height } = getManagerDimensions();

    return {
        x: width - offsetX,
        y: height - offsetY
    };
}