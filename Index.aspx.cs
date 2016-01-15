using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace cips_beta
{
    public partial class Index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public void LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            //HttpContext.Current.Request.Cookies.AllKeys.ToList().ForEach(s => HttpContext.Current.Request.Cookies[s].Expires = DateTime.Now.AddDays(-1));

            FormsAuthentication.RedirectToLoginPage();
        }
    }
}