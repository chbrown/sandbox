tell application "iTunes"
	copy (a reference to (get view of front window)) to thisPlaylist
	
	if class of thisPlaylist is user playlist then
		copy (get database ID of every track of thisPlaylist) to myDBIDs
		copy (a reference to library playlist "Library") to mainLibrary
		
		display dialog "Checking tracks..." buttons {"¥"} default button 1 giving up after 2
		
		repeat with i from 1 to (get index of last track of mainLibrary)
			tell track i of mainLibrary
				if myDBIDs contains (get database ID of it) then
					set enabled of it to false
				end if
			end tell
		end repeat
		
		display dialog "Finished!" buttons {"Thanks"} default button 1
		
	else
		display dialog "Please select a user playlist and run this script again"
	end if -- user playlist class?
end tell