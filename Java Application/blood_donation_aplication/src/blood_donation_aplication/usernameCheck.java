
package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;


public class usernameCheck {
    public boolean isCheckUsername(String username)
    {
        boolean flag=true;
        
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "select * from blood_donation where username='"+username+"'";
            ResultSet result = st.executeQuery(query);
            if(result.next())
            {
                flag=false;
            }
            else
            {
                flag=true;
            }
        }
        catch(Exception ex)
        {
            System.out.println("The exceptin is" + ex);
        }
        
        return flag;
    }
}
