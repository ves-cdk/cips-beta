// Application configuration settings

var appConfig = dojo.getObject('appConfig', true);
var urlRoot = "http://mapserver.vestra.com/arcgis/rest/services/CIPS/";

appConfig = {
	APP_NAME: "CIPS",
    APP_NAME_HTML_TITLE: "CIPS Editor",
    APP_NAME_DIALOGUE: "CIPS",
    APP_HEADER_TITLE: '<span style="color: #335b96; font-weight: 300;">EDITOR</span>',
    ABOUT_TEXT: "Cannabis Identification and Prioritization System (CIPS) Editor</br></br>Version: Beta 1.3",
    ORGANIZATION_NAME: "California State Water Resources Control Board",
    
    PROXY_PAGE: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx",
    //PROXY_PAGE: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx",
    PRINT_SERVICE: "http://mapserver.vestra.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", //"http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", 
    INIT_EXTENT: { xmin: 	-14033566.61705768, ymin: 4664918.866412182, xmax: -13173191.426679777, ymax: 5168791.756868039, spatialReference: { wkid: 102100 } },
   
    AUTH: "arcgisonline", // "arcgisonline" if using OAuth to arcgis.com, "arcgisserver" if using server
    APPID: "p9Ro4eKhR5pNK3Ci", // if using ArcGIS Online authentication, this is the registered id for the app.
    
    URL_REGION: urlRoot + "CIPS_Base/FeatureServer/0",
	URL_WATERSHED: urlRoot + "CIPS_Base/FeatureServer/1",
    
    URL_GROW_POLYS: urlRoot + "CIPS_Operational/FeatureServer/2",
    URL_GROW_POINTS: urlRoot + "CIPS_Operational/FeatureServer/1",
    GROW_POINTS_NAME: "Grow Locations (Grouped)", // name used for clustered point layer
    GROW_POINTS_SCALE: 73000, // minimum scale the clustered point layer will be displayed at.

	URL_INTERP_AREA: urlRoot + "CIPS_Operational/FeatureServer/7",
	URL_GROW_NUM: urlRoot + "CIPS_Operational/FeatureServer/8",
	URL_SUMMARY_REGION: urlRoot + "CIPS_Operational/FeatureServer/19",
    URL_SUMMARY_INTERP_AREA: urlRoot + "CIPS_Operational/FeatureServer/11", //urlRoot + "CIPS_20151015/FeatureServer/11",
    URL_EDIT_WATER_TANK: urlRoot + "CIPS_Operational/FeatureServer/0",
    URL_EDIT_RESERVOIR: urlRoot + "CIPS_Operational/FeatureServer/3",
    URL_EDIT_DISTURBED_AREA: urlRoot + "CIPS_Operational/FeatureServer/4",
    URL_EDIT_GROW_POINTS: urlRoot + "CIPS_Operational/FeatureServer/1",
    URL_EDIT_GROW_FOOTPRINTS: urlRoot + "CIPS_Operational/FeatureServer/2"
    
};
