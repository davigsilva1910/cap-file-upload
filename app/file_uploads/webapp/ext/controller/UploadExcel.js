sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (MessageToast, Fragment) {
    'use strict';

    // Variáveis globais do controller
    const ID_FRAGMENT = "uploadExcel"

    let dialogo;
    let arquivoSelecionado;

    function lerArquivo(file) {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = function () {
                resolve(reader.result);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    function lerExcel(arquivoLido) {

        const workbook = XLSX.read(
            arquivoLido,
            { type: "array" }
        );

        const sheet =
            workbook.Sheets[
            workbook.SheetNames[0]
            ];

        const rows =
            XLSX.utils.sheet_to_json(sheet);

        return rows;
    }

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        onUploadExcel: async function () {
            if (!dialogo) {
                dialogo = await Fragment.load({
                    id: ID_FRAGMENT,
                    name: "fileuploads.ext.fragment.UploadDialog",
                    controller: {
                        // Salva o arquivo selecionado na variável global
                        onFileChange: function (oEvent) {

                            const aFiles = oEvent.getParameter("files");

                            arquivoSelecionado = aFiles?.[0];


                        },

                        // Pega o arquivo selecionado e faz a leitura do mesmo
                        onImportExcel: async function () {

                            if (!arquivoSelecionado) {
                                MessageToast.show(
                                    "Selecione um arquivo"
                                );

                                return;
                            }

                            const arquivoLido = await lerArquivo(arquivoSelecionado);
                            const rows = lerExcel(arquivoLido);
                            
                            const response = await fetch("/odata/v4/parameter/importExcel", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ data: JSON.stringify(rows) })
                            })

                            dialogo.close();

                            // console.log("Status: " + response.status)

                            // if(response.status === 204) {
                            //     MessageToast.show("Importação realizada com sucesso")
                            // }
                        },

                        onCloseDialog: function () {

                            dialogo.close();

                        }
                    }
                })
            }

            dialogo.open();
        },
    };
});
