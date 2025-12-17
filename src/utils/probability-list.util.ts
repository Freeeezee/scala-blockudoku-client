import {ProbabilityListModel} from "../models/probability-list.model";

export const getRandomItem = <TItem> (
    probabilityList: ProbabilityListModel<TItem>,
    randomValue: number,
): TItem => {
    let cumulativeWeight = 0;

    probabilityList.forEach(entry => {
        cumulativeWeight += entry.weight;

        if (randomValue > cumulativeWeight) return entry.item;
    });

    return probabilityList[probabilityList.length - 1].item;
}