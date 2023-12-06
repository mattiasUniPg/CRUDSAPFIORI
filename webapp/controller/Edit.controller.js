sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    'sap/ui/export/Spreadsheet',
    "sap/ui/core/routing/History",
    'sap/ui/model/odata/v2/ODataModel'
],
    /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
    function (Controller, Filter, FilterOperator, MessageBox, JSONModel, Fragment, Spreadsheet, History, ODataModel) {
        "use strict";

        return Controller.extend("zacademy.crudoperator.controller.Edit", {
            onInit: function () {

                //INIT PERCORSO EXCEL
                // var oModel, oView;
                // var sPath = "/sap/opu/odata/sap/Z_ACADEMY_SRV/z_rubricaSet";
                // // zoModel = new ODataModel.getData("modelResult");
                // oView = this.getView();
                // oView.setModel(oModel);

                this.refreshCollection();

                // //6)richiamo del model definito nel Component
                // var modello = this.getOwnerComponent().getModel("modelResult").getData();
                // //7)chech del model in console
                // console.log(modello);

                // console.log(this.getOwnerComponent().getModel(oData).getData());
                //MODEL NON DEFINITO ->COMPONENT GETOWNERCOMPONENT
                //1) Salva il riferimento all'oggetto del router in una variabile
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                //2) Recupera l'ID dalla route
                this.oRouter.getRoute("Edit").attachPatternMatched(this._onRouteMatched, this);
            },
            // onRowSelection: function (event) {
            //     var isChecked = event.getParameter("selected");
            //     var oRowContext = event.getSource().getBindingContext();
            //     // Ottieni i dati relativi alla riga selezionata
            //     var oData = oRowContext.getProperty();
            //     if (isChecked) {
            //         console.log("Riga selezionata:", oData);
            //     } else {
            //         console.log("Riga deselezionata:", oData);
            //     }
            // },
            Updating: function () {

                var Cons = this.getOwnerComponent().getModel("modelResult").getData();
                console.log(Cons)
                //1) Ottenere l'oggetto del router dal componente padre
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                //2) Ottenere la tabella dallo stato della view
                var oTable = this.byId("idTable");


                var sRecSelected = this.getView().byId("idTable").getSelectedItem().getBindingContext("modelResult").getObject();
                console.log(sRecSelected);
                //MODEL GLOBALE PER APPOGGIARE DATI MODIFICATI FILTRATI CON IL PROPRIO ID
                var SelectedModel = this.getOwnerComponent().setModel(new JSONModel(sRecSelected), "modelSelected");

                //3) Ottenere l'oggetto del modello associato alla riga selezionata
                var oSelectedItem = oTable.getSelectedItem();
                var oContext = oSelectedItem.getBindingContext("modelResult");
                var oSelectedObject = oContext.getObject();
                console.log(oContext)
                this.getOwnerComponent().getModel("modelResult").setProperty("/", oSelectedObject);
                //4) Ottenere l'ID della riga selezionata
                var sSelectedId = oSelectedObject.Id;
                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);

                //5) Navigare alla pagina di dettaglio passando l'ID della riga selezionata come parametro
                oRouter.navTo("Update", {
                    Id: sSelectedId
                });
                console.log(sSelectedId, oSelectedItem, oSelectedObject)
            },

            //DA UTILIZZARE IN TAG VIEW     <SearchField id="idSeacrhBar" placeholder="inserisci nome o cognome" search="searchFilter"/>
            //       searchFilter: function(oEvt) {
            //         //1) prendo il parametro 
            //         var sQuery = oEvt.getParameter("query"),
            //         //2)inizializzo i filtri per nome e congome
            //          aFilter = [
            //          new Filter("Nome",FilterOperator.Contains,sQuery),
            //          new Filter("Cognome",FilterOperator.Contains,sQuery),                 
            //         ],
            //         //3)prendo l'id della table
            //          oTable = this.byId("idTable"),
            //          //4)prendo il binding degli items
            //          oBinding = oTable.getBinding("items"),
            //          //5)applico i filtri
            //          oFilter = null;
            //             if(sQuery.length!=0){
            //                 oFilter = new Filter({
            //                 filters: aFilter,
            //                 and : false
            //                  });
            //   }      
            //   oBinding.filter(oFilter);
            // },

            //UTILIZZARE SOLO SE TOLTO UPDATING
            // navRouting: function (oEvent) {

            //     // //1) Ottenere l'oggetto del router dal componente padre
            //     // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            //     // //2) Ottenere la tabella dallo stato della view
            //     // var oTable = this.byId("idTable");

            //     // //3) Ottenere l'oggetto del modello associato alla riga selezionata
            //     // var oSelectedItem = oTable.getSelectedItem();
            //     // var oContext = oSelectedItem.getBindingContext("customerModel");
            //     // var oSelectedObject = oContext.getObject();

            //     // //4) Ottenere l'ID della riga selezionata
            //     // var sSelectedId = oSelectedObject.id;

            //     // //5) Navigare alla pagina di dettaglio passando l'ID della riga selezionata come parametro
            //     // oRouter.navTo("Update", {
            //     //   id: sSelectedId
            //     // });


            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     var oBusyDialog = this.byId("busyDialog");
            //     oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
            //     setTimeout(function () {
            //         oBusyDialog.close();
            //     }.bind(this), 1000);

            //     //5) Navigare alla pagina di dettaglio passando l'ID della riga selezionata come parametro
            //     oRouter.navTo("Update");
            // },

            _onRouteMatched: function (oEvent) {
                //settare model con il nome
                this.getView().setModel(new JSONModel({}), "modelFilterHome");
                console.log(this.getView().getModel("modelFilterHome").getData());
                var sRouteName = oEvent.getParameter("name");
                console.log(sRouteName)
                if(sRouteName=="Edit")
                {
                    this.refreshCollection();
                }

            },
            _readMethod: function () {   //read per restituire dati

                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV");
                var sEntity = "/z_rubricaSet";

                var oModelFilter = this.getView().getModel("modelFilterHome").getData();
                console.log(oModelFilter);

                var oView = this.getView();
                var oWner = this.getOwnerComponent();
                var aFilter = [];
                //condizione filtri
                if (!oModelFilter.Nome == "" || !oModelFilter.Nome == undefined) {

                    aFilter.push(new sap.ui.model.Filter("Nome", sap.ui.model.FilterOperator.EQ, oModelFilter.Nome));

                }
                if (!oModelFilter.Cognome == "" || !oModelFilter.Cognome == undefined) {

                    aFilter.push(new sap.ui.model.Filter("Cognome", sap.ui.model.FilterOperator.EQ, oModelFilter.Cognome));
                }
                var object = [];

                //validatori input nome cognome filtri https://www.w3schools.com/js/js_validation.asp
                // var NomeINput = getValue("Nome");
                // var inputValidator = aFilter["Nome","Cognome"];
                // var CognomeINput = getValue("Cognome");
                // if(NomeINput=="" && CognomeINput=="")  {return success;}else{filters: aFilter}

                //METODO2 https://stackoverflow.com/questions/74539383/how-to-get-an-input-value-to-a-variable-in-sweetalert2
                // inputValidator: (aFilter.Nome.value && aFilter.Cognome.value)  { 
                //     var filters= aFilter;
                //     if (!value) {
                //       return oModel.read;
                //     }
                //   }

                oModel.read(sEntity, {

                    filters: aFilter,
                    success: function (res) {
                        // this.onBack();
                        var byt = res.results;
                        console.log(byt)
                        byt.forEach(element => {
                            var obj = {
                                "Id": element.Id,
                                "Nome": element.Nome,
                                "Cognome": element.Cognome,
                                "Email": element.Email,
                                "Telefono": element.Telefono,
                                "Paese": element.Paese,
                                "Citta": element.Citta,
                                "Provincia": element.Provincia,
                                "Indirizzo": element.Indirizzo
                            };
                            object.push(obj);
                        });
                        //dati da inserire in tabella
                        oWner.setModel(new JSONModel(object), "modelResult");
                        console.log(oWner.getModel("modelResult"))
                    },
                    error: function (err) {
                        MessageBox.error();
                        console.log(err)
                    }
                });
            },

            refreshCollection: function() {
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV");
                var sEntity = "/z_rubricaSet";
                var oView = this.getView();
                var oWner = this.getOwnerComponent();
                var object = [];
                oModel.read(sEntity, {
                    success: function (res) {
                        // this.onBack();
                        var byt = res.results;
                        console.log(byt)
                        byt.forEach(element => {
                            var obj = {
                                "Id": element.Id,
                                "Nome": element.Nome,
                                "Cognome": element.Cognome,
                                "Email": element.Email,
                                "Telefono": element.Telefono,
                                "Paese": element.Paese,
                                "Citta": element.Citta,
                                "Provincia": element.Provincia,
                                "Indirizzo": element.Indirizzo
                            };
                            object.push(obj);
                        });
                        //dati da inserire in tabella
                        oWner.setModel(new JSONModel(object), "modelResult");
                        console.log(oWner.getModel("modelResult"))
                    },
                    error: function (err) {
                        MessageBox.error();
                        console.log(err)
                    }
                });
            },
            // onPressEdit: function (oEvent) {
            //     this.oDialog = sap.ui.xmlfragment("zacademy.crudoperator.view.fragment.Editable", this);
            //     this.getView().addDependent(this.oDialog);
            //     this.oDialog.open();
            //     var sRecSelected = this.getView().byId("idTable").getSelectedItem().getBindingContext("modelResult").getObject();
            //     console.log(sRecSelected);
            //     MODEL GLOBALE PER APPOGGIARE DATI MODIFICATI FILTRATI CON IL PROPRIO ID
            //     var SelectedModel = this.getOwnerComponent().setModel(new JSONModel(sRecSelected), "modelSelected");

            // },
            onCloseDialog: function () {
                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);
                this.oDialog.exit();
                this.oDialog.destroy();
            },
            //UPDATE
            // updateData: function () {
            //     var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV/");
            //     var sEntity = "/zrubricaSet";
            //     var data = this.getView().byId("idTable");
            //     var sRecSelected = data.getSelectedItem().getBindingContext("modelFragment").getObject();
            //     this.oDialog.setModel(new JSONModel(sRecSelected), "modelFragment");
            //     // var sSelectedId = oModel.getProperty("/Id");
            //     // var selItem = data.getSelectedItem();
            //     // var title = selItem.getTitle();
            //     var oNome = sap.ui.getCore().byId("NomeInput").getValue();
            //     var oCognome = sap.ui.getCore().byId("CognomeInput").getValue();
            //     var oEmail = sap.ui.getCore().byId("EmailInput").getValue();
            //     var oTelefono = sap.ui.getCore().byId("TelefonoInput").getValue();
            //     var oPaese = sap.ui.getCore().byId("PaeseInput").getValue();
            //     var oCitta = sap.ui.getCore().byId("CittaInput").getValue();
            //     var oProvincia = sap.ui.getCore().byId("ProvinciaInput").getValue();
            //     var oIndirizzo = sap.ui.getCore().byId("IndirizzoInput").getValue();

            //     var payload = {
            //         // "Id" : oId,
            //         "Nome": oNome,
            //         "Cognome": oCognome,
            //         "Email": oEmail,
            //         "Telefono": oTelefono,
            //         "Paese": oPaese,
            //         "Citta": oCitta,
            //         "Provincia": oProvincia,
            //         "Indirizzo": oIndirizzo
            //     };

            //     var path = oModel + sEntity;
            //     // var odataModel = this.getView().getModel("modelFragment");
            //     // @ts-ignore
            //     oModel.update(path, payload, sRecSelected, {
            //         success: function (data, oModel) {
            //             MessageBox.success("Successfully Updated");
            //         },
            //         error: function (error) {
            //             MessageBox.error("Error while updating the data");
            //         }
            //     });
            // },

            onSave: function (oEvent) {
                var oFragment = sap.ui.xmlfragment("zacademy.crudoperator.view.fragment.Editable", this);
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV/");
                var oModelFromFragment = oFragment.getModel("modelFragment");
                var sSelectedId = oModelFromFragment.getProperty("/Id");

                var sEntity = "/zrubricaSet";
                //(Id='"+ sSelectedId +"')";
                // console.log(sSelectedId)
                var oId = sap.ui.getCore().byId("IdInput").getValue();
                var oNome = sap.ui.getCore().byId("NomeInput").getValue();
                var oCognome = sap.ui.getCore().byId("CognomeInput").getValue();
                var oEmail = sap.ui.getCore().byId("EmailInput").getValue();
                var oTelefono = sap.ui.getCore().byId("TelefonoInput").getValue();
                var oPaese = sap.ui.getCore().byId("PaeseInput").getValue();
                var oCitta = sap.ui.getCore().byId("CittaInput").getValue();
                var oProvincia = sap.ui.getCore().byId("ProvinciaInput").getValue();
                var oIndirizzo = sap.ui.getCore().byId("IndirizzoInput").getValue();

                // var IdInput = this.oDialog.getModel("modelFragment").getProperty("/IdInput");
                // var NomeInput = this.oDialog.getModel("modelFragment").getProperty("/NomeInput");
                // var CognomeInput = this.oDialog.getModel("modelFragment").getProperty("/CognomeInput");
                // var EmailInput = this.oDialog.getModel("modelFragment").getProperty("/EmailInput");
                // var TelefonoInput = this.oDialog.getModel("modelFragment").getProperty("/TelefonoInput");
                // var PaeseInput = this.oDialog.getModel("modelFragment").getProperty("/PaeseInput");
                // var CittaInput = this.oDialog.getModel("modelFragment").getProperty("/CittaInput");
                // var ProvinciaInput = this.oDialog.getModel("modelFragment").getProperty("/ProvinciaInput");
                // var IndirizzoInput = this.oDialog.getModel("modelFragment").getProperty("/IndirizzoInput");

                var oDataModify = {
                    "Id": oId,
                    "Nome": oNome,
                    "Cognome": oCognome,
                    "Email": oEmail,
                    "Telefono": oTelefono,
                    "Paese": oPaese,
                    "Citta": oCitta,
                    "Provincia": oProvincia,
                    "Indirizzo": oIndirizzo
                }
                console.log(oDataModify)
                oModel.update(sEntity, oDataModify, {
                    merge: false,
                    success: function (res) {
                        MessageBox.success("Risultato modificato");
                        var oBusyDialog = this.byId("busyDialog");
                        oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                        setTimeout(function () {
                            oBusyDialog.close();
                        }.bind(this), 1000);
                    },
                    error: function (err) {
                        MessageBox.error(err);
                    }
                });

                this.onCloseDialog();
                // oModel.setRefreshAfterChange(true);      
            },

            onDeleteItem: function () {
                var oTable = this.byId("idTable");
                var aSelectedItems = oTable.getSelectedItems();

                if (aSelectedItems.length === 0) {
                    MessageBox.error("Seleziona un elemento da eliminare.");
                } else {
                    this.onDelete();
                }
            },

            onDelete: function (oEvent) {
                //RICHIAMO IL MODEL DA PRENDERE PER ELEMENTO ID
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV/");
                var sSelectedId = this.getModel("modelFragment").getProperty("/Id");
                var sEntity = "/zrubricaSet(Id='" + sSelectedId + "')";
                // var oModel = oEvent.getSource().getModel();
                this.oDialog.open();
                this.oDialog = sap.ui.xmlfragment("zacademy.crudoperator.view.fragment.Editable", this);

                //Messaggiobox di avviso onDelete
                var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                var oBusyDialog = this.byId("busyDialog");
                MessageBox.confirm(
                    "Sei sicuro di voler eliminare questo utente?",
                    {
                        styleClass: bCompact ? "sapUiSizeCompact" : "",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.OK) {
                                oBusyDialog.open();
                                setTimeout(function () {
                                    oBusyDialog.close();
                                }, 2000);
                            }
                        }
                    });
                //OPERATION CRUD DELETE IN BASE ELEMENTO IN ENTITY
                oModel.remove(sEntity, {

                    merge: false,
                    success: function (res) {

                        MessageBox.success(
                            "Utente cancellato con successo!",
                            {
                                styleClass: bCompact ? "sapUiSizeCompact" : "",
                                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                                onClose: function (sAction) {
                                    if (sAction === MessageBox.Action.OK) {
                                        oBusyDialog.open();
                                        setTimeout(function () {
                                            oBusyDialog.close();
                                        }, 2000);
                                    }
                                }
                            });
                    },
                    error: function (error) {
                        MessageBox.error("Cancellazioni non effettuata");
                    }
                }); oModel.setRefreshAfterChange(true);
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
                        oRouter.navTo("HomePage", {}, true);
                    }
                }.bind(this), 1000);
            },
            //CONFIGURAZIONE COLONNE DA IMPLEMENTARE IN UN FILE EXCL
            createColumnConfig: function () {
                var aCols = [];
                aCols.push({
                    label: 'Nome Cognome',
                    property: ['Nome', 'Cognome'],
                    type: 'string',
                    template: '{0}, {1}'
                });
                aCols.push({
                    label: 'Id',
                    type: 'number',
                    property: 'Id',
                    scale: 0
                });
                aCols.push({
                    property: 'Nome',
                    type: 'string'
                });
                aCols.push({
                    property: 'Cognome',
                    type: 'string'
                });
                aCols.push({
                    property: 'Email',
                    type: 'string'
                });
                aCols.push({
                    property: 'Telefono',
                    type: 'number'
                    // scale: 2,
                    // delimiter: true
                });
                aCols.push({
                    property: 'Paese',
                    type: 'string'
                });
                aCols.push({
                    property: 'Citta',
                    type: 'string'
                });
                aCols.push({
                    property: 'Provincia',
                    type: 'string'
                });
                aCols.push({
                    property: 'Indirizzo',
                    type: 'string'
                });
                // aCols.push({
                //     property: 'Active',
                //     type: 'boolean',
                //     trueValue: 'YES',
                //     falseValue: 'NO'
                // });
                return aCols;
            },
            //ESPORTARE FILE EXCEL NEL CONTENUTO DELLA TABELLA 
            onExport: function () {
                var aCols, oBinding, oSettings, oSheet, oTable;
                //const listBinding = this.byId("idProductsTable").getBinding("items");
                var oModel = this.getView().getModel("modelResult").getData();
                console.log(oModel.length)

                if (!this._oTable) {
                    this._oTable = this.byId('idTable');
                }
                oTable = this._oTable
                oBinding = oTable.getBinding('items');
                aCols = this.createColumnConfig();
                //BUSY DIALOG
                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function () {
                    oBusyDialog.close();
                }.bind(this), 1000);

                oSettings = {
                    workbook: { columns: aCols, hierarchyLevel: 'Level' },
                    dataSource: oModel,
                    fileName: 'REPORT SAP.xlsx',
                    worker: false,
                    count: oModel.length || 50
                };


                //new Spreadsheet(oSettings).build()
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            }
        });
    });