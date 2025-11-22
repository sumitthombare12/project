/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.util.ArrayList;

/**
 *
 * @author s
 */
public class ToCalculateLinearRegression {
    public ArrayList getBMI(ArrayList data)
    {
        ArrayList <Double> bmi_a = new <Double>ArrayList();
        
        for(int i=0; i<data.size(); i++)
        {
            ArrayList row =(ArrayList)data.get(i);
            
            String bmi1 = (String)row.get(0); 
            
            double bmi = Double.parseDouble(bmi1);
            
            bmi_a.add(bmi);
        }
        return bmi_a;
    }
    
    
    public ArrayList getBlood_Volume(ArrayList data)
    {
        ArrayList <Integer> blood_vol = new <Integer>ArrayList();
        
        for(int i=0; i<data.size(); i++)
        {
            ArrayList row =(ArrayList)data.get(i);
            
            String vol1 = (String)row.get(1); 
            
            int vol = Integer.parseInt(vol1);
            
            blood_vol.add(vol);
        }
        return blood_vol;
    }
}
