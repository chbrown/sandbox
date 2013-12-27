tell application "Finder" to set defloc to (path to home folder) as alias
set this_alias to (choose folder with prompt "Navigate to a folder..." default location defloc)

set the clipboard to (text returned of (display dialog "" default answer (this_alias as string) buttons {"Cancel", "Copy to Clipboard"} default button 2))
