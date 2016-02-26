using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace cips_beta
{
    public partial class Editor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            FormsIdentity ident = (HttpContext.Current.User.Identity as FormsIdentity);
            bool isEditor = ident.Ticket.UserData.Contains(ConfigurationManager.AppSettings["CipsEditorFunction"]);

            if (!isEditor)
            {
                Response.Redirect("editor_unauthorized.aspx");
            }
        }
    }
}