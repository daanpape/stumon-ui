/**
 * HoWest StuMON - login.js 
 * (C) 2016 - Daan Pape
 * License: MIT
 */

/**
 * The Knockout viewmodel for the login page.
 * @returns {LoginViewModel} a new View model.
 */
function LoginViewModel() {
    var self = this;
    
    this.username = ko.observable();
    this.password = ko.observable();
    
    /**
     * Try to login the user with the credentials in
     * the username and password variables.
     */
    this.login = function() {
        $.ajax({
            type: "POST",
            url: "userapi/login",
            contentType : 'application/json',
            data: JSON.stringify({ username : self.username(), password : self.password()}),
            success: function() {
                console.log("Logon Ok");
                window.location.href = "index.html";
            },
            error: function (xhr) {
                if(xhr.status == 403) {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: "Kon niet aanmelden",
                        message: "De gebruikersnaam en wachtwoord combinatie zijn niet correct.",
                        buttons: [{
                            label: 'Ok',
                            action: function(dialog) {
                                dialog.close();
                            }
                        }]
                    });
                } else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: "Kon niet aanmelden",
                        message: "Er is een onbekende aanmeldfout opgetreden, probeer het later opnieuw",
                        buttons: [{
                            label: 'Ok',
                            action: function(dialog) {
                                dialog.close();
                            }
                        }]
                    });
                }
            }
        });    
    };
}

/**
 * Page initialisation handler.
 */
$('document').ready(function() {
    ko.applyBindings(new LoginViewModel());
});