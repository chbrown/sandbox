tell application "iTunes"
	set old_indexing to fixed indexing
	set fixed indexing to true
	
	set current_playlist to (a reference to (get view of front window))
	if selection is not {} then -- test if there is a selection...
		set using_selection to true
		set idx to (count selection's items)
	else -- it's the whole playlist
		set selectedTracks to (get a reference to current_playlist)
		set using_selection to false
		set idx to (count current_playlist's tracks)
	end if
	
	repeat with j from 1 to idx
		if using_selection then
			set this_track to item j of selection
		else
			set this_track to track j of selectedTracks
		end if
		
		-- thisTrack now set, do some stuff to it
		try
			set track_comment to (get comment of this_track)
			set comment_splits to my splitText(";", track_comment)
			repeat with comment_split in comment_splits
				set {prop_name, prop_value} to my splitText(":", comment_split)
				if prop_name is "plays" then
					set played count of this_track to prop_value
				end if
				if prop_name is "rating" then
					set rating of this_track to prop_value
				end if
				if prop_name is "playlist" then
					set new_playlist_name to prop_value
					if exists (some user playlist whose name is new_playlist_name) then
						--set my_opts to (display dialog "This Playlist exists: " & new_playlist_name buttons {"Don't Replace", "Replace"} default button 2 with icon 0)
						
						set new_playlist to user playlist new_playlist_name
					else
						set new_playlist to (make user playlist with properties {name:new_playlist_name})
					end if
					
					--set rating of this_track to prop_value
					duplicate this_track to new_playlist
				end if
			end repeat
		on error m
			log m -- do you care?
		end try
	end repeat
	
	set fixed indexing to old_indexing
	
	log "Did " & idx
end tell


on splitText(delimiter, someText)
	set prevTIDs to AppleScript's text item delimiters
	set AppleScript's text item delimiters to delimiter
	set output to text items of someText
	set AppleScript's text item delimiters to prevTIDs
	return output
end splitText