/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 *
 * @author s
 */
public class DateAndTime {
    public String getDate()
    {
        Calendar cal = Calendar.getInstance();
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String p = dateFormat.format(cal.getTime());
        
        return p;
    }
    
    public String getTime()
    {
        Calendar calendar = new GregorianCalendar();
        String am_pm;
        int hour = calendar.get(Calendar.HOUR);
        int minute = calendar.get(Calendar.MINUTE);
        int second = calendar.get(Calendar.SECOND);
        if(calendar.get(Calendar.AM_PM) == 0)
        {
            am_pm="AM";
        }
        else
        {
            am_pm="PM";
        }
        String gg = hour + ":" + minute + ":" + second + " " + am_pm;
        
        return gg;
    }
}
