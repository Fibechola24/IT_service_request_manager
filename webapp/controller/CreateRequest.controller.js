sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
    "use strict";

    function _newId() {
        return "REQ-" + Date.now();
    }

    function _todayISO() {
        var d = new Date();
        var yyyy = d.getFullYear();
        var mm = String(d.getMonth() + 1).padStart(2, "0");
        var dd = String(d.getDate()).padStart(2, "0");
        return yyyy + "-" + mm + "-" + dd;
    }

    return Controller.extend("com.client.itrequestmanager.itrequestmanager.controller.CreateRequest", {
        onInit: function() {
            console.log("CreateRequest controller initialized");
        },

        onNavBack: function() {
            this.getOwnerComponent().getRouter().navTo("RouteDashboard");
        },

        onCancel: function() {
            this._resetForm();
            this.getOwnerComponent().getRouter().navTo("RouteDashboard");
        },

        onSubmit: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var category = this.byId("categorySelect").getSelectedKey();
            var priority = this.byId("prioritySelect").getSelectedKey();
            var desc = this.byId("descArea").getValue().trim();

            if (!category || !priority || !desc) {
                MessageBox.warning(oBundle.getText("msgFillRequired"));
                return;
            }

            var oModel = this.getOwnerComponent().getModel("requestsModel");
            var aRequests = oModel.getProperty("/requests") || [];

            aRequests.unshift({
                id: _newId(),
                category: category,
                priority: priority,
                description: desc,
                status: "Open",
                createdOn: _todayISO()
            });

            oModel.setProperty("/requests", aRequests);
            MessageToast.show(oBundle.getText("msgRequestCreated"));

            this._resetForm();
            this.getOwnerComponent().getRouter().navTo("RouteMyRequests");
        },

        _resetForm: function() {
            this.byId("categorySelect").setSelectedKey("");
            this.byId("prioritySelect").setSelectedKey("");
            this.byId("descArea").setValue("");
        }
    });
});