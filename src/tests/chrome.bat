:: run chrome with local file access (for testing)
set PWD=%~dp0
echo %PWD%
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files %PWD%
