
// FUNCTIONS REMOVED FROM cips_editor.js ON 10/28/15

app.loadPrioritization = function(action) {
	switch(action) {
	case "loadRegion":
		$("#menuLoadPA").show();
		$("#frmLoadRegion").prop("disabled", true);
		$("#modelReset").show();
		break;
	case "loadPA":
		$("#menuLoadPM").show();
		$("#frmLoadPA").prop("disabled", true);
		break;
	case "loadPM":
		// loading Prioritization model
		$("#modelStatus").html("Status: Model loaded");
		$("#frmLoadPM").prop("disabled", true);
		$("#showModelParams").show();
		$("#menuModelRenderer").show();
		app.loadModel();
		//app.loadRenderer();
		break;
	case "showParams":
		$('#inputRegion').val($("#frmLoadRegion").val());
		$('#inputPA').val($("#frmLoadPA").val());
		$('#inputPM').val($("#frmLoadPM").val());
		$("#prioritizationModelParams").modal();
		break;
	case "reset":
		$("#frmLoadRegion").prop("disabled", false);
		$("#frmLoadPA").prop("disabled", false);
		$("#frmLoadPM").prop("disabled", false);
		$("#menuLoadPA").hide();
		$("#menuLoadPM").hide();
		$("#showModelParams").hide();
		$("#modelReset").hide();
		$("#frmLoadRegion").val("Select a Region");
		$("#frmLoadPA").val("Select an Area");
		$("#frmLoadPM").val("Select a Model");
		$("#menuModelRenderer").hide();
		$("#modelStatus").html("Status: Ready to load");
		break;
	}

};

app.renderPrioritization = function() {
	//console.log("render change");
	app.loadRenderer();
};
// create layer from single query (not appending related records)
app.createLayerFromQuery = function() {
	$.when(app.runQuery("http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/0", "SWRCBRegID=1 and InterpAreaID=3 and PrioritizAreaID = 1", function(qryResultsLyr) {
		//console.log(qryResultsLyr);
		$.when(app.createPolyFC("Test Poly", qryResultsLyr, function(createdFC) {
			//console.log(createdFC);
			$.when(app.addToFeature(createdFC, qryResultsLyr, function(callback) {
				//console.log("createLayerFromQuery", callback);
				layerFromQuery = callback;
			}));
		}));
	}));
};

app.createGrowSum = function() {

	$.when(app.runQuery(appConfig.GROW_POLYS_URL, "0=0", function(qryResultsLyr) {
		$.when(app.appendRecsToPoint(appConfig.GROW_PREPROC_RESULTS_URL, "PreProcDataSourceName='Cultivated Area'", qryResultsLyr, "GrowID", function(ftrLayerCallback) {
			//console.log(ftrLayerCallback);
		}));
	}));
};

app.polyToPointLayer = function(newLyrName, polyUrl, queryParams, relateUrl, queryParamsRelate, relateField) {
	// This function takes an input polygon feature service and converts to a point featureCollection, adding it to the map.
	//   It's built to append related records from a separate service. If no related service is given, it ignores this.

	// example call, without appending records:
	//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20");

	// example call with related record:
	//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1", "PrioritizGrowKey");

	// Query the poly feature service to get the returned objects
	$.when(app.runQuery(polyUrl, queryParams, function(qryResultsLyr) {
		//ftrLayer = qryResultsLyr;

		// Call this function to append joined records to the first query results.
		//   if no joined table is specified, the function just returns query results.
		$.when(app.appendRecsToPoint(relateUrl, queryParamsRelate, qryResultsLyr, relateField, function(ftrLayerCallback) {
			ftrLayer = ftrLayerCallback;

			// Create the point featureCollection template
			var featureCollection = {
				"layerDefinition" : null,
				"featureSet" : {
					"features" : [],
					"geometryType" : "esriGeometryPoint"
				}
			};
			featureCollection.layerDefinition = {
				"geometryType" : "esriGeometryPoint",
				"objectIdField" : "ObjectID",
				"drawingInfo" : {
					"renderer" : {
						"type" : "simple",
						"symbol" : {
							"type" : "esriPMS",
							"url" : "http://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
							"contentType" : "image/png",
							"width" : 15,
							"height" : 15
						}
					}
				},
				"fields" : []
			};

			$.each(ftrLayer.fields, function(i) {
				featureCollection.layerDefinition.fields.push(ftrLayer.fields[i]);
			});

			//create a feature layer based on the feature collection
			pointFtrLayer = new FeatureLayer(featureCollection, {
				id : newLyrName
			});

			//associate the features with the popup on click
			pointFtrLayer.on("click", function(evt) {
				map.infoWindow.setFeatures([evt.graphic]);
			});

			map.on("layers-add-result", function(results) {
				loadData();
			});

			map.addLayers([pointFtrLayer]);

			function loadData() {
				var geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
				var features = [];
				var count = 0;
				$.each(qryResultsLyr.features, function(i) {
					$.when(geometryService.labelPoints([qryResultsLyr.features[i].geometry], function(callback) {
						//console.log("geometryService callback", callback);
						var geometry = callback;

						var graphic = new Graphic();
						graphic.setAttributes(qryResultsLyr.features[i].attributes);
						graphic.geometry = callback[0];
						features.push(graphic);
						count = count + 1;
						if (count == qryResultsLyr.features.length) {
							testObj = features;
							pointFtrLayer.applyEdits(features, null, null);
							var popupInfo = generateDefaultPopupInfo(featureCollection);
							var infoTemplate = new InfoTemplate(buildInfoTemplate(popupInfo));
							pointFtrLayer.infoTemplate = infoTemplate;
						}
					}));
				});
			};
			//var test = graphicsUtils.graphicsExtent(mapResponse.itemInfo.itemData.operationalLayers[6].layerObject.graphics);
			//					map.setExtent(test);
			function generateDefaultPopupInfo(featureCollection) {
				var fields = featureCollection.layerDefinition.fields;
				var decimal = {
					'esriFieldTypeDouble' : 1,
					'esriFieldTypeSingle' : 1
				};
				var integer = {
					'esriFieldTypeInteger' : 1,
					'esriFieldTypeSmallInteger' : 1
				};
				var dt = {
					'esriFieldTypeDate' : 1
				};
				var displayField = null;
				var fieldInfos = arrayUtil.map(fields, lang.hitch(this, function(item) {
					if (item.name.toUpperCase() === "NAME") {
						displayField = item.name;
					}
					var visible = (item.type !== "esriFieldTypeOID" && item.type !== "esriFieldTypeGlobalID" && item.type !== "esriFieldTypeGeometry");
					var format = null;
					if (visible) {
						var f = item.name.toLowerCase();
						var hideFieldsStr = ",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,";
						if (hideFieldsStr.indexOf("," + f + ",") > -1 || f.indexOf("area") > -1 || f.indexOf("length") > -1 || f.indexOf("shape") > -1 || f.indexOf("perimeter") > -1 || f.indexOf("objectid") > -1 || f.indexOf("_") == f.length - 1 || f.indexOf("_i") == f.length - 2) {
							visible = false;
						}
						if (item.type in integer) {
							format = {
								places : 0,
								digitSeparator : true
							};
						} else if (item.type in decimal) {
							format = {
								places : 2,
								digitSeparator : true
							};
						} else if (item.type in dt) {
							format = {
								dateFormat : 'shortDateShortTime'
							};
						}
					}
					return lang.mixin({}, {
						fieldName : item.name,
						label : item.alias,
						isEditable : false,
						tooltip : "",
						visible : visible,
						format : format,
						stringFieldOption : 'textbox'
					});
				}));
				var popupInfo = {
					title : displayField ? '{' + displayField + '}' : '',
					fieldInfos : fieldInfos,
					description : null,
					showAttachments : false,
					mediaInfos : []
				};
				return popupInfo;
			}

			function buildInfoTemplate(popupInfo) {
				var json = {
					content : "<table>"
				};

				json.content += "<div class='popup-header'>" + newLyrName + "<\/div><div class='popup-hz-line'><\/div>";

				arrayUtil.forEach(popupInfo.fieldInfos, function(field) {
					if (field.visible) {
						json.content += "<tr><td valign='top'>" + field.label + ": <\/td><td valign='top'>${" + field.fieldName + "}<\/td><\/tr>";
					}
				});
				json.content += "<\/table>";
				return json;
			}

		}));
	}));
};

app.loadGrow = function(option) {

	var queryParams;

	switch(option.id) {
	case "optionLoadAll":
		$("#loadStatus").html("Status: Adding locations, please wait");

		if (map.getLayer("Grow Locations")) {
			app.removeMapLayer("Grow Locations");
		};
		queryParams = "0=0";
		$.when(app.polyToClusterPointLayer("Grow Locations", appConfig.GROW_POLYS_URL, queryParams, null, null, null, 72223, null, function(callback) {
			app.zoomToLayerExtent("Grow Locations");
			$("#loadStatus").html("Status: Grow Locations added");
		}));
		$("#loadGrowReset").show();
		$("#radioLoadRegion").hide();
		//$("#radioLoadInterp").hide();
		$("#loadGrowReset").show();
		break;
	case "optionLoadRegion":
		$("#menuLoadGrowRegion").show();
		$("#radioLoadAll").hide();
		//$("#radioLoadInterp").hide();
		$("#loadGrowReset").show();
		break;
	case "optionLoadInterp":
		$("#menuLoadGrowInterp").show();
		$("#radioLoadAll").hide();
		$("#radioLoadRegion").hide();
		$("#loadGrowReset").show();
		break;
	case "frmLoadGrowRegion":
		$("#loadStatus").html("Status: Adding locations, please wait");
		if (map.getLayer("Grow Locations")) {
			app.removeMapLayer("Grow Locations");
		};
		queryParams = "SWRCBRegID=" + option.value;
		$.when(app.polyToClusterPointLayer("Grow Locations", appConfig.GROW_POLYS_URL, queryParams, null, null, null, 72223, null, function(callback) {
			app.zoomToLayerExtent("Grow Locations");
			$("#loadStatus").html("Status: Grow Locations added");
		}));
		break;
	case "frmLoadGrowInterp":
		queryParams = "InterpAreaID=" + option.value;
		$("#loadStatus").html("Status: Grow Locations added");
		break;
	case "loadGrowReset":
		if (map.getLayer("Grow Locations")) {
			app.removeMapLayer("Grow Locations");
		};
		queryParams = "";
		$("#menuLoadGrowRegion").hide();
		$("#menuLoadGrowInterp").hide();
		$("#radioLoadAll").show();
		$("#radioLoadRegion").show();
		//$("#radioLoadInterp").show();
		$("#loadGrowReset").hide();
		$("#frmLoadGrowRegion").val("Select a Region");
		$("#frmLoadGrowInterp").val("Select an Interpretation Area");
		$("#optionLoadAll").attr("checked", false);
		$("#optionLoadRegion").attr("checked", false);
		$("#optionLoadInterp").attr("checked", false);
		$("#loadStatus").html("Status: Ready to display");
		break;
	};
};

app.removeMapLayer = function(layerName) {

	// remove from map
	var layerToRemove = map.getLayer(layerName);
	map.removeLayer(layerToRemove);

	// remove from TOC
	var tocIndex = 0;
	toc.layerInfos.forEach(function(i) {
		if (i.title === layerName) {
			toc.layerInfos.splice(tocIndex, 1);
		} else {
			tocIndex += 1;
		}
	});
	toc.refresh();

};

app.polyToClusterPointLayer = function(newLyrName, polyUrl, queryParams, relateUrl, queryParamsRelate, relateField, maxScale, minScale, loadCallback) {
	// TESTING - generic cluster layer

	// This function takes an input polygon feature service and converts to a point featureCollection, adding it to the map.
	//   It's built to append related records from a separate service. If no related service is given, it ignores this.

	// example call, without appending records:
	//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20");

	// example call with related record:
	//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1", "PrioritizGrowKey");

	// Query the poly feature service to get the returned objects
	$.when(app.runQuery(polyUrl, queryParams, function(qryResultsLyr) {

		//ftrLayer = qryResultsLyr;

		// Call this function to append joined records to the first query results.
		//   if no joined table is specified, the function just returns query results.
		$.when(app.appendRecsToPoint(relateUrl, queryParamsRelate, qryResultsLyr, relateField, function(ftrLayerCallback) {
			var geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
			var features = [];
			var count = 0;
			$.each(ftrLayerCallback.features, function(i) {

				//var myPolygonCenterLatLon = qryResultsLyr.features[i].getExtent().getCenter();
				var callback = qryResultsLyr.features[i].geometry.getCentroid();
				ftrLayerCallback.features[i].geometry.x = callback.x;
				ftrLayerCallback.features[i].geometry.y = callback.y;

				//$.when(geometryService.labelPoints([qryResultsLyr.features[i].geometry], function(callback) {
				//	console.log("geometryService callback", callback);
				//	ftrLayerCallback.features[i].geometry.x = callback[0].x;
				//	ftrLayerCallback.features[i].geometry.y = callback[0].y;
				count = count + 1;
				if (count == qryResultsLyr.features.length) {

					featureSet = ftrLayerCallback;

					var inputInfo = {};
					inputInfo.data = dojo.map(featureSet.features, function(feature) {
						var pointX = feature.geometry.x;
						var pointY = feature.geometry.y;
						var att = feature.attributes;
						return {
							"x" : pointX,
							"y" : pointY,
							"attributes" : att
						};
					});

					//console.log(inputInfo);

					var popupInfo = generateDefaultPopupInfo(ftrLayerCallback.fields);
					var infoTemplate = new InfoTemplate(buildInfoTemplate(popupInfo));

					// cluster layer that uses OpenLayers style clustering
					clusterLayer = new ClusterLayer({
						"data" : inputInfo.data,
						"distance" : 40,
						"id" : newLyrName,
						"labelColor" : "#fff",
						"labelOffset" : -5,
						"resolution" : map.extent.getWidth() / map.width,
						"singleColor" : "#888",
						"showSingles" : false,
						"webmap" : true,
						"singleTemplate" : infoTemplate
					});
					var defaultSym = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 12, 12);
					var renderer = new esri.renderer.ClassBreaksRenderer(defaultSym, "clusterCount");
					var group1 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 30, 30);
					var group2 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 42, 42);
					//GreenCircleLargeB
					var group3 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 54, 54);
					//RedCircleLargeB
					renderer.addBreak(0, 5, group1);
					renderer.addBreak(5, 20, group2);
					renderer.addBreak(20, 50000, group3);
					clusterLayer.setRenderer(renderer);
					if (maxScale) {
						clusterLayer.setMaxScale(maxScale);
					}
					if (minScale) {
						clusterLayer.setMinScale(minScale);
					}
					clusterLayerClickHandler = clusterLayer._onClickHandler;
					map.addLayers([clusterLayer]);
					toc.layerInfos.push({
						"layer" : clusterLayer,
						"title" : newLyrName
					});
					toc.refresh();
					loadCallback("Load complete");
				}
				//}));
			});

		}));
	}));

	function generateDefaultPopupInfo(fields) {
		//console.log(fields);
		//var fields = featureCollection;
		var decimal = {
			'esriFieldTypeDouble' : 1,
			'esriFieldTypeSingle' : 1
		};
		var integer = {
			'esriFieldTypeInteger' : 1,
			'esriFieldTypeSmallInteger' : 1
		};
		var dt = {
			'esriFieldTypeDate' : 1
		};
		var displayField = null;
		var fieldInfos = arrayUtil.map(fields, lang.hitch(this, function(item) {
			if (item.name.toUpperCase() === "NAME") {
				displayField = item.name;
			}
			var visible = (item.type !== "esriFieldTypeOID" && item.type !== "esriFieldTypeGlobalID" && item.type !== "esriFieldTypeGeometry");
			var format = null;
			if (visible) {
				var f = item.name.toLowerCase();
				var hideFieldsStr = ",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,";
				if (hideFieldsStr.indexOf("," + f + ",") > -1 || f.indexOf("area") > -1 || f.indexOf("length") > -1 || f.indexOf("shape") > -1 || f.indexOf("perimeter") > -1 || f.indexOf("objectid") > -1 || f.indexOf("_") == f.length - 1 || f.indexOf("_i") == f.length - 2) {
					visible = false;
				}
				if (item.type in integer) {
					format = {
						places : 0,
						digitSeparator : true
					};
				} else if (item.type in decimal) {
					format = {
						places : 2,
						digitSeparator : true
					};
				} else if (item.type in dt) {
					format = {
						dateFormat : 'shortDateShortTime'
					};
				}
			}
			return lang.mixin({}, {
				fieldName : item.name,
				label : item.alias,
				isEditable : false,
				tooltip : "",
				visible : visible,
				format : format,
				stringFieldOption : 'textbox'
			});
		}));
		var popupInfo = {
			title : displayField ? '{' + displayField + '}' : '',
			fieldInfos : fieldInfos,
			description : null,
			showAttachments : false,
			mediaInfos : []
		};
		return popupInfo;
	}

	function buildInfoTemplate(popupInfo) {
		var json = {
			content : "<table>"
		};

		json.content += "<div class='popup-header'>" + newLyrName + "<\/div><div class='popup-hz-line'><\/div>";

		arrayUtil.forEach(popupInfo.fieldInfos, function(field) {
			if (field.visible) {
				json.content += "<tr><td valign='top'>" + field.label + ": <\/td><td valign='top'>${" + field.fieldName + "}<\/td><\/tr>";
			}
		});
		json.content += "<\/table>";
		return json;
	}

};

app.zoomToLayerExtent = function(layerName) {
	var extentLayer = map.getLayer(layerName);
	var lyrExtent = esri.graphicsExtent(extentLayer.graphics);
	var newExtent = lyrExtent.expand(1.25);
	map.setExtent(newExtent);
};

app.appendRecsToPoint = function(relateUrl, queryParamsRelate, ftrLayer, relateField, callback) {
	// Called from app.polyToPointLayer, This appends related records to the point feature being created from a poly
	//  in a separate function to force syncronous behavior
	if (relateUrl) {
		// If relateUrl is given, append records
		$.when(app.runQuery(relateUrl, queryParamsRelate, function(qryResultsRelate) {
			relateLayer = qryResultsRelate;
			$.extend(ftrLayer.fields, relateLayer.fields);
			var relateLayerAttr = [];
			$.each(relateLayer.features, function(i) {
				relateLayerAttr.push(relateLayer.features[i].attributes);
			});

			$.each(ftrLayer.features, function(i) {
				var relateId = ftrLayer.features[i].attributes[relateField];
				var relateObjects = $.grep(relateLayerAttr, function(item) {
					return item[relateField] === relateId;
				});
				$.extend(ftrLayer.features[i].attributes, ftrLayer.features[i].attributes, relateObjects[0]);

			});
			callback(ftrLayer);
		}));
	} else {
		// no relateUrl, no appending of records, just go back to parent function
		callback(ftrLayer);
	}
};

// create layer with appended attrbutes
app.loadModel = function() {
	// Run from the Load Model button in the left menu.
	//var featureUrl = "http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/0";
	var featureUrl = "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1";
	//"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/PrioritizationDemo/FeatureServer/3";
	//var relateUrl = "http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/8";
	var relateUrl = "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10";
	//"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/PrioritizationDemo/FeatureServer/12";
	var qryWhere = "SWRCBRegID=" + $("#frmLoadRegion").val() + " and PrioritizAreaID=" + $("#frmLoadPA").val() + " and PrioritizAreaID=" + $("#frmLoadPM").val();
	//var qryWhere = "SWRCBRegID=1 and InterpAreaID=3 and PrioritizAreaID = 1";
	var relateField = "PrioritizGrowKey";
	var featureType = "poly";
	// "poly" or "point" types allowed
	var featureName = "Test";
	//$("#frmModelName").val();
	app.createAppendedLayer(featureUrl, relateUrl, qryWhere, relateField, featureType, featureName);
};

// create layer with appended attrbutes
app.loadModel = function() {
	// Run from the Load Model button in the left menu.
	//var featureUrl = "http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/0";
	var featureUrl = "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1";
	//"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/PrioritizationDemo/FeatureServer/3";
	//var relateUrl = "http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/8";
	var relateUrl = "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10";
	//"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/PrioritizationDemo/FeatureServer/12";
	var qryWhere = "SWRCBRegID=" + $("#frmLoadRegion").val() + " and PrioritizAreaID=" + $("#frmLoadPA").val() + " and PrioritizAreaID=" + $("#frmLoadPM").val();
	//var qryWhere = "SWRCBRegID=1 and InterpAreaID=3 and PrioritizAreaID = 1";
	var relateField = "PrioritizGrowKey";
	var featureType = "poly";
	// "poly" or "point" types allowed
	var featureName = "Test";
	//$("#frmModelName").val();
	app.createAppendedLayer(featureUrl, relateUrl, qryWhere, relateField, featureType, featureName);
};

app.createAppendedLayer = function(featureUrl, relateUrl, qryWhere, relateField, featureType, featureName) {
	var ftrLayer, relateLayer;

	//testObj = ftrLayer;

	$.when(app.runQuery(featureUrl, qryWhere, function(qryResultsLyr) {
		ftrLayer = qryResultsLyr;
		$.when(app.runQuery(relateUrl, qryWhere, function(qryResultsRelate) {
			relateLayer = qryResultsRelate;

			$.extend(ftrLayer.fields, relateLayer.fields);
			//console.log(ftrLayer, relateLayer);
			var relateLayerAttr = [];
			$.each(relateLayer.features, function(i) {
				relateLayerAttr.push(relateLayer.features[i].attributes);
			});

			$.each(ftrLayer.features, function(i) {
				//eval("var relateId = ftrLayer.features[i].attributes." + relateField);
				//var relateId = ftrLayer.features[i].attributes.PrioritizGrowKey;
				var relateId = ftrLayer.features[i].attributes[relateField];
				var relateObjects = $.grep(relateLayerAttr, function(item) {
					return item[relateField] === relateId
				});
				$.extend(ftrLayer.features[i].attributes, ftrLayer.features[i].attributes, relateObjects[0]);
			});

			//callback(ftrLayer);
			if (featureType === "poly") {
				$.when(app.createPolyFC(featureName, ftrLayer, function(createdFC) {
					//console.log(createdFC);
					$.when(app.addToFeature(createdFC, ftrLayer, function(addedFeature) {
						//console.log("Create feature complete: ", addedFeature);
						addLayers.push(addedFeature);
						$.each(addLayers[0].fields, function(i) {
							var fldName = addLayers[0].fields[i].name;
							$('#frmModelFields').append($('<option>', {
								value : fldName
							}).text(fldName));
						});
					}));
				}));
			}

			if (featureType === "point") {
				$.when(app.createPointFC(featureName, ftrLayer, function(createdFC) {
					//console.log(createdFC);
					$.when(app.addToFeature(createdFC, ftrLayer, function(addedFeature) {
						//console.log("Create feature complete: ", addedFeature);
						addLayers.push(addedFeature);
						$.each(addLayers[0].fields, function(i) {
							var fldName = addLayers[0].fields[i].name;
							$('#frmModelFields').append($('<option>', {
								value : fldName
							}).text(fldName));
						});
					}));
				}));
			}

		}));
	}));
};

// Creating template feature classes for on-the-fly rendering
app.createPointFC = function(fcTitle, qryResults, callback) {

	if (!(fcTitle)) {
		fcTitle = "Point Layer";
	}

	featureCollection = {
		"layerDefinition" : null,
		"featureSet" : {
			"features" : [],
			"geometryType" : "esriGeometryPoint"
		}
	};
	featureCollection.layerDefinition = {
		"geometryType" : "esriGeometryPoint",
		"objectIdField" : "ObjectID",
		"drawingInfo" : {
			"renderer" : {
				"type" : "simple",
				"symbol" : {
					"type" : "esriPMS",
					"url" : "http://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
					//"imageData" : "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",
					"contentType" : "image/png",
					"width" : 15,
					"height" : 15
				}
			}
		},
		"fields" : [{
			"name" : "ObjectID",
			"alias" : "ObjectID",
			"type" : "esriFieldTypeOID"
		}]
	};

	featureInfoTemplate = new InfoTemplate();
	featureInfoTemplate.setTitle(fcTitle);
	var featureInfoTemplateContent = "";

	$.each(qryResults.fields, function(i) {
		//pointFeature.fields.push(qryResults.fields[i]);
		featureCollection.layerDefinition.fields.push(qryResults.fields[i]);
		featureInfoTemplateContent += "'" + qryResults.fields[i].name + ": ${" + qryResults.fields[i].name + "}<br/>'";
	});

	pointFeature = new FeatureLayer(featureCollection, {
		id : fcTitle
	});
	pointFeature.infoTemplate = featureInfoTemplate;

	callback(pointFeature);

};

app.createPolyFC = function(fcTitle, qryResults, callback) {

	if (!(fcTitle)) {
		fcTitle = "Poly Layer";
	}

	featureCollection = {
		"layerDefinition" : null,
		"featureSet" : {
			"features" : [],
			"geometryType" : "esriGeometryPoly"
		}
	};
	featureCollection.layerDefinition = {
		"geometryType" : "esriGeometryPolygon",
		"objectIdField" : "ObjectID",
		/*"drawingInfo" : {
		 "renderer" : {
		 "type" : "simple",
		 "symbol" : {
		 "type" : "esriPMS",
		 "url" : "http://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
		 //"imageData" : "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",
		 "width" : 15,
		 "height" : 15
		 }
		 }
		 },*/
		"fields" : [{
			"name" : "ObjectID",
			"alias" : "ObjectID",
			"type" : "esriFieldTypeOID"
		}]
	};

	featureInfoTemplate = new InfoTemplate();
	featureInfoTemplate.setTitle(fcTitle);
	var featureInfoTemplateContent = "";

	$.each(qryResults.fields, function(i) {
		//pointFeature.fields.push(qryResults.fields[i]);
		featureCollection.layerDefinition.fields.push(qryResults.fields[i]);
		featureInfoTemplateContent += "'" + qryResults.fields[i].name + ": ${" + qryResults.fields[i].name + "}<br/>'";
	});

	polyFeature = new FeatureLayer(featureCollection, {
		id : fcTitle,
		mode : FeatureLayer.MODE_SNAPSHOT
	});
	polyFeature.infoTemplate = featureInfoTemplate;

	callback(polyFeature);

};

app.addToFeature = function(addFeature, qryResults, callback) {
	var graphic;
	$.each(qryResults.features, function(i) {
		graphic = new Graphic(qryResults.features[i].geometry);
		graphic.setAttributes(qryResults.features[i].attributes);
		addFeature.add(graphic);
		//, null, null, featureInfoTemplate);
	});

	//addFeature.setRenderer(renderer);
	map.addLayer(addFeature);
	callback(addFeature);
	//testObj = addFeature;
};

//--Layer renderer functions - Start ----------------------------------------------------------------------

app.loadRenderer = function() {
	var renderField = $("#frmLoadRenderer").val();
	app.classBreakRenderer(renderField, addLayers[0]);
};

app.classBreakRenderer = function(renderField, renderLayer) {
	// simple class break renderer with 5 classes
	var symbol = new SimpleFillSymbol();
	symbol.setColor(new Color([150, 150, 150, 0.5]));
	renderer = new ClassBreaksRenderer(symbol, renderField);
	renderer.addBreak(0, 1, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
	renderer.addBreak(1, 2, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
	renderer.addBreak(2, 3, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
	renderer.addBreak(3, 4, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
	renderer.addBreak(4, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));
	renderLayer.setRenderer(renderer);
	renderLayer.refresh();
};

app.classBreakRendererPoint = function(renderField, renderLayer) {
	var defaultSym = new SimpleMarkerSymbol().setSize(4);
	var renderer = new ClassBreaksRenderer(defaultSym, renderField);

	var picBaseUrl = "http://static.arcgis.com/images/Symbols/Shapes/";
	var blue = new PictureMarkerSymbol(picBaseUrl + "BlueCircleLargeB.png", 15, 15).setOffset(0, 15);
	var green = new PictureMarkerSymbol(picBaseUrl + "GreenCircleLargeB.png", 15, 15).setOffset(0, 15);
	var red = new PictureMarkerSymbol(picBaseUrl + "RedCircleLargeB.png", 15, 15).setOffset(0, 15);
	renderer.addBreak(0, 1, blue);
	renderer.addBreak(1, 2, green);
	renderer.addBreak(2, 1000, red);
	renderLayer.setRenderer(renderer);
	renderLayer.refresh();
};

app.colorRampRenderer = function(renderField, renderLayer) {
	renderer = new SimpleRenderer(new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.5)));
	renderer.setColorInfo({
		field : renderField,
		minDataValue : 0,
		maxDataValue : 5,
		colors : [new Color([255, 255, 255]), new Color([127, 127, 0])]
	});
	renderLayer.setRenderer(renderer);
	renderLayer.refresh();
};

app.smartRenderer = function(renderField, renderlayer) {
	smartMapping.createClassedColorRenderer({
		layer : renderlayer,
		field : renderField,
		//basemap: map.getBasemap(),
		classificationMethod : "quantile"
	}).then(function(response) {
		layer.setRenderer(response.renderer);
		layer.redraw();
		//createLegend(map, layer, field);
	});
};
