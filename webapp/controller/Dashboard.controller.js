sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], function (Controller, MessageBox) {
  "use strict";

  return Controller.extend("com.client.itrequestmanager.itrequestmanager.controller.Dashboard", {
    onNavCreate: function () {
      this.getOwnerComponent().getRouter().navTo("create");
    },

    onNavMyRequests: function () {
      this.getOwnerComponent().getRouter().navTo("myrequests");
    },

    onHelp: function () {
      const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
      MessageBox.information(oBundle.getText("helpMessage"));
    }
  });
});
