/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 *
 * @author s
 */
public class Edit_Donor_Detail {
    public boolean isDonorDetailsUpdated(String adhar, String token_status)
    {
        boolean flag= false;
        
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "update donor_info set token_status='"+token_status+"' where adhar_no='"+adhar+"'";
            int x = st.executeUpdate(query);
            if(x>0)
                flag = true;
            else
                flag = false;
        }
        catch(Exception ex)
        {
            System.out.println("Exception is: "+ex);
        }
        
        return flag;
    }
}
