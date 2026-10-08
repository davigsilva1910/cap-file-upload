sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"fileuploads/test/integration/pages/LocationsList.gen",
	"fileuploads/test/integration/pages/LocationsObjectPage.gen"
], function (JourneyRunner, LocationsListGenerated, LocationsObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('fileuploads') + '/test/flp.html#app-preview',
        pages: {
			onTheLocationsListGenerated: LocationsListGenerated,
			onTheLocationsObjectPageGenerated: LocationsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

