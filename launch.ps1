Set-Location "C:\Users\hadas\dev\prompts-book"
Write-Host "מפעילה את ספר הפרומפטים..." -ForegroundColor Cyan
Write-Host "אל תסגרו את החלון הזה כל עוד אתם משתמשים באפליקציה."
Write-Host "כדי לסגור את האפליקציה - פשוט סגרו את החלון הזה."
Write-Host ""

Start-Process powershell -WindowStyle Hidden -ArgumentList "-NoProfile -Command Start-Sleep -Seconds 3; Start-Process 'http://localhost:5173'"

npm run dev
