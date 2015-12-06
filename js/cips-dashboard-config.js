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
    URL_GROW_PREPROC_RESULTS: urlRoot + "CIPS_Operational/MapServer/9"
	
	};
