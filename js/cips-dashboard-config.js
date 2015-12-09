// Application configuration settings

var appConfig = dojo.getObject('appConfig', true);
var urlRoot = "http://mapserver.vestra.com/arcgis/rest/services/CIPS/"; //"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/";

appConfig = {
	APP_NAME: "CIPS",
    APP_NAME_HTML_TITLE: "CIPS Dashboard",
    APP_NAME_DIALOGUE: "CIPS",
    APP_HEADER_TITLE: '<span style="color: #335b96; font-weight: 300;">DASHBOARD</span>',
    ABOUT_TEXT: "Cannabis Identification and Prioritization System (CIPS) Dashboard</br></br>Version: Beta 1.3",
    ORGANIZATION_NAME: "California State Water Resources Control Board",
    
    PROXY_PAGE: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx",
    //PROXY_PAGE: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx",
    PRINT_SERVICE: "http://mapserver.vestra.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", //"http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", 
    INIT_EXTENT: { xmin: 	-14033566.61705768, ymin: 4664918.866412182, xmax: -13173191.426679777, ymax: 5168791.756868039, spatialReference: { wkid: 102100 } },
    
    AUTH: "arcgisonline", // "arcgisonline" if using OAuth to arcgis.com, "arcgisserver" if using server
    APPID: "p9Ro4eKhR5pNK3Ci", // if using ArcGIS Online authentication, this is the registered id for the app.
    WEBMAP_ID: "", // Use "" if defining below with cips-dashboard-webmap.js file. If an ID is used, the WEBMAP_JSON content below will be ignored.

	URL_REGION: urlRoot + "CIPS_Base/FeatureServer/0",
	URL_WATERSHED: urlRoot + "CIPS_Base/FeatureServer/1",

    URL_INTERP_AREA: urlRoot + "CIPS_Operational/MapServer/7",
	URL_SUMMARY_REGION: urlRoot + "CIPS_Operational/MapServer/19",
	URL_SUMMARY_INTERP_AREA: urlRoot + "CIPS_Operational/MapServer/11",
	
    URL_GROW_POLYS: urlRoot + "CIPS_Operational/MapServer/2",
    URL_GROW_POINTS: urlRoot + "CIPS_Operational/MapServer/1",
    GROW_POINTS_NAME: "Grow Locations (Grouped)", // name used for clustered point layer
    GROW_POINTS_SCALE: 73000, // minimum scale the clustered point layer will be displayed at.
    URL_GROW_PREPROC_RESULTS: urlRoot + "CIPS_Operational/MapServer/9",
    
    URL_PRIOR_AREA: urlRoot + "CIPS_Operational/MapServer/6", //"CIPS_20151123/MapServer/5", //  "CIPS_20151015/FeatureServer/3",
	URL_PRIOR_AREA_NUM: urlRoot + "CIPS_Operational/FeatureServer/14", //"CIPS_Operational/FeatureServer/9",
	URL_PRIOR_MODELS: urlRoot + "CIPS_Operational/FeatureServer/16", //"CIPS_20151123/FeatureServer/10", //"CIPS_20151015/FeatureServer/18",
	URL_PRIOR_MODELS_SUMMARY: urlRoot + "CIPS_Operational/FeatureServer/18", //"CIPS_20151123/FeatureServer/8",
	
	URL_PRIOR_MODELS_RESULTS: urlRoot + "CIPS_Operational/FeatureServer/5", //"CIPS_20151123/FeatureServer/4", // Prioritization Grows (polygons) 
	URL_PRIOR_MODELS_RESULTS_RELATE: urlRoot + "CIPS_Operational/FeatureServer/15", //"CIPS_20151123/FeatureServer/11", // Prioritization Model results related table 
	PRIOR_MODEL_NUM_FACTORS: 10, //Total number of prioritization model factors available to select from. Used for looping through options during model editing/creation.

	URL_PRIOR_PREPROC_INPUTS: urlRoot + "CIPS_Operational/FeatureServer/13", //"CIPS_20151123/FeatureServer/13",
	URL_PRIOR_MODEL_NUMBER: urlRoot + "CIPS_Operational/FeatureServer/17", //"CIPS_20151123/FeatureServer/9",
	
	// LAYER_NAME is used to identify layers by their name, as saved in the web map JSON file
    LAYER_NAME_WSHD: "Watershed Boundaries - HUC12",
    LAYER_NAME_INTERP: "Interpretation Areas",
    LAYER_NAME_INTERP_WSHD: "Interpretation Area Watersheds",
    LAYER_NAME_SWRCB_REGIONS: "SWRCB Regions",
    LAYER_NAME_GROW_FOOTPRINTS: "Grow Footprints",
    LAYER_NAME_GROW_LOCATIONS: "Grow Locations"

	
	};
