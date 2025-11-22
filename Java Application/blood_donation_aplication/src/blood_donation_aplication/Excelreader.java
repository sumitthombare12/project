/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blood_donation_aplication;

import java.io.File;
import java.util.ArrayList;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

/**
 *
 * @author s
 */
public class Excelreader {
    public ArrayList getExcelData(String sf)
    {
        ArrayList m =new ArrayList();
        
        try
        {
            Workbook ReadExcel = Workbook.getWorkbook(new File(sf));
            Sheet sheet = ReadExcel.getSheet(0);
            int a = sheet.getColumns();
            int b = sheet.getRows();
            
            for(int i=1; i<b; i++)
            {
                ArrayList in = new ArrayList();
                for(int j=0; j<a; j++)
                {
                    
                    Cell al = sheet.getCell(j, i);
                    
                    String ed = al.getContents();
                    ed=ed.trim();
                    
                    in.add(ed);
                    
                }
                m.add(in);
            }
            ReadExcel.close();
        }
        catch(Exception ex)
        {
            System.out.println("Exception is: "+ex);
        }
        return m;
    }
}
