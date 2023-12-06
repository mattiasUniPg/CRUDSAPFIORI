sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("zacademy.crudoperator.controller.HomePage", {
            onInit: function () {
                //CREA FORM REGISTRAZIONE  2 READ, 3 UPDATE DELETE
                //Stampa lettura dei dati chiamata GET
                // oModel.read("/PAccount(999)", {success: mySuccessHandler, error: myErrorHandler});

                // //JSON Model
                // var oJSONModel = new sap.ui.model.json.JSONModel();
                // this.getView().setModel(oJSONModel, "CRUD");
                // sap.ui.getCore().setModel(oJSONModel, "CRUD");

                // //OData Model 
                // var url = "http://195.231.25.136:8000/sap/opu/odata/sap/Z_ACADEMY_SRV/z_rubricaSet" ;
                // var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);

                // ODataModel.read("z_rubricaSet", { 
                //     success: function(a) {
                //         sap.ui.getCore().getModel("CRUD").setData(a.results);
                //         sap.ui.getCore().getModel("CRUD").refresh();
                //     },
                // });
            },
            //NAVIGA PROSSIMA VIEW
            navRouting: function (oEvent) {
                //1) Ottenere l'oggetto del router dal componente padre


                //2) Ottenere la tabella dallo stato della view
                // var oTable = this.getView().byId("idTable");

                //3) Ottenere l'oggetto del modello associato alla riga selezionata
                // var oSelectedItem = oTable.getSelectedItem();
                // var oContext = oSelectedItem.getBindingContext(oData);
                // var oSelectedObject = oContext.getObject();

                //4) Ottenere l'ID della riga selezionata
                // var sSelectedId = oSelectedObject.Id;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);

                //5) Navigare alla pagina di dettaglio passando l'ID della riga selezionata come parametro
                oRouter.navTo("Edit");
            },

            onCreate: function () {
                //creazione del parametro obbligatorio dell' istanza oDataModel e' URL del servizio 
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV");
                var sEntity = "/z_rubricaSet";
                //oModel = new sap.ui.model.odata.v2.ODataModel({ serviceUrl: "http://195.231.25.136:8000/sap/opu/odata/sap/Z_ACADEMY_SRV/" });

                //http://195.231.25.136:8000/sap/opu/odata/sap/Z_ACADEMY_SRV/z_rubricaSet/$metadata URL ACCESSO JSON
                //Accedere a un file JSON di metadati del servizio con il metodo getServiceMetadata() su un modello Odata
                //Creazione entita del modello nome cognome email
                // var Id = this.getView().byId("Id").getValue();
                var Nome = this.getView().byId("Nome").getValue();
                var Cognome = this.getView().byId("Cognome").getValue();
                var Email = this.getView().byId("Email").getValue();
                var Telefono = this.getView().byId("Telefono").getValue();
                var Paese = this.getView().byId("Paese").getValue();
                var Citta = this.getView().byId("Citta").getValue();
                var Provincia = this.getView().byId("Provincia").getValue();
                var Indirizzo = this.getView().byId("Indirizzo").getValue();

                var flag = false;

                if (Nome == "" || Nome == undefined) {
                    MessageBox.error("Inserire Nome per registrare");
                    flag = true;
                }
                if (Cognome == "" || Cognome == undefined) {
                    MessageBox.error("Inserire Cognome per registrare");
                    flag = true;
                }

                if (!flag) { 
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
                console.log(oData)
                oModel.create(sEntity, oData, {
                    success: function (res) {
                        MessageBox.success("Registrazione con successo");
                        var oBusyDialog = this.byId("busyDialog");
                        oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                        setTimeout(function () {
                            oBusyDialog.close();
                        }.bind(this), 1000);
                    },
                    error: function (err) {
                        MessageBox.error("Registrazione non avvenuta");
                        console.log(err)
                    }
                });
            }
        },
            oReset: function () {

                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);

                var NomeINput = this.getView().byId("Nome");
                NomeINput.setValue("");
                var CognomeINput = this.getView().byId("Cognome");
                CognomeINput.setValue("");
                var EmailINput = this.getView().byId("Email");
                EmailINput.setValue("");
                var TelefonoINput = this.getView().byId("Telefono");
                TelefonoINput.setValue("");
                var PaeseINput = this.getView().byId("Paese");
                PaeseINput.setValue("");
                var CittaINput = this.getView().byId("Citta");
                CittaINput.setValue("");
                var ProvinciaINput = this.getView().byId("Provincia");
                ProvinciaINput.setValue("");
                var IndirizzoINput = this.getView().byId("Indirizzo");
                IndirizzoINput.setValue("");
            }
        });
    });