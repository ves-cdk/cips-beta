// Application configuration settings

var appConfig = dojo.getObject('appConfig', true);
var urlRoot = "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/";

appConfig = {
	APP_NAME: "CIPS",
    APP_NAME_HTML_TITLE: "CIPS Modeler",
    APP_NAME_DIALOGUE: "CIPS",
    APP_HEADER_TITLE: '<span style="color: #335b96; font-weight: 300;">EDITOR</span>',
    ABOUT_TEXT: "Cannabis Identification and Prioritization System (CIPS) Modeler</br></br>Version: Beta 1.3",
    ORGANIZATION_NAME: "California State Water Resources Control Board",
    PROXY_PAGE: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx",
    GEOMETRY_SERVICE: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer", 
    //GEOMETRY_SERVICE: "http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
    //PROXY_PAGE: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx",
    PRINT_SERVICE: "http://mapserver.vestra.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", //"http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", 
    INIT_EXTENT: { xmin: 	-14295287.001905905, ymin: 4652688.941886589, xmax: -12901075.60598466, ymax: 5203035.545539711, spatialReference: { wkid: 102100 } },
    AUTH: "arcgisonline", // "arcgisonline" if using OAuth to arcgis.com, "arcgisserver" if using server
    APPID: "p9Ro4eKhR5pNK3Ci", // if using ArcGIS Online authentication, this is the registered id for the app.
    SEARCH_WATERSHED: urlRoot + "CIPS_Base/FeatureServer/0",
    GROW_POLYS_URL: urlRoot + "CIPS_Operational/FeatureServer/1",
    GROW_POINTS_URL: urlRoot + "CIPS_Operational/FeatureServer/0",
    GROW_PREPROC_RESULTS_URL: urlRoot + "CIPS_Operational/FeatureServer/6",
    //PRIORIT_POLYS_URL: urlRoot + "Deliverable_20150909_forTesting_20151005/FeatureServer/1",
    //PRIORIT_JOIN_TABLE_URL: urlRoot + "Deliverable_20150909_forTesting_20151005/FeatureServer/10",
	//PRIORIT_JOIN_KEY: "PrioritizGrowKey",
	URL_INTERP_AREA: urlRoot + "CIPS_Operational/FeatureServer/2",
	URL_INTERP_AREA_NUM: urlRoot + "CIPS_Operational/FeatureServer/10",
	
	URL_PRIOR_AREA: urlRoot + "CIPS_20151015/FeatureServer/3",
	URL_PRIOR_AREA_NUM: urlRoot + "CIPS_Operational/FeatureServer/9",
	URL_PRIOR_MODELS: urlRoot + "CIPS_20151123/FeatureServer/10", //"CIPS_20151015/FeatureServer/18",
	URL_PRIOR_PREPROC_INPUTS: urlRoot + "CIPS_20151123/FeatureServer/13",
	
	URL_GP_MODEL_PRIOR_GROWS: "http://vags102a/arcgis/rest/services/CIPS/ModelPrioritizGrows/GPServer/V102_ModelPrioritizGrows",
	
	URL_REGION: urlRoot + "CIPS_Base/FeatureServer/1",
	URL_WATERSHED: urlRoot + "CIPS_Base/FeatureServer/0", //urlRoot + "CIPS_20151015/FeatureServer/20",
    URL_SUMMARY_INTERP_AREA: urlRoot + "CIPS_Operational/FeatureServer/4", //urlRoot + "CIPS_20151015/FeatureServer/11",
    URL_EDIT_POINT: urlRoot + "CIPS_20151009/FeatureServer/0",
    URL_EDIT_POLYLINE: urlRoot + "CIPS_20151009/FeatureServer/1",
    URL_EDIT_POLYGON: urlRoot + "CIPS_20151009/FeatureServer/2"
    //WEBMAP_ID: "" // Use "" if defining below in WEBMAP_JSON. If an ID is used, the WEBMAP_JSON content below will be ignored.
};
