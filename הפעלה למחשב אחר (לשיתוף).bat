@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo %cd% | findstr /i /c:"Google Drive" /c:"My Drive" /c:"OneDrive" /c:"Dropbox" >nul
if not errorlevel 1 (
    echo הקובץ הזה נמצא כרגע בתוך תיקייה מסונכרנת ^(Google Drive / OneDrive / Dropbox^).
    echo התקנה ישירות מתוך תיקייה כזו עלולה לשבש קבצים.
    echo פתרון: העתיקו את כל התיקייה הזו למקום רגיל במחשב ^(למשל שולחן העבודה^), ורק אז הריצו את הקובץ משם.
    pause
    exit /b
)

where node >nul 2>nul
if errorlevel 1 (
    echo לא נמצא Node.js על המחשב הזה.
    echo יש להתקין קודם מהאתר https://nodejs.org ולנסות שוב.
    pause
    exit /b
)

if not exist "node_modules" (
    echo התקנה ראשונה - זה ייקח דקה, סבלנות...
    call npm install
)

echo מפעילה את ספר הפרומפטים...
echo אל תסגרו את החלון הזה כל עוד אתם משתמשים באפליקציה.
echo.
start "" cmd /c "timeout /t 3 >nul && start http://localhost:5173"
call npm run dev
