
package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import javax.swing.JOptionPane;


public class checkUserdata {
    public boolean isCheckUsername(String username,String password) throws SQLException, ClassNotFoundException, InstantiationException
    {
        boolean flag = false;
        ArrayList pass = new ArrayList();
      try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "select * from blood_donation where username='"+username+"'";
            //System.out.println(query);
            ResultSet rows = st.executeQuery(query);
            if(rows.next())
            {
                if(password.equals(rows.getString(6)))
                {
                    flag=true;
                }
                else
                {
                    JOptionPane.showMessageDialog(null, "Password is not valid");
                }
            }
            else
            {
                JOptionPane.showMessageDialog(null, "Username is not exist");
            }
            conn.close();
            st.close();
        }
        catch(Exception ex)
        {
            System.out.println("Exception while Inserting"+ex);
        }
        System.out.println(flag);
        return flag;
        
    }

}
