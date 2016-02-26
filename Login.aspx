<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="cips_beta.Login" %>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="CIPS">
		<meta name="author" content="VESTRA Resources, Inc.">
		<link rel="shortcut icon" href="img/favicon.png">
		<title>CIPS</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/cips.css">
        <style>
            #loginTable {
                margin: 5px auto 10px auto;
            }
            #loginTable td {
                padding: 2px;
            }

        </style>
	</head>

	<body class="claro">

		<!-- Header -->
		<div id="header-container" class="navbar navbar-fixed-top">
			<div class="navbar-header pull-left">
				<img class="logo" src="img/logo.png" title="Cannabis Identification and Prioritization System">
				<!--<a class="navbar-brand" id="appTitle" href="javascript:void(0);"></a>-->
			</div>
			<div class="navbar-header">
				<button title="Show/hide the top menu" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#headerTabs">
					<i class="fa fa-bars"></i>
				</button>
			</div>
			<ul class="collapse navbar-collapse nav navbar-nav navbar-right" id="headerTabs">
				<li id="aboutCips">
					<a id="about-cips" class="action"><i class="fa fa-info-circle fa-lg" title="About CIPS"></i></a>
				</li>				
			</ul>
			<div class="navbar-header pull-right">
				<img class="logo-right visible-lg visible-md visible-sm" src="img/logo-right.png">
			</div>
		</div>
 
        <!-- In-Role Content -->
		<div id="appContent" class="sectionContent">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12" style="text-align: center;">
                        <br /><br />
                        <form id="form1" runat="server">

                            <h3>CIPS Login Page</h3>
                            <table id="loginTable">
                              <tr>
                                <td>
                                  Username:</td>
                                <td>
                                  <asp:TextBox ID="UserEmail" runat="server" /></td>
                                <td>
                                  <asp:RequiredFieldValidator ID="RequiredFieldValidator1" 
                                    ControlToValidate="UserEmail"
                                    Display="Dynamic" 
                                    ErrorMessage="Cannot be empty." 
                                    runat="server" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Password:</td>
                                <td>
                                  <asp:TextBox ID="UserPass" TextMode="Password" 
                                     runat="server" />
                                </td>
                                <td>
                                  <asp:RequiredFieldValidator ID="RequiredFieldValidator2" 
                                    ControlToValidate="UserPass"
                                    ErrorMessage="Cannot be empty." 
                                    runat="server" />
                                </td>
                              </tr>
                              <tr style="display: none;">
                                <td>
                                  Remember me?</td>
                                <td>
                                  <asp:CheckBox ID="Persist" runat="server" /></td>
                              </tr>
                            </table>
                            <asp:Button ID="Submit1" OnClick="Logon_Click" Text="Log On" 
                               runat="server" />
                            <p>
                              <asp:Label ID="Msg" ForeColor="red" runat="server" />
                            </p>
                          </form>
					</div>
				</div>
			</div>
		</div>

		<!-- JS libraries, placed at the end of the document so the pages load faster -->
		<script type="text/javascript" src="js/lib/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/lib/moment.js"></script>
		<script type="text/javascript" src="js/lib/bootstrap.min.js"></script>

	</body>
</html>





