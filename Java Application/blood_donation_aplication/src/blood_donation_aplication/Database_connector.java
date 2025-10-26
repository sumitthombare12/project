
package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;


public class Database_connector {
    public boolean isDbInserted(String name, String Email, String PhoneNo, String Address, String Username, String password)
    {
        boolean flag = false;
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb","root","root");
            Statement st = conn.createStatement();
            String query = "Insert into blood_donation values ('"+ name +"','"+ Email +"','"+ PhoneNo +"','"+ Address +"','"+ Username +"','"+ password +"')";
            //System.out.println(query);
            int rows = st.executeUpdate(query);
            if(rows>0)
            {
                flag=true;
            }
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
