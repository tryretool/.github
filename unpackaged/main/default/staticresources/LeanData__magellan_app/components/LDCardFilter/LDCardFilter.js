/**
 * Reusable Component to reproduce one card filter.
 * 
 * Instead of using pure vanilla HTML to produce a card filter:
 * 
 * Use this:
 * <div id="card-filter"></div>
 * ...
 * const cardFilter = this.$el.find('#card-filter') // or $('#card-filter')
 * cardFilter.LDCardFilter({
 *   label: 'Foobar',
 *   icon: '<svg></svg>'
 *   checked: true, // or false
 *   name: 'foo',
 *   value: 'bar',
 *   onSelectCallback: (value, event) => console.log(value, event),
 * });
 * 
 * Use the same name like normal to allow multiple LDCardFilters to
 * interact as a set.
 */
module.exports = function() {
  const template = require('./LDCardFilter.template.html');

  const CardFilter = Backbone.View.extend({
    template: _.template(template),
    events: {
      'change input': 'onSelect',
    },

    // quirk with javascript only triggers 'change input' for
    // the card filter checked, but we future-proof with
    // if check anyways
    onSelect: function (event) {
      const checked = event.currentTarget.checked;
      if (checked) {
        this.onSelectCallback(this.value, event);
      }
    },

    initialize: function (options) {
      this.label = options.label;
      this.icon = options.icon;
      this.name = options.name;
      this.checked = options.checked;
      this.value = options.value;
      this.onSelectCallback = options.onSelectCallback;
      this.render();
    },

    render: function() {
      this.$el.html(
        this.template({
          label: this.label,
          icon: this.icon,
          name: this.name,
          checked: this.checked,
          value: this.value,
        })
      );
    },
  });

  $.fn.LDCardFilter = function (options) {
    const cardFilter = new CardFilter(options);
    $(this).html(cardFilter.$el);
    return cardFilter;
  };
};
