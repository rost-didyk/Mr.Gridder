import _ from 'underscore';

function itemsInColumn(columnNumber, items) {
    return Math.ceil( items / columnNumber );
}

function calculate(columnNumber, itemsNumber) {
    let res = [];
    while (columnNumber) {
        let calculateItemsInColumn = itemsInColumn( columnNumber, itemsNumber );
        res.push({
            columnNumber: columnNumber,
            itemsInColumn: calculateItemsInColumn
        });
        columnNumber -= 1;
        itemsNumber -= calculateItemsInColumn;
    }
    return res;
}

export default function(columnNumber,data) {
    let itemsNumber = data.length;
    let columnsData =  calculate( columnNumber, itemsNumber );
    let endIndex = 0;
    return _(columnsData).map((item)=>{
        let startIndex = endIndex;
        endIndex += item['itemsInColumn'];
        item['items'] = data.slice(startIndex, endIndex);
        return item;
    });
}
