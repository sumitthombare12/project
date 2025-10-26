/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.text.DecimalFormat;
import java.util.ArrayList;

/**
 *
 * @author s
 */
public class Calculate_Linear_Regression {
    public double getLinearRegressionFactor(ArrayList a, ArrayList c, double s)
    {
        double b=0.0;
        double x=0.0;
        double y=0.0;
        double sumX=0.0,sumXY=0.0,sumX2=0.0,m=0.0;
        double sumY=0.0;
        int n=a.size();
        for(int i=0;i<a.size();i++)
        {
            x=(double)a.get(i);
            y=(int)c.get(i);
            double x2=x*x;
            double xy=(double)x*y;
            sumX=sumX+x;
            sumY=sumY+y;
            sumX2=sumX2+x2;
            sumXY=sumXY+xy;
        }
        
        double sumX_sq=sumX*sumX;
        double m1=(double)(n*sumXY)-(sumX*sumY);
        double m2=(double) (n*(sumX2)-(sumX_sq));
        
        m=m1/m2;
        m=Double.parseDouble(new DecimalFormat("##.##").format(m));
        
        b=(sumY-(m*sumX))/n;
        b=Double.parseDouble(new DecimalFormat("##.##").format(b));
        
        y=(double)m*s+b;
        y=Double.parseDouble(new DecimalFormat("##.##").format(y));
        
        return y;
    }
}
