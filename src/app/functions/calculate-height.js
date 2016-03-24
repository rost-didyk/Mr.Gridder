import _ from 'underscore';

function maxItemsNumberHeightCalculate(items, minHeight, heightFactor, heightFactorState) {
    let neededIndex = heightFactorState == 'first' ? 0 : items.length - 1;
    return _(items).map((item, index)=>{
        item['height'] = (index == neededIndex) ? (minHeight + heightFactor) : minHeight;
        return item;
    });
}

function noneMaxItemNumberHeightCalculate(items, minHeight, heightFactor, maxItems, heightFactorState) {
    let missingElementsCount = maxItems - items.length;
    let appendHeight = (missingElementsCount * minHeight) / items.length;
    let neededIndex = heightFactorState == 'first' ? 0 : items.length - 1;
    return _(items).map((item, index)=>{
        let normalHeight = appendHeight + minHeight;
        item['height'] = (index == neededIndex) ? (normalHeight + heightFactor) : normalHeight;
        return item;
    });
}

export function maxItemsNumberInColumn(columnData) {
    return +(_(columnData).max(item=>{
        return item['itemsInColumn'];
    }))['itemsInColumn'];
}

export default function(columnData, minHeight, heightFactor = 0) {
    let maxItems = maxItemsNumberInColumn(columnData);
    let heightFactorState = 'first';

    return _(columnData).map((column)=>{

        if (column['itemsInColumn'] == maxItems) {
            column['items'] =  maxItemsNumberHeightCalculate( column['items'], minHeight, heightFactor,heightFactorState );
        } else {
            column['items'] = noneMaxItemNumberHeightCalculate( column['items'], minHeight, heightFactor, maxItems, heightFactorState);
        }

        heightFactorState = heightFactorState == 'first' ? 'last' : 'first';

        return column;
    });
}