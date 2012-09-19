:: run chrome with local file access (for testing)
set PWD=%~dp0
echo %PWD%
C:\Users\%USERNAME%\AppData\Local\Google\Chrome\Application\chrome.exe --allow-file-access-from-files %PWD%