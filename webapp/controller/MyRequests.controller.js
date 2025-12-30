sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("com.client.itrequestmanager.controller.MyRequests", {
    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("dashboard");
    },

    onSearch: function (oEvent) {
      const sQuery = (oEvent.getParameter("newValue") || "").trim();
      const oTable = this.byId("requestsTable");
      const oBinding = oTable.getBinding("items");

      if (!sQuery) {
        oBinding.filter([]);
        return;
      }

      const aFilters = [
        new Filter("id", FilterOperator.Contains, sQuery),
        new Filter("category", FilterOperator.Contains, sQuery),
        new Filter("status", FilterOperator.Contains, sQuery)
      ];

      oBinding.filter([new Filter({ filters: aFilters, and: false })]);
    }
  });
});
