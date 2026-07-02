@echo off
chcp 65001 >nul
cd /d "C:\Users\hadas\dev\prompts-book"
echo מפעילה את ספר הפרומפטים...
echo אל תסגרו את החלון הזה כל עוד אתם משתמשים באפליקציה.
echo כדי לסגור את האפליקציה - פשוט סגרו את החלון הזה.
echo.
start "" cmd /c "timeout /t 3 >nul && start http://localhost:5173"
call npm run dev
