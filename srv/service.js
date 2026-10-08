// const cds = require("@sap/cds");

// module.exports = cds.service.impl(function() {
//     this.on('importExcel', async (req) => {
//         const rows= JSON.parse(req.data.data);

//         const {Locations} = this.entities;

//         await UPSERT
//                 .into(Locations)
//                 .rows(rows)

//         return { imported: rows.length };
//     })
// })