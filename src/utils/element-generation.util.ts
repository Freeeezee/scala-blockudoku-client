import {GridModel} from "../models/grid.model";
import {ElementModel} from "../models/element.model";
import {PCG32Random} from "./pcg32.util";
import {generateSeed} from "./seed-generation.util";
import {PointModel} from "../models/point.model";
import {getRandomItem} from "./probability-list.util";
import {elementProbabilityList} from "../constants/element-probability-list.constant";

export const generateElement = async (
    slot: number,
    grid: GridModel,
    sessionId: string
): Promise<ElementModel> => {
    const random = PCG32Random.create(await generateSeed(grid, sessionId));

    const points: PointModel[] = [{xPos: 0, yPos: 0}];
    const length = getRandomItem(elementProbabilityList, random.nextFloat());
    const randomColor = random.nextIntMax(5);

    for (let i = 0; i < length; i++) {
        points.push(generateNextPoint(points, random));
    }

    return {
        colors: randomColor,
        slot,
        structure: points,
    }
}

const generateNextPoint = (
    points: PointModel[],
    pcg32: PCG32Random,
): PointModel => {
    const possiblePoints = Array.from({ length: 8 }, (_, num) =>
        pointFromDirection(points[points.length - 1], num)
    ).filter(
        p => !points.some(q => q.xPos === p.xPos && q.yPos === p.yPos)
    );

    return possiblePoints[pcg32.nextIntMax(possiblePoints.length)];
}

const pointFromDirection = (
    point: PointModel,
    direction: number
): PointModel => {
    switch (direction) {
        case 0: return { xPos: point.xPos + 1, yPos: point.yPos };     // east
        case 1: return { xPos: point.xPos + 1, yPos: point.yPos - 1 }; // south-east
        case 2: return { xPos: point.xPos, yPos: point.yPos - 1 };     // south
        case 3: return { xPos: point.xPos - 1, yPos: point.yPos - 1 }; // south-west
        case 4: return { xPos: point.xPos - 1, yPos: point.yPos };     // west
        case 5: return { xPos: point.xPos - 1, yPos: point.yPos + 1 }; // north-west
        case 6: return { xPos: point.xPos, yPos: point.yPos + 1 };     // north
        case 7: return { xPos: point.xPos + 1, yPos: point.yPos + 1 }; // north-east
        default: throw new Error("Invalid direction");
    }
}
