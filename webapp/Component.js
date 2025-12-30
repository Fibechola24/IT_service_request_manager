sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function(UIComponent, JSONModel, Device) {
    "use strict";

    return UIComponent.extend("com.client.itrequestmanager.itrequestmanager.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            // Call parent init
            UIComponent.prototype.init.apply(this, arguments);

            console.log("Component initialized");

            // Create device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // Create requests model
            var oRequestsModel = new JSONModel({
                requests: []
            });
            this.setModel(oRequestsModel, "requestsModel");

            // Create a view model for other data
            var oViewModel = new JSONModel({
                busy: false,
                delay: 0
            });
            this.setModel(oViewModel, "view");

            // Initialize router
            this.getRouter().initialize();
            
            console.log("Router initialized");
        }
    });
});