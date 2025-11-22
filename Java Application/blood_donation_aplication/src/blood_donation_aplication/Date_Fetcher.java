/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 *
 * @author s
 */
public class Date_Fetcher {
    public ArrayList getLastDate(String adharno)
    {
        ArrayList al = new ArrayList();
        try
        {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
        Statement st = conn.createStatement();
        
        String query = "select * from donor_info where adhar_no='"+adharno+"'";
        ResultSet rs = st.executeQuery(query);
        while(rs.next())
        {
            String date_time = rs.getString(15);
            String str[] = date_time.split(", ");
            String date = str[0];
            
            al.add(date);
        }
        System.out.println("Date is "+ al);
        }
        catch(Exception ex)
        {
            System.out.println("Exception is: "+ ex);
        }
        
        return al;
    }
}
