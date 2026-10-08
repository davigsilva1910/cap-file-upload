const cds = require("@sap/cds");

module.exports = cds.service.impl(function () {

    this.on("importExcel", async (req) => {

        const rows = JSON.parse(req.data.data);

        const { Locations } = cds.entities("db");

        await UPSERT
            .into(Locations)
            .entries(rows);

    });

});