import {ProbabilityListModel} from "../models/probability-list.model";

export const getRandomItem = <TItem>(
    probabilityList: ProbabilityListModel<TItem>,
    randomValue: number,
): TItem => {
    if (probabilityList.length === 0) {
        throw new Error("probabilityList must not be empty");
    }

    let cumulativeWeight = 0;

    for (const entry of probabilityList) {
        cumulativeWeight += entry.weight;
        if (randomValue <= cumulativeWeight) {
            return entry.item;
        }
    }

    return probabilityList[probabilityList.length - 1].item;
}