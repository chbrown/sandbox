tell application "Google Chrome"
  tell the active tab of its first window
    reload
    get URL
  end tell
end tell
