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
public class Add_donor_Details {
    public boolean isInserted(String adhar_no, String donor_name, String mobile, String email, String address, String dob, String age, String gender, String height, String weight, String blood_group, String bmi, String token_no, String token_status, String date_time, String blood_vol)
    {
        boolean flag=false;
        
        try
        {
            
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            System.out.println(conn);
            Statement st = conn.createStatement();
            
            String query = "insert into donor_info values('"+adhar_no+"', '"+donor_name+"', '"+mobile+"', '"+email+"', '"+address+"', '"+dob+"', '"+age+"', '"+gender+"', '"+height+"', '"+weight+"', '"+blood_group+"', '"+bmi+"', '"+token_no+"', '"+token_status+"', '"+date_time+"', '"+blood_vol+"')";
            int x = st.executeUpdate(query);
            if(x>0)
            {
                flag=true;
            }
            else
            {
                flag = false;
            }
            
        }
        catch(Exception ex)
        {
            System.out.println("Exception is: "+ex);
        }
        
        return flag;
    }
}
