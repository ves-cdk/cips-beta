require(["esri/arcgis/Portal", "esri/arcgis/OAuthInfo", "esri/IdentityManager", "dojo/dom-style", "dojo/dom-attr", "dojo/dom", "dojo/on", "dojo/_base/array", "dojo/domReady!"], 
function (arcgisPortal, OAuthInfo, esriId, domStyle, domAttr, dom, on, arrayUtils){

    //register app
    var info = new OAuthInfo({
        appId: "1amAGYkB8lGqy3ux",
        popup: false
    });
    esriId.registerOAuthInfos([info]);
    esriId.checkSignInStatus(info.portalUrl + "/sharing").then(
        function (){
            signIn();
        }
    ).otherwise(
        function (){
            $("#sign-in").show();
            $("#sign-in-text").show();
            $("#welcome-header").show();
        }
    );

    $("#sign-in").on('click', function() {
        esriId.getCredential(info.portalUrl + "/sharing");  
    });

    $("#sign-out").on('click', function() {
        esriId.destroyCredentials();
        window.location.reload();
    });

    function signIn() {
        var portal = new arcgisPortal.Portal(info.portalUrl);
        portal.signIn().then(function (portalUser){
            console.log("Signed in to the portal: ", portalUser);
            $("#user-id").text("Welcome " + portalUser.username);
            $("#sign-out").show();
            $("#main-content").show();

            getWebmaps(portalUser, portal);
        }).otherwise( function (error){
            console.log("Error occurred while signing in: ", error);
        });
    }

    function getWebmaps(portalUser, portal) {
        $("#status").html("Loading webmaps...");
        var params = {
            q: 'owner:' + portalUser.username + ' AND type: Web map', //q:'access:org AND type:Web map',
            num:100
        };
        
        portal.queryItems(params).then(function (webmaps){
            if(webmaps.results.length == 0)
                $("#status").html("No webmaps were found");
            else
                $("#status").html("");
            var maps = webmaps.results;
            var items = '';
            for(var i = 0; i < maps.length; i++) {
                items += "<option value=" + i + "><div class='webmap-container'>" + 
                            "<img src='" + maps[i].thumbnailUrl + "' height='80' width='120'>" +
                            "<h class='webmap-title'>" + maps[i].title + "</h>" +
                        "</div></option>";
            }

            $("#webmap-list").html(items);
            $("#webmap-list").change(function () {
                $("#save-json").show();
                var selectedMap = maps[this.value];
                $.ajax({
                    url: maps[this.value].itemDataUrl + '&f=pjson',
                    dataType: "JSON",
                    success: function(res) {
                        var tmp = {
                            item: {
                                title: selectedMap.title,
                                snippet: selectedMap.snippet,
                                extent: selectedMap.extent
                            },
                            itemData: res
                        };
                        var output = JSON.stringify(tmp, null, 2);
                        $("#json-content-p").html(output);
                    },
                    error: function(res) {
                        console.log(res);
                    }
                });
            });
        });
    }
});


        