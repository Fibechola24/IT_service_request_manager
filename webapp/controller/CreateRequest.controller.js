sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  function _newId() {
    return "REQ-" + Date.now();
  }

  function _todayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return Controller.extend("com.client.itrequestmanager.controller.CreateRequest", {
    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("dashboard");
    },

    onCancel: function () {
      this._resetForm();
      this.getOwnerComponent().getRouter().navTo("dashboard");
    },

    onSubmit: function () {
      const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

      const category = this.byId("categorySelect").getSelectedKey();
      const priority = this.byId("prioritySelect").getSelectedKey();
      const desc = this.byId("descArea").getValue().trim();

      if (!category || !priority || !desc) {
        MessageBox.warning(oBundle.getText("msgFillRequired"));
        return;
      }

      const oModel = this.getOwnerComponent().getModel("requestsModel");
      const aRequests = oModel.getProperty("/requests") || [];

      aRequests.unshift({
        id: _newId(),
        category,
        priority,
        description: desc,
        status: "Open",
        createdOn: _todayISO()
      });

      oModel.setProperty("/requests", aRequests);
      MessageToast.show(oBundle.getText("msgRequestCreated"));

      this._resetForm();
      this.getOwnerComponent().getRouter().navTo("myrequests");
    },

    _resetForm: function () {
      this.byId("categorySelect").setSelectedKey("");
      this.byId("prioritySelect").setSelectedKey("");
      this.byId("descArea").setValue("");
    }
  });
});
