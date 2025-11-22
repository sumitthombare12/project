

package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;



public class updateProfile {
    public boolean isUpdateCheck(String name, String Email, String PhoneNo, String Address, String Username, String username, String password)
    {
        boolean flag = true;
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "update blood_donation set Name='"+name+"', Email_ID='"+Email+"', Phone_No='"+PhoneNo+"', Address='"+Address+"', Username='"+Username+"', Pass='"+password+"' where Username='"+username+"'";
            //System.out.println(query);
            st.executeUpdate(query);
            /*if(rs>0)
            {
                flag=true;
            }*/
            conn.close();
            st.close();
        }
        catch(Exception ex)
        {
            System.out.println("Exception while Inserting"+ex);
        }
        
        return flag;
    }
}
