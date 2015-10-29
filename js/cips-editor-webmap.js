// Application configuration settings

var appWebMap = dojo.getObject('appWebMap', true);

appWebMap = {
    WEBMAP_JSON: 
    // **** Copy  webmap2Json output into this section - Start **** 

	{
	  "item": {
	    "title": "CIPS_Editor",
	    "snippet": "CIPS",
	    "extent": [
	      [
	        -125.6784,
	        38.3893
	      ],
	      [
	        -119.2184,
	        41.7593
	      ]
	    ]
	  },
	  "itemData": {
	    "operationalLayers": [
	      {
	        "id": "CIPS_Operational_5300",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Operational/FeatureServer/1",
	        "visibility": true,
	        "opacity": 1,
	        "title": "Grow Footprints",
	        "itemId": "a0c69d0449784ef686a18d3ca5ae7bd2",
	        "layerDefinition": {
	          "drawingInfo": {
	            "renderer": {
	              "type": "simple",
	              "label": "",
	              "description": "",
	              "symbol": {
	                "color": null,
	                "outline": {
	                  "color": [
	                    255,
	                    0,
	                    0,
	                    255
	                  ],
	                  "width": 1.5,
	                  "type": "esriSLS",
	                  "style": "esriSLSSolid"
	                },
	                "type": "esriSFS",
	                "style": "esriSFSSolid"
	              }
	            }
	          },
	          "minScale": 53700,
	          "maxScale": 0
	        },
	        "popupInfo": {
	          "title": "Grow Footprints: {GrowKey}",
	          "fieldInfos": [
	            {
	              "fieldName": "OBJECTID",
	              "label": "OBJECTID",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GrowKey",
	              "label": "GrowKey",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "SWRCBRegID",
	              "label": "SWRCBRegID",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GrowID",
	              "label": "GrowID",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GrowYear",
	              "label": "GrowYear",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "dateFormat": "longMonthDayYear"
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GrowType",
	              "label": "GrowType",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GrowSqFt",
	              "label": "GrowSqFt",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "places": 2,
	                "digitSeparator": true
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "InterpMethod",
	              "label": "InterpMethod",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "InterpDate",
	              "label": "InterpDate",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "dateFormat": "longMonthDayYear"
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "PreProcStatus",
	              "label": "PreProcStatus",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "PreProcDate",
	              "label": "PreProcDate",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "dateFormat": "longMonthDayYear"
	              },
	              "stringFieldOption": "textbox"
	            }
	          ],
	          "description": null,
	          "showAttachments": true,
	          "mediaInfos": []
	        },
	        "capabilities": "Query"
	      },
	      {
	        "id": "CIPS_Base_3192",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Base/FeatureServer/0",
	        "visibility": false,
	        "opacity": 1,
	        "title": "Watershed Boundaries (HUC12)",
	        "itemId": "7bb40dce21bc4be7b1e455b344bc7d4e",
	        "layerDefinition": {
	          "drawingInfo": {
	            "renderer": {
	              "type": "simple",
	              "label": "",
	              "description": "",
	              "symbol": {
	                "color": null,
	                "outline": {
	                  "color": [
	                    0,
	                    92,
	                    230,
	                    255
	                  ],
	                  "width": 0.75,
	                  "type": "esriSLS",
	                  "style": "esriSLSSolid"
	                },
	                "type": "esriSFS",
	                "style": "esriSFSSolid"
	              }
	            }
	          },
	          "minScale": 937723,
	          "maxScale": 0
	        },
	        "popupInfo": {
	          "title": "base_CA_HUC12: {Name}",
	          "fieldInfos": [
	            {
	              "fieldName": "OBJECTID",
	              "label": "OBJECTID",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "TNMID",
	              "label": "TNMID",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "MetaSourceID",
	              "label": "MetaSourceID",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "SourceDataDesc",
	              "label": "SourceDataDesc",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "SourceOriginator",
	              "label": "SourceOriginator",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "SourceFeatureID",
	              "label": "SourceFeatureID",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "LoadDate",
	              "label": "LoadDate",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "dateFormat": "longMonthDayYear"
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GNIS_ID",
	              "label": "GNIS_ID",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "places": 0,
	                "digitSeparator": true
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "AreaAcres",
	              "label": "AreaAcres",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "places": 2,
	                "digitSeparator": true
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "AreaSqKm",
	              "label": "AreaSqKm",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "places": 2,
	                "digitSeparator": true
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "States",
	              "label": "States",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "HUC12",
	              "label": "HUC12",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "Name",
	              "label": "Name",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "HUType",
	              "label": "HUType",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "HUMod",
	              "label": "HUMod",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "ToHUC",
	              "label": "ToHUC",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "NonContributingAcres",
	              "label": "NonContributingAcres",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "places": 2,
	                "digitSeparator": true
	              },
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "NonContributingSqKm",
	              "label": "NonContributingSqKm",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": {
	                "places": 2,
	                "digitSeparator": true
	              },
	              "stringFieldOption": "textbox"
	            }
	          ],
	          "description": null,
	          "showAttachments": true,
	          "mediaInfos": []
	        }
	      },
	      {
	        "id": "CIPS_Base_3356",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Base/FeatureServer/1",
	        "visibility": true,
	        "opacity": 1,
	        "title": "SWRCB Regions",
	        "itemId": "7bb40dce21bc4be7b1e455b344bc7d4e",
	        "layerDefinition": {
	          "minScale": 13889686,
	          "maxScale": 432384
	        }
	      },
	      {
	        "id": "CIPS_Operational_320",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Operational/FeatureServer/2",
	        "visibility": true,
	        "opacity": 1,
	        "title": "Interpretation Areas",
	        "itemId": "a0c69d0449784ef686a18d3ca5ae7bd2",
	        "layerDefinition": {
	          "drawingInfo": {
	            "renderer": {
	              "type": "uniqueValue",
	              "field1": "StatusInterpArea",
	              "defaultSymbol": null,
	              "uniqueValueInfos": [
	                {
	                  "value": "Interp Completed",
	                  "symbol": {
	                    "color": null,
	                    "outline": {
	                      "color": [
	                        197,
	                        0,
	                        255,
	                        255
	                      ],
	                      "width": 1.125,
	                      "type": "esriSLS",
	                      "style": "esriSLSSolid"
	                    },
	                    "type": "esriSFS",
	                    "style": "esriSFSSolid"
	                  },
	                  "label": "Interp Completed"
	                },
	                {
	                  "value": "Interp in Progress",
	                  "symbol": {
	                    "color": null,
	                    "outline": {
	                      "color": [
	                        230,
	                        76,
	                        0,
	                        255
	                      ],
	                      "width": 1.125,
	                      "type": "esriSLS",
	                      "style": "esriSLSSolid"
	                    },
	                    "type": "esriSFS",
	                    "style": "esriSFSSolid"
	                  },
	                  "label": "Interp in Progress"
	                }
	              ]
	            }
	          },
	          "minScale": 13889686,
	          "maxScale": 0
	        },
	        "capabilities": "Query"
	      },
	      {
	        "id": "CIPS_Operational_8869",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Operational/FeatureServer/0",
	        "visibility": true,
	        "opacity": 1,
	        "title": "Grow Locations",
	        "itemId": "a0c69d0449784ef686a18d3ca5ae7bd2",
	        "layerDefinition": {
	          "minScale": 182918,
	          "maxScale": 43238,
	          "drawingInfo": {
	            "renderer": {
	              "type": "simple",
	              "label": "",
	              "description": "",
	              "symbol": {
	                "angle": 0,
	                "xoffset": 0,
	                "yoffset": 0,
	                "type": "esriPMS",
	                "url": "http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png",
	                "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RENEMEEyRkQyN0ExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RENEMEEzMEQyN0ExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFGMTYyNTRBRDI3OTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEQ0QwQTJFRDI3QTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",
	                "contentType": "image/png",
	                "width": 10.5,
	                "height": 10.5
	              }
	            }
	          }
	        },
	        "capabilities": "Query"
	      },
	      {
	        "id": "CIPS_20151009_3488",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_20151009/FeatureServer/2",
	        "visibility": true,
	        "opacity": 1,
	        "title": "CIPS_EditPoly",
	        "itemId": "9e01fd9acf9d4579a6ce89aa943ff5b3",
	        "layerDefinition": {
	          "drawingInfo": {
	            "renderer": {
	              "type": "simple",
	              "label": "",
	              "description": "",
	              "symbol": {
	                "color": [
	                  0,
	                  112,
	                  255,
	                  62
	                ],
	                "outline": {
	                  "color": [
	                    26,
	                    26,
	                    26,
	                    255
	                  ],
	                  "width": 0.75,
	                  "type": "esriSLS",
	                  "style": "esriSLSSolid"
	                },
	                "type": "esriSFS",
	                "style": "esriSFSSolid"
	              }
	            }
	          }
	        },
	        "popupInfo": {
	          "title": "CIPS_EditPoly: {Type}",
	          "fieldInfos": [
	            {
	              "fieldName": "OBJECTID",
	              "label": "OBJECTID",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "Type",
	              "label": "Type",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GlobalID",
	              "label": "",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            }
	          ],
	          "description": null,
	          "showAttachments": true,
	          "mediaInfos": []
	        }
	      },
	      {
	        "id": "CIPS_20151009_6078",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_20151009/FeatureServer/1",
	        "visibility": true,
	        "opacity": 1,
	        "title": "CIPS_EditLine",
	        "itemId": "9e01fd9acf9d4579a6ce89aa943ff5b3",
	        "layerDefinition": {
	          "drawingInfo": {
	            "renderer": {
	              "type": "simple",
	              "label": "",
	              "description": "",
	              "symbol": {
	                "color": [
	                  0,
	                  92,
	                  230,
	                  255
	                ],
	                "width": 0.9,
	                "type": "esriSLS",
	                "style": "esriSLSSolid"
	              }
	            }
	          }
	        },
	        "popupInfo": {
	          "title": "CIPS_EditLine: {Type}",
	          "fieldInfos": [
	            {
	              "fieldName": "OBJECTID",
	              "label": "OBJECTID",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "Type",
	              "label": "Type",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GlobalID",
	              "label": "",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            }
	          ],
	          "description": null,
	          "showAttachments": true,
	          "mediaInfos": []
	        }
	      },
	      {
	        "id": "CIPS_20151009_6898",
	        "layerType": "ArcGISFeatureLayer",
	        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_20151009/FeatureServer/0",
	        "visibility": true,
	        "opacity": 1,
	        "title": "CIPS_EditPoint",
	        "itemId": "9e01fd9acf9d4579a6ce89aa943ff5b3",
	        "layerDefinition": {
	          "drawingInfo": {
	            "renderer": {
	              "type": "simple",
	              "label": "",
	              "description": "",
	              "symbol": {
	                "angle": 0,
	                "xoffset": 0,
	                "yoffset": 0,
	                "type": "esriPMS",
	                "url": "http://static.arcgis.com/images/Symbols/Shapes/BlueCircleLargeB.png",
	                "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NkRDMzYxRUQzMjIxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3ODNFRUI4QUQzMjIxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU2REMzNjFDRDMyMjExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU2REMzNjFERDMyMjExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",
	                "contentType": "image/png",
	                "width": 16,
	                "height": 16
	              }
	            }
	          }
	        },
	        "popupInfo": {
	          "title": "CIPS_EditPoint: {Type}",
	          "fieldInfos": [
	            {
	              "fieldName": "OBJECTID",
	              "label": "OBJECTID",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "Type",
	              "label": "Type",
	              "isEditable": true,
	              "tooltip": "",
	              "visible": true,
	              "format": null,
	              "stringFieldOption": "textbox"
	            },
	            {
	              "fieldName": "GlobalID",
	              "label": "",
	              "isEditable": false,
	              "tooltip": "",
	              "visible": false,
	              "format": null,
	              "stringFieldOption": "textbox"
	            }
	          ],
	          "description": null,
	          "showAttachments": true,
	          "mediaInfos": []
	        }
	      }
	    ],
	    "baseMap": {
	      "baseMapLayers": [
	        {
	          "id": "defaultBasemap",
	          "layerType": "ArcGISTiledMapServiceLayer",
	          "opacity": 1,
	          "visibility": true,
	          "url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
	        }
	      ],
	      "title": "Topographic"
	    },
	    "spatialReference": {
	      "wkid": 102100,
	      "latestWkid": 3857
	    },
	    "authoringApp": "WebMapViewer",
	    "authoringAppVersion": "3.9",
	    "version": "2.2",
	    "bookmarks": [
	      {
	        "extent": {
	          "spatialReference": {
	            "wkid": 102100,
	            "latestWkid": 3857
	          },
	          "xmax": -13297322.34501437,
	          "xmin": -13964464.727887353,
	          "ymax": 5123769.887129902,
	          "ymin": 4635795.89855736
	        },
	        "name": "Home"
	      }
	    ],
	    "applicationProperties": {
	      "viewing": {
	        "routing": {
	          "enabled": true
	        },
	        "basemapGallery": {
	          "enabled": true
	        },
	        "measure": {
	          "enabled": true
	        }
	      }
	    }
	  }
	}	

    // **** Copy webmap2Json output into this section - end **** 
};
