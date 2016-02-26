using System;
using System.Security.Principal;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.Security;
using System.Web.SessionState;

namespace cips_beta
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            string JQueryVer = "1.11.3";
            ScriptManager.ScriptResourceMapping.AddDefinition("jquery", new ScriptResourceDefinition
            {
                Path = "~/js/lib/jquery-" + JQueryVer + ".min.js",
                DebugPath = "~/js/lib/jquery-" + JQueryVer + ".min.js", // non minified here, if available
                CdnPath = "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-" + JQueryVer + ".min.js",
                CdnDebugPath = "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-" + JQueryVer + ".js",
                CdnSupportsSecureConnection = true,
                LoadSuccessExpression = "window.jQuery"
            });
        }

        protected void Application_OnPostAuthenticateRequest(object sender, EventArgs e)
        {
            // Get a reference to the current User
            IPrincipal currentUser = HttpContext.Current.User;

            // If we are dealing with an authenticated forms authentication request
            if (currentUser.Identity.IsAuthenticated)
            {
                // Create a CustomIdentity based on the FormsAuthenticationTicket           
                var identity = (FormsIdentity)currentUser.Identity; // new CustomIdentity(((FormsIdentity)currentUser.Identity).Ticket);

                // Create the CustomPrincipal
                var user = new GenericPrincipal(identity, null);
                
                // Attach the CustomPrincipal to HttpContext.User and Thread.CurrentPrincipal
                HttpContext.Current.User = user;
                //Thread.CurrentPrincipal = user;
            }
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}