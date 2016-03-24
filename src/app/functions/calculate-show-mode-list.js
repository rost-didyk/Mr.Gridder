import _ from 'underscore';

function toFlatList(data, columnNumber, itemIndex) {

    let getSelectColumnItems = (_(data).findWhere({
        'columnNumber': columnNumber
    }))['items'];

    let prepareSelectedColumnItems  = setActiveToTrue(getSelectColumnItems,itemIndex);

    let otherFilterList = _(data).filter((d) => {
        return (d['columnNumber'] != columnNumber);
    });

    let otherList = _(otherFilterList).map(d=>{
        return d['items'];
    });

    otherList.push(prepareSelectedColumnItems);

    return _(otherList).flatten();
}

function setActiveToTrue(list, itemIndex) {
    list[itemIndex]['active'] = 1;
    return list
}


export default function(data, columnNumber, itemIndex) {
    let lists = toFlatList(data, columnNumber, itemIndex);
    return {
        items: lists,
        preview: _(lists).findWhere({active:1})
    }
}