import pymysql
from datetime import datetime
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pandas as pd

def insertPoints(username, new_points):
    now = datetime.now()

    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="privacy_dept",
        charset="utf8"
    )

    cursor = conn.cursor()
    id = getId( cursor)
    new_otp = getOTP()

    sql = "INSERT INTO pointsdb (username, points, datetime) VALUES (%s, %s, %s)"
    values = (username, new_points, now)

    cursor.execute(sql, values)

    conn.commit()

    print("Inserted rows:", cursor.rowcount)

    cursor.close()
    conn.close()

def check_user(username, password):

    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="privacy_dept",
        charset="utf8"
    )
    
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM user_details where username='"+str(username)+"'")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return ( len(rows) > 0 and rows[0][0] == password)

#send OTP
def getId( cursor):

    newOTP1 = random.randint(0, 1000000000)
    cursor.execute("SELECT * FROM one_time_password where id="+str(newOTP1))
    rows = cursor.fetchall()

    if not rows:
        return newOTP1
    else:
        return getId(cursor)

def getOTP():
    return random.randint(1000, 9999)

def sendOTP(emailid, name):
    
    now = datetime.now()

    # Connect to MySQL
    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="privacy_dept",
        charset="utf8"   
    )

    cursor = conn.cursor()
    id = getId( cursor)
    new_otp = getOTP()

    sql = "INSERT INTO one_time_password (id, otp, datetime) VALUES (%s, %s, %s)"
    values = (id, new_otp, now)

    cursor.execute(sql, values)

    try:
        sender_email = "GMAIL"
        receiver_email = str(emailid)
        password = "GMAIL PASSWORD KEY"

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = "INSIGHTQ OTP"

        body = "Dear " + str(name) + "\n This otp:" + str(new_otp) + " for id:" + str(id) + " in INSIGHT Q privacy dept visualizer"

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        print("Email sent successfully!")
        server.quit()
    except Exception as e:
        print("Exception: ", e)

    conn.commit()

    print("Inserted rows:", cursor.rowcount)

    cursor.close()
    conn.close()

    return id

def insertUserData(otp_id, my_otp, name, emailid, username, password):

    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="privacy_dept",
        charset="utf8" 
    )
    print(otp_id)
    cursor = conn.cursor()
    cursor.execute("SELECT otp FROM one_time_password where id="+str(otp_id))
    rows = cursor.fetchall()

    flag = True
    if rows[0][0] == my_otp:
        flag = False
        
    if flag:
        return False
    
    print(username, name, emailid, password)
    
    cursor = conn.cursor()

    sql = "INSERT INTO user_details (username, full_name, email, password) VALUES (%s, %s, %s, %s)"
    values = (username, name, emailid, password)

    cursor.execute(sql, values)
    
    conn.commit()

    exCount = cursor.rowcount
    print("Inserted rows:", exCount)

    cursor.close()
    conn.close()

    return (exCount > 0)

def classify_points(service_type, is_name, is_phone, is_addr, is_gov_id, is_fincial_details, two_step_verification, secure_password, account_uses, permission_type, Privacy_policy, manage_password, bank_alert_sms, free_prize, public_wifi, self_googled, manage_old_account):
    
    service_types = {
        "Financial (Bank, Investing)": "Financial_Payment",
        "Government (Aadhaar, Passport)": "Government_Identity",
        "Core Identity (Email, Google/Apple Account)": "Core_Online_Accounts",
        "Social Media": "Social_Media_Professional",
        "Shopping": "Ecommerce_Shopping",
        "Health": "Healthcare_Wellness",
        "Entertainment (Streaming)": "Entertainment_Gaming",
        "Classifieds & Marketplaces (C2C)": "Other_Specialized",
        "Matrimonial & Dating Services": "Social_Media_Professional",
        "Job Search & Professional Networking": "Education_Job_Search",
        "Productivity & Work Tools": "Education_Job_Search",
        "Fitness Trackers": "Healthcare_Wellness",
        "Smart Home & IoT Devices": "Utilities_Home_Services",
        "Local Services & Home Delivery (Beyond Food)": "Utilities_Home_Services",
        "News & Content Aggregators": "Entertainment_Gaming",
        "Gaming Platforms & Communities": "Entertainment_Gaming",
        "Fantasy Sports & Real Money Gaming": "Entertainment_Gaming",
        "Real Estate & Property Search": "Other_Specialized",
        "Astrology & Religious Services": "Other_Specialized",
        "Parenting & Child-focused Apps": "Other_Specialized",
        "Automotive & Vehicle Services": "Other_Specialized",
        "Event & Movie Ticketing": "Travel_Transport_Events",
        "Map": "Travel_Transport_Events"
    }

    service_type = service_types[service_type] if service_type in service_types.keys() else "Other_Specialized"

    points = 0

    df = pd.read_csv("py/Points.csv")
    name_point = int(df[service_type][df.Sub_Question_Service_Type=="Full Legal Name"]) if is_name == "true" else 0
    points += name_point
    phone_point = int(df[service_type][df.Sub_Question_Service_Type=="Legal Phone Number"]) if is_phone == "true" else 0
    points += phone_point
    addr_point = int(df[service_type][df.Sub_Question_Service_Type=="Home Address"]) if is_addr == "true" else 0
    points += addr_point
    gov_id_point = int(df[service_type][df.Sub_Question_Service_Type=="Government ID(Aadhaar,PAN,etc.)"]) if is_gov_id == "true" else 0
    points += gov_id_point
    fincial_details_point = int(df[service_type][df.Sub_Question_Service_Type=="Financial Details (Credit Card, Bank Info)"]) if is_fincial_details == "true" else 0
    points += fincial_details_point
    two_step_verification_point = int(df[service_type][df.Sub_Question_Service_Type==two_step_verification]) if two_step_verification!="" else 0
    points += two_step_verification_point
    secure_password_point = int(df[service_type][df.Sub_Question_Service_Type==secure_password]) if secure_password!="" else 0
    points += secure_password_point
    account_uses_point = int(df[service_type][df.Sub_Question_Service_Type==account_uses]) if account_uses!="" else 0
    points += account_uses_point
    permission_type_point = int(df[service_type][df.Sub_Question_Service_Type==permission_type]) if permission_type!="" else 0
    points += permission_type_point
    Privacy_policy_point = int(df[service_type][df.Sub_Question_Service_Type==Privacy_policy]) if Privacy_policy!="" else 0
    points += Privacy_policy_point
    manage_password_point = int(df[service_type][df.Sub_Question_Service_Type==manage_password]) if manage_password!="" else 0
    points += manage_password_point
    bank_alert_sms_point = int(df[service_type][df.Sub_Question_Service_Type==bank_alert_sms]) if bank_alert_sms!="" else 0
    points += bank_alert_sms_point
    free_prize_point = int(df[service_type][df.Sub_Question_Service_Type==free_prize]) if free_prize!="" else 0
    points += free_prize_point
    public_wifi_point = int(df[service_type][df.Sub_Question_Service_Type==public_wifi]) if public_wifi!="" else 0
    points += public_wifi_point
    self_googled_point = int(df[service_type][df.Sub_Question_Service_Type==self_googled]) if self_googled!="" else 0
    points += self_googled_point 
    manage_old_account_point = int(df[service_type][df.Sub_Question_Service_Type==manage_old_account]) if manage_old_account!="" else 0
    points += manage_old_account_point

    print(points)
    print(service_type)

    response = {
        'new_points' : points,
        'total_points' : df[service_type][df.Sub_Question_Service_Type=="Total Positive"],
        'labels': ['Full Legal Name', 'Legal Phone Number', 'Home Address', 'Government ID(Aadhaar,PAN,etc.)', 'Financial Details (Credit Card, Bank Info)', two_step_verification, secure_password, account_uses, permission_type, Privacy_policy, manage_password, bank_alert_sms, free_prize, public_wifi, self_googled, manage_old_account],
        'data': [name_point, phone_point, addr_point, gov_id_point, fincial_details_point, two_step_verification_point, secure_password_point, account_uses_point, permission_type_point, Privacy_policy_point, manage_password_point, bank_alert_sms_point, free_prize_point, public_wifi_point, self_googled_point, manage_old_account_point]
    }

    return response

def fetch_rank(username):
    
    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="privacy_dept",
        charset="utf8"   
    )
    
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(username) FROM user_details WHERE points > (SELECT points FROM user_details where username='"+str(username)+"')")
    row = cursor.fetchall()

    cursor = conn.cursor()
    cursor.execute("select username, full_name, points from user_details order by points desc limit 50;")
    rows = cursor.fetchall()

    cursor = conn.cursor()
    cursor.execute("SELECT points FROM user_details where username='"+str(username)+"'")
    user_points = cursor.fetchall()

    response = {
        'user_points': user_points[0][0],
        'user_rank': row[0][0]+1,
        'ranks': rows
    }

    print(response)
    cursor.close()
    conn.close()

    return response

fetch_rank(username="sumit_t_12")

print(classify_points("Financial (Bank, Investing)", "true", "true", "false", "true", "false", "Yes (2FA Enabled)", "High Security", "Day / Week", "Allow All the Time", "Read Carefully", "Password Manager", "Ignore & Check App", "Assume Scam", "Use VPN", "Yes, I've Checked", "Find & Delete"))
