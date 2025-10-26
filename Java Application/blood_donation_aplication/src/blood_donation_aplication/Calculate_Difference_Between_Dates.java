/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

/**
 *
 * @author s
 */
public class Calculate_Difference_Between_Dates {
    long getDateDiff(ArrayList DateList, String cd)
    {
        
        long small=10000;
        try
        {
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
            Date currentdate = sdf.parse(cd);
            
            for(int i=0; i < DateList.size(); i++)
            {
                String temp = (String) DateList.get(i);
                Date tempdate = sdf.parse(temp);
                long timeDiff = Math.abs(currentdate.getTime() - tempdate.getTime());
                long dayDiff = TimeUnit.DAYS.convert(timeDiff, TimeUnit.MILLISECONDS);
                if(dayDiff < small)
                    small = dayDiff;
                    System.out.println(temp+" -- "+dayDiff);
            }
        }
        catch(Exception ex)
        {
            System.out.println("Exception is: "+ex);
        }
        return small;
    }
}
