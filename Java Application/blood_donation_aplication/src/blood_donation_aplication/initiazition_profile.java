

package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;



public class initiazition_profile {
    public ArrayList isInitializeProfile(String username)
    {
        ArrayList al = new ArrayList();

        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "select * from blood_donation where username='"+username+"'";
            //System.out.println(query);
            ResultSet result = st.executeQuery(query);
            while(result.next())
            {
                al.add(result.getString(1));
                al.add(result.getString(2));
                al.add(result.getString(3));
                al.add(result.getString(4));
                al.add(result.getString(5));
                al.add(result.getString(6));
            }
            conn.close();
            st.close();
        }
        catch(Exception ex)
        {
            System.out.println("Exception while Inserting"+ex);
        }
   

        
        return al;
    }
}
