sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment"
],
    /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
    function (Controller, MessageBox, History, Fragment) {
        "use strict";

        return Controller.extend("zacademy.crudoperator.controller.Update", {
            onInit: function () {

                //1) Salva il riferimento all'oggetto del router in una variabile
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                //2) Recupera l'ID dalla route
                this.oRouter.getRoute("Update").attachPatternMatched(this._onRouteMatched, this);

                var oM = this.getOwnerComponent().getModel("modelResult").getProperty("/Id");
                console.log(oM)
            },

            // navRouting: function (oEvent) {
            //    NON UTILIZZATA PER HOMEPAGE      
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     var oBusyDialog = this.byId("busyDialog");
            //     oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
            //     setTimeout(function() 
            //     {
            //     oBusyDialog.close(); 
            //     }.bind(this),1000);

            //     //5) Navigare alla pagina di dettaglio passando l'ID della riga selezionata come parametro
            //     oRouter.navTo("HomePage");
            // },

            _onRouteMatched: function (oEvent) {

                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);

                //3) Recupera l'ID dalla route
                var sSelectedId = oEvent.getParameter("arguments").Id;
                console.log(sSelectedId)
                //4) Carica i dati corrispondenti all'ID e bind al model della view
                var oModel = this.getView().getModel("modelResult");
                console.log(oModel)
                var oSelectedItem = oModel.getProperty("/" + sSelectedId);
                //5) Effettua il binding dei dati alla vista
                this.getView().bindElement({
                    path: "/" + sSelectedId,
                    model: "modelResult"
                });
            },

            onPressUpdating: function () {

                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);

                var Nome = this.getView().byId("NomeUpd").getValue("Nome");
                if (Nome != undefined || Nome != null) {
                    this.getView().byId("NomeUpd").setEditable(false);
                    this.getView().byId("CognomeUpd").setEditable(false);
                    this.getView().byId("EmailUpd").setEditable(false);
                    this.getView().byId("TelefonoUpd").setEditable(false);
                    this.getView().byId("PaeseUpd").setEditable(false);
                    this.getView().byId("CittaUpd").setEditable(false);
                    this.getView().byId("ProvinciaUpd").setEditable(false);
                    this.getView().byId("IndirizzoUpd").setEditable(false);
                } else {
                    this.getView().byId("NomeUpd").setEditable(true);
                    this.getView().byId("CognomeUpd").setEditable(true);
                    this.getView().byId("EmailUpd").setEditable(true);
                    this.getView().byId("TelefonoUpd").setEditable(true);
                    this.getView().byId("PaeseUpd").setEditable(true);
                    this.getView().byId("CittaUpd").setEditable(true);
                    this.getView().byId("ProvinciaUpd").setEditable(true);
                    this.getView().byId("IndirizzoUpd").setEditable(true);
                }

                //APERTURA FRAGMENT CON MODIFICA DATI
                // var oView = this.getView();
                // // create dialog lazily
                // if (!this.byId("helloDialog")) {
                //     // load asynchronous XML fragment
                //     Fragment.load({
                //         Id: oView.getId(),
                //         name: "zacademy.crudoperator.view.fragment.Editable",
                //         controller: this
                //     }).then(function (oDialog) {
                //         // connect dialog to the root view of this component (models, lifecycle)
                //         oView.addDependent(oDialog);
                //         oDialog.open();
                //     });
                // } else {
                //     this.byId("helloDialog").open();
                // }
            },

            onCloseDialog: function () {

                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);
                this.oDialog.exit();
                this.oDialog.destroy();
            },

            Modifica: function (oEvent) {

                var oModel = this.getOwnerComponent().getModel("modelSelected");
                console.log(oModel)

                var onModify = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV");
                var sSelectedId = oModel.getProperty("/Id");
                var sEntity = "/z_rubricaSet('" + sSelectedId + "')";

                var Nome = this.getView().byId("NomeUpd").getValue();
                var Cognome = this.getView().byId("CognomeUpd").getValue();
                var Email = this.getView().byId("EmailUpd").getValue();
                var Telefono = this.getView().byId("TelefonoUpd").getValue();
                var Paese = this.getView().byId("PaeseUpd").getValue();
                var Citta = this.getView().byId("CittaUpd").getValue();
                var Provincia = this.getView().byId("ProvinciaUpd").getValue();
                var Indirizzo = this.getView().byId("IndirizzoUpd").getValue();
                console.log(Nome, Cognome, Email, Telefono, Paese, Citta, Provincia, Indirizzo)

                //SETTO VALORE AL CAMPO NOME NELLA TABELLA
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Nome", Nome);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Cognome", Cognome);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Email", Email);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Telefono", Telefono);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Paese", Paese);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Citta", Citta);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Provincia", Provincia);
                this.getOwnerComponent().getModel("modelSelected").setProperty("/Indirizzo", Indirizzo);

                var oData = {

                    "Nome": Nome,
                    "Cognome": Cognome,
                    "Email": Email,
                    "Telefono": Telefono,
                    "Paese": Paese,
                    "Citta": Citta,
                    "Provincia": Provincia,
                    "Indirizzo": Indirizzo
                }

                //VERIFICA PARAMETRI INSERITI (TEL)
                
                if(!this.getById("TelefonoUpd").getValue() == Number)
                {
                    this.getView().byId("TelefonoUpd") == "";
                    MessageBox("Inserire parametro numerico ( 10)");
                }


                onModify.update(sEntity, oData, {
                    merge: false,
                    success: function (res) {
                        
                        MessageBox.success("Risultato modificato");
                        // this._readMethod();
                    },
                    error: function (err) {
                        MessageBox.error(err);
                    }
                });
                // this.onCloseDialog();
            },

            Cancella: function (oEvent) {

                var oModel = this.getOwnerComponent().getModel("modelSelected");
                //RICHIAMO IL MODEL DA PRENDERE PER ELEMENTO ID
                var oModelRemove = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV");
                var sSelectedId = oModel.getProperty("/Id");
                console.log(sSelectedId)
                var sEntity = "/z_rubricaSet('" + sSelectedId + "')";

                // //Messaggiobox di avviso onDelete
                // var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                // var oBusyDialog = this.byId("busyDialog");
                // MessageBox.confirm(
                //     "Sei sicuro di voler eliminare questo utente?",
                //     {
                //         styleClass: bCompact ? "sapUiSizeCompact" : "",
                //         actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                //         onClose: function (sAction) {
                //             if (sAction === MessageBox.Action.OK) {
                //                 oBusyDialog.open();
                //                 setTimeout(function () {
                //                     oBusyDialog.close();
                //                 }, 2000);
                //             }
                //         }
                //     });

                //OPERATION CRUD DELETE IN BASE ELEMENTO IN ENTITY
                oModelRemove.remove(sEntity, {
                    success: function (res) {

                        MessageBox.success(

                            "Utente cancellato con successo!",
                        );
                    },
                    error: function (error) {
                        MessageBox.error("Cancellazioni non effettuata");
                    }
                });
                //  oModel.setRefreshAfterChange(true);
                this.oDialog.exit();
                this.oDialog.destroy();
            },

            onBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                    if (sPreviousHash !== undefined) {
                        window.history.go(-1);
                    } else {
                        var oRouter = UIComponent.getRouterFor(this);
                        oRouter.navTo("Edit", {}, true);
                    }
                }.bind(this), 1000);
            },
        });
    });