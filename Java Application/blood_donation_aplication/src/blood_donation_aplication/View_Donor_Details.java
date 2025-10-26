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
public class View_Donor_Details {
    public void getViewDonorDetails()
    {
        
        String token_status = "Token Given";
        try
        {
            Statement st1 = getConnection();
            Statement st2 = getConnection();
            
            String query = "select * from donor_info where token_status='"+token_status+"'";
            
            ResultSet rs1 = st1.executeQuery(query);
            ResultSet rs2 = st2.executeQuery(query);
            
            int row = 0;
            while(rs1.next())
            {
                row++;
            }
            int i=0;
            String data[][] = new String[row][3];
            while(rs2.next())
            {
                String addhar = rs2.getString(1);
                data[i][0] = addhar;
                String name = rs2.getString(2);
                data[i][1] = name;
                String tokenStatus = rs2.getString(14);
                data[i][2] = tokenStatus;
                i++;
            }
            View_Donor_Details_Frame.data1 = data;
            
        }
        catch(Exception ex)
        {
            System.out.println("Exception is: "+ex);
        }
    }
    public Statement getConnection()
    {
        Statement st=null;
        
        try
        {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/clgdb", "root", "root");
            st = conn.createStatement();
        }
        catch(Exception ex)
        {
            System.out.println("Exception is "+ex);
        }
        return st;
    }
}
