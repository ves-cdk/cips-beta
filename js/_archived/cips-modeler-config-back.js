// Application configuration settings

var appConfig = dojo.getObject('appConfig', true);

appConfig = {
	APP_NAME: "CIPS",
    APP_NAME_HTML_TITLE: "CIPS Modeler",
    APP_NAME_DIALOGUE: "CIPS",
    APP_HEADER_TITLE: '<span style="color: #335b96; font-weight: 300;">EDITOR</span>',
    ABOUT_TEXT: "Cannabis Identification and Prioritization System (CIPS) Editor</br></br>Version: Beta 1.3",
    ORGANIZATION_NAME: "California State Water Resources Control Board",
    PROXY_PAGE: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx",
    GEOMETRY_SERVICE: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer", //http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
    //PROXY_PAGE: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx",
    PRINT_SERVICE: "http://mapserver.vestra.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", //"http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", 
    INIT_EXTENT: { xmin: 	-14295287.001905905, ymin: 4652688.941886589, xmax: -12901075.60598466, ymax: 5203035.545539711, spatialReference: { wkid: 102100 } },
    AUTH: "arcgisonline", // "arcgisonline" if using OAuth to arcgis.com, "arcgisserver" if using server
    APPID: "p9Ro4eKhR5pNK3Ci", // if using ArcGIS Online authentication, this is the registered id for the app.
    SEARCH_WATERSHED: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Base/FeatureServer/0",
    GROW_POLYS_URL: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/1",
    GROW_POINTS_URL: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/0",
    GROW_PREPROC_RESULTS_URL: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/6",
    //PRIORIT_POLYS_URL: "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1",
    //PRIORIT_JOIN_TABLE_URL: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10",
	//PRIORIT_JOIN_KEY: "PrioritizGrowKey",
	URL_INTERP_AREA: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/2",
	URL_INTERP_AREA_NUM: "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Operational/FeatureServer/10",
	URL_PRIOR_AREA: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_20151015/FeatureServer/3",
	URL_PRIOR_AREA_NUM: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/9",
	URL_REGION: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Base/FeatureServer/1",
	URL_SUMMARY_REGION: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/3", //"http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_20151015/FeatureServer/20",
    URL_SUMMARY_INTERP_AREA: "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/4", //"http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_20151015/FeatureServer/11",
    URL_EDIT_POINT: "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_20151009/FeatureServer/0",
    URL_EDIT_POLYLINE: "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_20151009/FeatureServer/1",
    URL_EDIT_POLYGON: "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_20151009/FeatureServer/2"
    //WEBMAP_ID: "" // Use "" if defining below in WEBMAP_JSON. If an ID is used, the WEBMAP_JSON content below will be ignored.
};
