import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Functions
import CalculateItemsInColumn from 'functions/items-in-columns.js';
import CalculateItemsHeight   from 'functions/calculate-height.js';
import CalculateListForShowMode from 'functions/calculate-show-mode-list.js'

export default Backbone.Model.extend({
    initialize: function(options) {
        this.columnsNumber = options.columnsNumber;
        this.minItemHeight = options.minItemHeight;
        this.heightFactor = options.heightFactor || 0;
        if (!options.url) {
            throw new Error("Parameters dataSourceUri not found");
        }
        this.initUrl = options.url;
    },

    url: function() {
        return this.initUrl
    },

    getData: function() {
        return this.get('data');
    },

    getColumnsAndItem: function() {
        return CalculateItemsInColumn( this.columnsNumber, this.getData() );
    },

    columnsData: function() {
        return CalculateItemsHeight(this.getColumnsAndItem(this.columnsNumber), this.minItemHeight, this.heightFactor);
    },

    getListForShowMode: function(column, index) {
        return CalculateListForShowMode(this.columnsData(), column, index);
    }
});