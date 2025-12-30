sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.client.itrequestmanager.itrequestmanager.controller.MyRequests", {
        onInit: function() {
            console.log("MyRequests controller initialized");
        },

        onNavBack: function() {
            this.getOwnerComponent().getRouter().navTo("RouteDashboard");
        },

        onSearch: function(oEvent) {
            var sQuery = (oEvent.getParameter("newValue") || "").trim();
            var oTable = this.byId("requestsTable");
            var oBinding = oTable.getBinding("items");

            if (!sQuery) {
                oBinding.filter([]);
                return;
            }

            var aFilters = [
                new Filter("id", FilterOperator.Contains, sQuery),
                new Filter("category", FilterOperator.Contains, sQuery),
                new Filter("status", FilterOperator.Contains, sQuery),
                new Filter("description", FilterOperator.Contains, sQuery)
            ];

            oBinding.filter([new Filter({ filters: aFilters, and: false })]);
        },

        formatStatusState: function(sStatus) {
            if (sStatus === "Open") {
                return "Warning";
            } else if (sStatus === "In Progress") {
                return "Information";
            } else if (sStatus === "Closed") {
                return "Success";
            }
            return "None";
        }
    });
});