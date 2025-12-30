sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.client.itrequestmanager.itrequestmanager.controller.Dashboard", {
        onNavCreate: function() {
            console.log("Navigating to Create Request");
            this.getOwnerComponent().getRouter().navTo("RouteCreate");
        },

        onNavMyRequests: function() {
            console.log("Navigating to My Requests");
            this.getOwnerComponent().getRouter().navTo("RouteMyRequests");
        },

        onHelp: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            MessageBox.information(oBundle.getText("helpMessage"));
        },

        onInit: function() {
            console.log("Dashboard controller initialized");
        }
    });
});