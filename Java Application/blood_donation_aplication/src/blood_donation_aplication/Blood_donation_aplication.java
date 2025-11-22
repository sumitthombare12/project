
package blood_donation_aplication;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.Toolkit;


public class Blood_donation_aplication {

   
    public static void main(String[] args) {
        // TODO code application logic here
        Intro_Frame IF = new Intro_Frame();
        IF.setVisible(true);
                Dimension d = Toolkit.getDefaultToolkit().getScreenSize();
                IF.setSize(d);
        
        try
        {
            int counter = 1;
           Font st1 = IF.jLabel4.getFont();
           Font st2 = IF.jLabel5.getFont();
            
            for(int i=0;i<=100;i++)
            {
                Thread.sleep(100);
                
                switch(counter)
                {
                    case 1:
                        IF.jLabel4.setFont(st1);
                        IF.jLabel11.setFont(st2);
                        counter = 2;
                        break;
                        
                    case 2:
                        IF.jLabel5.setFont(st1);
                        IF.jLabel4.setFont(st2);
                        counter = 3;
                        break;
                        
                    case 3:
                        IF.jLabel6.setFont(st1);
                        IF.jLabel5.setFont(st2);
                        counter = 4;
                        break;
                        
                    case 4:
                        IF.jLabel7.setFont(st1);
                        IF.jLabel6.setFont(st2);
                        counter = 5;
                        break;
                        
                    case 5:
                        IF.jLabel8.setFont(st1);
                        IF.jLabel7.setFont(st2);
                        counter = 6;
                        break;
                        
                    case 6:
                        IF.jLabel9.setFont(st1);
                        IF.jLabel8.setFont(st2);
                        counter = 7;
                        break;
                        
                    case 7:
                        IF.jLabel10.setFont(st1);
                        IF.jLabel9.setFont(st2);
                        counter = 8;
                        break;
                        
                    case 8:
                        IF.jLabel11.setFont(st1);
                        IF.jLabel10.setFont(st2);
                        counter = 1;
                        break;
                        
                    default:
                        counter = 1;
                        break;
                      
                }
                
            }
          
        }
        catch(Exception ex)
        {
            System.out.println("Intro Exception is: "+ex);
        }
         blood_donation_Frame Frame = new blood_donation_Frame();
        Frame.setVisible(true);
        Dimension d1= Toolkit.getDefaultToolkit().getScreenSize();
        Frame.setSize(d1);
        IF.dispose();
        
         
    }
    
}
