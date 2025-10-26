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
import java.util.ArrayList;

/**
 *
 * @author s
 */
public class Donor_Details_Fetcher_For_Edit {
    public ArrayList getDonorData(String adharno)
    {
        ArrayList data = new ArrayList();
         try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            Statement st = conn.createStatement();
            String query = "select * from donor_info where addhar_no='"+adharno+"'";
            ResultSet rs = st.executeQuery(query);
            if(rs.next())
            {
                String name = rs.getString(2);
                String mobile = rs.getString(3);
                String email = rs.getString(4);
                String address = rs.getString(5);
                String dob = rs.getString(6);
                String age = rs.getString(7);
                String gender = rs.getString(8);
                String height = rs.getString(9);
                String weight = rs.getString(10);
                String blood_grp = rs.getString(11);
                String bmi = rs.getString(12);
                String token_no = rs.getString(13);
                String token_status = rs.getString(14);
                String date_time = rs.getString(15);
                String blood_volume = rs.getString(16);
                
                data.add(name);
                data.add(mobile);
                data.add(email);
                data.add(address);
                data.add(dob);
                data.add(age);
                data.add(gender);
                data.add(height);
                data.add(weight);
                data.add(blood_grp);
                data.add(bmi);
                data.add(token_no);
                data.add(token_status);
                data.add(date_time);
                data.add(blood_volume);
            }
            System.out.println("Data is : " + data);
        }
        catch(Exception ex)
        {
            System.out.println("Exception is "+ex);
        }
         return data;
    }
}
