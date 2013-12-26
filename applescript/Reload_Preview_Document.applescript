(*
Modified Reload Preview Document 1.0
J.T. Halbert <jthalbert@gmail.com>
Originally created by Trevor Harmon <trevor@vocaro.com>

Based in part on the "Checking Accessibility Status" script by Apple.
http://www.apple.com/applescript/uiscripting/01.html
*)

on UIscript_check()
	-- get the system version
	set the hexData to system attribute "sysv"
	set hexString to {}
	repeat 4 times
		set hexString to ((hexData mod 16) as string) & hexString
		set hexData to hexData div 16
	end repeat
	set the OS_version to the hexString as string
	if the OS_version is less than "1030" then
		display dialog "This script requires Mac OS X 10.3 or higher." buttons {"Cancel"} default button 1 with icon 2
	end if
	-- check to see if assistive devices is enabled
	tell application "System Events"
		set UI_enabled to UI elements enabled
	end tell
	if UI_enabled is false then
		tell application "System Preferences"
			activate
			set current pane to pane "com.apple.preference.universalaccess"
			display dialog "This script utilizes the built-in Graphic User Interface Scripting architecture of Mac OS X which is currently disabled." & return & return & "You can activate GUI Scripting by selecting the checkbox \"Enable access for assistive devices\" in the Universal Access preference pane." with icon 1 buttons {"Cancel"} default button 1
		end tell
	end if
end UIscript_check

on reload_document(doc)

	-- Make sure the document in question is the frontmost window
	do shell script "open " & doc

	-- Now Revert it
	tell application "System Events"
		tell process "Preview"
			tell menu bar 1
				tell menu bar item "File"
					tell menu 1
						click menu item "Revert"
					end tell
				end tell
			end tell
		end tell
	end tell

end reload_document

on run argv
	my UIscript_check()
	my reload_document(item 1 of argv)
end run
