/**
 * HoWest StuMON - index.js 
 * (C) 2016 - Daan Pape
 * License: MIT
 */

/**
 * The Knockout viewmodel for the index page.
 * @returns {IndexViewModel} a new View model.
 */
function IndexViewModel() {
    var self = this;
    
    this.scanners = ko.observableArray([]);
    
    /**
     * Update the online scanner list.
     */
    this.updateOnlineScaners = function() {
        $.getJSON('userapi/scanners', function(data) {
            self.scanners(data);
        });
    };
}

/**
 * Page initialisation handler.
 */
$('document').ready(function() {
    var viewModel = new IndexViewModel();
    ko.applyBindings(viewModel);
    
    setInterval(viewModel.updateOnlineScaners, 1000);
});