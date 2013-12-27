tell application "iTunes"
	set sel to selection
	if sel is not {} then
		--if exists (some user playlist whose name is "Dead Tracks") then
		--	set dead_tracks_playlist to user playlist "Dead Tracks"
		--else
		--	set dead_tracks_playlist to (make user playlist with properties {name:"Dead Tracks"})
		--end if
		set old_indexing to fixed indexing
		set fixed indexing to true
		repeat with this_track in sel
			try
				if this_track's location is missing value then
					--duplicate this_track to dead_tracks_playlist
					set this_track's enabled to false
				end if
			on error m
				log m -- do you care?
			end try
		end repeat
		set fixed indexing to old_indexing
	else
		display dialog return & "Select some tracks first..." buttons {"Cancel"} default button 1 with icon 0 giving up after 10
		return
	end if
end tell

on splitText(delimiter, someText)
	set prevTIDs to AppleScript's text item delimiters
	set AppleScript's text item delimiters to delimiter
	set output to text items of someText
	set AppleScript's text item delimiters to prevTIDs
	return output
end splitText