using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System.Configuration;
using System.Security.Cryptography;

namespace cips_beta
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (UserEmail.Text != "" && )
        }

        public void Logon_Click(object sender, EventArgs e)
        {

            //cipsuser / Password1            
            //cipseditor / cipseditor1
            //cipsmodeler / cipsmodeler1


            bool useDBLogin;
            useDBLogin = Convert.ToBoolean(ConfigurationManager.AppSettings["dbLogin"]);

            if (useDBLogin)
            {
                try
                {
                    string theEncodedPass = "", theEncPassSalt = "", passwordSaltString = "";
                    int theRowNumP = 0;


                    OracleConnection oraConn = new OracleConnection(ConfigurationManager.ConnectionStrings["OraAspNetConString"].ConnectionString);
                    OracleCommand oraCmd = oraConn.CreateCommand();
                    OracleCommand oraCmdP = oraConn.CreateCommand();
                    OracleCommand oraCmd2 = oraConn.CreateCommand();
                    OracleDataReader oRdrP, oRdr;

                    oraCmd.CommandText = "SP_ENCRYPT_PASSWORD";
                    oraCmd.CommandType = System.Data.CommandType.StoredProcedure;
                    oraCmd.Connection = oraConn;

                    oraCmd.Parameters.Add("PASSWORD", OracleDbType.Varchar2);
                    oraCmd.Parameters[0].Direction = System.Data.ParameterDirection.InputOutput;
                    oraCmd.Parameters[0].Value = UserPass.Text;
                    oraCmd.Parameters[0].Size = 2048;

                    oraConn.Open();
                    oraCmd.ExecuteNonQuery();
                    theEncodedPass = oraCmd.Parameters[0].Value.ToString();
                    oraCmd.Dispose();

                    oraCmdP.Connection = oraConn;
                    oraCmdP.CommandText = "SELECT PASSWORD_SALT FROM CIWQS.V_GIS_LOGIN_INFO WHERE USERNAME = '" + UserEmail.Text + "'";
                    oRdrP = oraCmdP.ExecuteReader();

                    if (oRdrP.HasRows)
                    {
                        while (oRdrP.Read())
                        {
                            if (theRowNumP == 0)
                            {
                                if (!oRdrP.IsDBNull(oRdrP.GetOrdinal("PASSWORD_SALT")))
                                {
                                    passwordSaltString = oRdrP.GetString(oRdrP.GetOrdinal("PASSWORD_SALT"));

                                }
                            }
                        }
                    }
                    oraCmdP.Dispose();

                    if (passwordSaltString != "")
                    {
                        int i; //, len = passwordSaltString.Length;
                        byte[] saltBytes = HexStringToByteArray(passwordSaltString); //new byte[(len / 2)]; 

                        UTF8Encoding encoding = new UTF8Encoding();
                        SHA256 mySHA256 = SHA256Managed.Create();

                        byte[] passwordBytes, saltedInput, hashOutput;
                        sbyte[] signedSaltBytes;

                        //for (i = 0; i < len; i += 2) // i = 0, 2, 4, 6, ... 62, saltBytes index = 0, 31
                        //{
                        //    saltBytes[i / 2] = Convert.ToByte(passwordSaltString.Substring(i, 2), 16);
                        //}

                        // Define password and salt for testing, and convert to byte arrays:
                        passwordBytes = encoding.GetBytes(UserPass.Text);

                        // Perform a BlockCopy to build an unsigned byte array for the salt, used
                        // to determine the number of iterations:
                        signedSaltBytes = new sbyte[saltBytes.Length];
                        System.Buffer.BlockCopy(saltBytes, 0, signedSaltBytes, 0, saltBytes.Length);

                        // Determine the number of iterations (not less than 1000), 
                        // determined by a sum of all the byte values in the salt 
                        // (not to exceed 1000 + (length of Salt * 127)).  Average
                        // number of iterations will be ~3000:
                        long numberOfIterations = 1000;
                        for (i = 0; i < signedSaltBytes.Length; i += 1)
                        {
                            numberOfIterations += Math.Abs(Convert.ToInt32(signedSaltBytes[i]));
                        }

                        // Salt the input password bytes with the salt bytes:
                        saltedInput = new byte[saltBytes.Length + passwordBytes.Length];
                        saltBytes.CopyTo(saltedInput, 0);
                        passwordBytes.CopyTo(saltedInput, saltBytes.Length);

                        // Perform Initial Hash:
                        hashOutput = mySHA256.ComputeHash(saltedInput);

                        // Loop through, for the number of iterations:
                        for (i = 0; i < numberOfIterations; i += 1)
                        {
                            hashOutput = mySHA256.ComputeHash(hashOutput);
                        }

                        // Return lowercase hex string of hashed result:
                        theEncPassSalt = BitConverter.ToString(hashOutput).Replace("-", "").ToLower();
                    }


                    oraCmd2.Connection = oraConn;
                    oraCmd2.CommandText = "SELECT * FROM CIWQS.V_GIS_LOGIN_INFO "
                        + "WHERE (USERNAME = '" + UserEmail.Text + "') AND (PASSWORD = '" + theEncodedPass
                        + "' OR PASSWORD = '" + theEncPassSalt + "')";

                    oRdr = oraCmd2.ExecuteReader();

                    if (oRdr.HasRows)
                    {
                        // UserData format (delimited by |)
                        //  0 : userid
                        //  1 : username
                        //  2 : password (unencrypted)
                        //  3 : display_name
                        //  4 : roles (delimited by ::)

                        string userid = "", username = "", password = "", display_name = "", roles = "";
                        bool isActive = false;
                        int theRowNum = 0;

                        password = UserPass.Text;

                        while (oRdr.Read())
                        {
                            if (theRowNum == 0)
                            {
                                System.Type theType = oRdr[0].GetType();
                                userid = oRdr.GetDecimal(oRdr.GetOrdinal("userid")).ToString();
                                username = oRdr.GetString(oRdr.GetOrdinal("username"));
                                display_name = oRdr.GetString(oRdr.GetOrdinal("display_name"));
                            }

                            string theBusinessFunc = oRdr.GetString(oRdr.GetOrdinal("business_func"));
                            if (theBusinessFunc == ConfigurationManager.AppSettings["LOGINBusinessFunction"])
                            {
                                string theUserRoleGroup = oRdr.GetString(oRdr.GetOrdinal("user_role_group"));
                                if (theUserRoleGroup == ConfigurationManager.AppSettings["ACTIVEUSERRoleGroup"])
                                {
                                    isActive = true;
                                    roles = roles + oRdr.GetString(oRdr.GetOrdinal("user_role_group")) + "::";
                                }
                            }
                            else if (theBusinessFunc == ConfigurationManager.AppSettings["CipsViewerFunction"])
                            {
                                roles = roles + theBusinessFunc + "::";
                            }
                            else if (theBusinessFunc == ConfigurationManager.AppSettings["CipsEditorFunction"])
                            {
                                roles = roles + theBusinessFunc + "::";
                            }
                            else if (theBusinessFunc == ConfigurationManager.AppSettings["CipsModelerFunction"])
                            {
                                roles = roles + theBusinessFunc + "::";
                            }

                            theRowNum = theRowNum + 1;
                        }

                        if (roles != "")
                        {
                            if (isActive)
                            {
                                string sUserData;

                                sUserData = userid
                                    + "|" + username
                                    + "|" + password
                                    + "|" + display_name
                                    + "|" + roles;

                                FormsAuthenticationTicket fTicket = new FormsAuthenticationTicket(
                                    1,
                                    UserEmail.Text,
                                    DateTime.Now,
                                    DateTime.Now.AddMinutes(30),
                                    false,
                                    sUserData,
                                    FormsAuthentication.FormsCookiePath);

                                // Hash the cookie for transport over the wire
                                // First parameter = name of auth cookie (it's the name specified in web.config)
                                string sHash = FormsAuthentication.Encrypt(fTicket);
                                HttpCookie oCookie = new HttpCookie(FormsAuthentication.FormsCookieName, sHash)
                                {
                                    Domain = FormsAuthentication.CookieDomain,
                                    Path = FormsAuthentication.FormsCookiePath,
                                    HttpOnly = true,
                                    Secure = FormsAuthentication.RequireSSL
                                };

                                System.Web.HttpContext.Current.Response.Cookies.Add(oCookie);

                                // Set the cookie's expiration time to the tickets expiration time
                                if (fTicket.IsPersistent)
                                {
                                    oCookie.Expires = fTicket.Expiration;
                                }

                                // Redirect to requested URL, or homepage if no previous page requested
                                string returnUrl = Request.QueryString["ReturnUrl"];
                                if (returnUrl == "")
                                {
                                    returnUrl = ConfigurationManager.AppSettings["DEFAULTPAGE"];
                                }

                                // Don't call the FormsAuthentication.RedirectFromLoginPage here, since it could
                                // replace the custom authentication ticket we just added...
                                //e.Authenticated = true;
                                Response.Redirect(returnUrl);
                                //FormsAuthentication.RedirectFromLoginPage(UserEmail.Text, Persist.Checked);
                            }
                            else
                            {
                                // User found but Login account is not active
                                //e.Authenticated = False
                                Msg.Text = "User record was found, but login account is not active.";
                            } 
                        }
                        else
                        {
                            // User found but account has no roles defined
                            // (due to roles = "")
                            Msg.Text = "User record was found, but no roles were defined.";
                        } 
                    }
                    else
                    {
                        // User/Pass combination not found in our database...
                        // (due to HasRows = false)
                        Msg.Text = "User/Password combination was not found in our database. Please try again.";
                    }

                    oRdr.Close();
                    oraConn.Close();
                    oraCmd2.Dispose();
                }
                catch (Exception ex)
                {
                    //Login1.FailureText = "Error communicating with the database for authentication. Please contact the administrator."
                    //Login1.FailureText = ex.Message;
                    Msg.Text = ex.Message;
                    //e.Authenticated = false;
                }
                finally
                {

                }
            }
            else
            {
                if (UserPass.Text == "Password1")
                {
                    FormsAuthentication.RedirectFromLoginPage(UserEmail.Text, Persist.Checked);
                }
            }

            
        }

        public static byte[] HexStringToByteArray(String hexString)
        {
            if (hexString != null)
            {
                int len = hexString.Length;
                byte[] data = new byte[len / 2];
                for (int i = 0; i < len; i += 2)
                {
                    data[i / 2] = (byte)(Convert.ToByte(hexString.Substring(i, 2), 16));
                }
                return data;
            }
            else
            {
                return null;
            }
        }

        public static bool IPAddressInRange(string ipAddress) 
        {
            bool response = false;

            string[] ipArray = ipAddress.Split('.');

            if (Convert.ToInt32(ipArray[0]) == 10)
            {
                if (Convert.ToInt32(ipArray[1]) >= 0 && Convert.ToInt32(ipArray[1]) < 256)
                {
                    if (Convert.ToInt32(ipArray[2]) >= 0 && Convert.ToInt32(ipArray[2]) < 256)
                    {
                        if (Convert.ToInt32(ipArray[3]) > 0 && Convert.ToInt32(ipArray[3]) < 255)
                        {
                            response = true;
                        }
                    }
                }
            }

            if (Convert.ToInt32(ipArray[0]) == 172)
            {
                if (Convert.ToInt32(ipArray[1]) == 22)
                {
                    if (Convert.ToInt32(ipArray[2]) >= 0 && Convert.ToInt32(ipArray[2]) < 256)
                    {
                        if (Convert.ToInt32(ipArray[3]) > 0 && Convert.ToInt32(ipArray[3]) < 255)
                        {
                            response = true;
                        }
                    }
                }
            }

            return response;
        }
    }

    
}