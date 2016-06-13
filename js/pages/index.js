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
    
    /**
     * Delete the user session.
     */
    this.logout = function() {
        $.ajax({
            type: "DELETE",
            url: "userapi/session",
            contentType : 'application/json',
            success: function() {
                window.location.href = "login.html";
            }
        });
    };
}

/**
 * Page initialisation handler.
 */
$('document').ready(function() {
    var viewModel = new IndexViewModel();
    ko.applyBindings(viewModel);
    
    // Go to login page when not logged in
    $.ajaxSetup({
        error: function(xhr, textStatus, errorThrown){
            if(xhr.status === 403) {
                window.location.href = "login.html";
            }
        }
    });
    viewModel.updateOnlineScaners();
    
    setInterval(viewModel.updateOnlineScaners, 1000);
});