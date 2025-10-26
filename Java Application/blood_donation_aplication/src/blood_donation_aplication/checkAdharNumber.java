/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 *
 * @author s
 */
public class checkAdharNumber {
    public boolean isCheckAdhar(String adharNumber)
    {
        boolean flag=false;
        
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "select * from donor_info where adhar_no='"+adharNumber+"'";
            ResultSet result = st.executeQuery(query);
            if(result.next())
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
