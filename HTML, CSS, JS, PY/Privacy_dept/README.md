# Privacy Dept Visualizer Setup

## requirement software
<ul>
<li>Python 3.9.18 or Anaconda3-2023.09-0-Windows-x86_64</li>
<li>MySQL server 5.0</li>
<li>MySQL Tool for 5.0</li>
</ul>

## Step to setup and installation
<ol>
<li>Install Anaconda3-2023.09-0-Windows-x86_64 url: https://youtu.be/mg6cMkz9Q0c?si=TJIM5Qvn4diQf8lH</li>
<li>Download MySQL5.5 using https://drive.google.com/drive/folders/18njSixo9mCDh_RpC16QG-yDoG7y4y_l6?usp=sharing link and download after download click on Setup.exe
<ul>
<li>Set password "root"</li>
</ul>
</li>
<li>In MY_SQL5.5 click on mysql-gui-tools-5.0-r1a-win32.msi</li>
</ol>

## Setup environment
### In windows search python powershell/ command line and open it then run below command one by one
<ol>
    <li>pip install Flask</li>
    <li>pip install PyMySQL</li>
    <li>pip install pandas</li>
</ol>

### In windows search mySQL Administrator and open it
<ol>
    <li>Click on three dots(...)</li>
    <li>New instance<li>Connection: New Connection, Username: root, password: ,Hostname: localhost, port:3306, Type: MySQL</li></li>
    <li>Apply and re-open</li>
    <li>Type password: root</li>
    <li>After opened it click on Restore</li>
    <li>Then in restore open backup</li>
    <li>select database sql file(Privacy_dept 20251122 2104.sql)</li>
</ol>

### Setup Gmail account and password Key
<ol>
    <li>Create Password Key: Google accound security setting -> password key -> create key -> copy key</li>
    <li>Type gmail account</li>
    <li>Paste key on util.py file in line 95</li>
</ol>

## Run Program
<ol>
    <li>Open PRIVACY_DEPT folder in any IDE like vs code or pycharm that supports flask</li>
    <li>Then in same folder open server.py and run it</li>
</ol>