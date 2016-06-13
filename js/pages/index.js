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
}

/**
 * Page initialisation handler.
 */
$('document').ready(function() {
    ko.applyBindings(new IndexViewModel());
});