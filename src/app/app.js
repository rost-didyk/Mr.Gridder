import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Models
import Model from 'models/model.js';

// Templates
import listHtml from 'templates/list.html';

// Functions
import {maxItemsNumberInColumn} from 'functions/calculate-height.js';

let App =  Backbone.View.extend({

    initialize: function(options) {
        this.columnsNumber = options.columnsNumber || 4;

        this.model = (new Model({
            url: options.dataSourceUri,
            columnsNumber: this.columnsNumber,
            minItemHeight: options.minItemHeight,
            heightFactor:  options.heightFactor || 0
        }));

        this.hoverEffect = options.hoverEffect || 'pulse';
    },

    hoverAnimation: function() {
        return 'animated ' + this.hoverEffect;
    },

    events: {
        'mouseenter .js-column-item': 'onAddHoverAnimation',
        'mouseleave .js-column-item': 'onRemoveHoverAnimation'
    },

    render: function() {
        let promise = this.model.fetch();

        promise.done((d)=>{
            this.model.set('data', d);
            this.renderListMode();
        });

        return this;
    },

    renderListMode: function() {
        let template = _.template(listHtml);

        let columnsData = this.model.columnsData();

        let columnCss = Math.floor(12 / this.columnsNumber);

        this.$el.html(template({
            columnsData,
            columnCss
        }));

        this.fixHeightWithMargin(this.model.getColumnsAndItem());
    },

    fixHeightWithMargin: function(data) {
        let maxItems = maxItemsNumberInColumn(data);
        let $columns = this.$('.js-column');
        let marginBottom = this.calculateItemMarginBottom('js-column-item');
        $.each($columns, function() {
            let $column = $(this);
            let $items = $column.find('.js-column-item');
            if ($items.length != maxItems) {
                let missedItems = maxItems - $items.length;
                let missedHeight = missedItems * marginBottom;
                let $lastItem = $items.last();
                let calculate =  ($lastItem.outerHeight() + missedHeight);
                $lastItem.css('height', calculate + 'px');
            }
        });
    },

    calculateItemMarginBottom: function(selector) {
        let $item = this.$('.' + selector).first();
        return $item.outerHeight(true) - $item.outerHeight();
    },

    // events
    onAddHoverAnimation: function(e) {
        let $el = $(e.currentTarget);
        $el.addClass(_.bind(this.hoverAnimation, this));
    },

    onRemoveHoverAnimation: function(e) {
        let $el = $(e.currentTarget);
        $el.removeClass(_.bind(this.hoverAnimation,this));
    }
});

window.Gridder = App;

export let Gridder = App;