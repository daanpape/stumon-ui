/**
 * HoWest StuMON - scans.js 
 * (C) 2016 - Daan Pape
 * License: MIT
 */

/**
 * The Knockout viewmodel for the index page.
 * @returns {IndexViewModel} a new View model.
 */
function IndexViewModel() {
    var self = this;
    
    this.scans = ko.observableArray([]);
    
    /**
     * Update the scans.
     */
    this.updateScans = function() {
        $.getJSON('userapi/scans', function(data) {
            self.scans(data);
        });
    };
    
    /**
     * Clear the scan database
     */
    this.clearScans = function() {
        $.ajax({
            type: "DELETE",
            url: "userapi/scans",
            contentType : 'application/json',
            success: function() {
                self.scans([]);
            }
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
    viewModel.updateScans();
    
    setInterval(viewModel.updateScans, 250);
});