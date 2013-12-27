-- this must be the EXACT name of the playlist--keeping in quotes:
property target_playlist : "testdups"

-- this should be a string of the path to the folder you want to use--keeping in quotes:
--property path_to_folder : "Hyacinth:Music - Zero Plays from 20101118 B:"
--property export_base : "Zooey:Users:chbrown:Desktop:musictest:"
--property music_base : "Zooey:Users:chbrown:Music:iTunes:iTunes Music:Music:"
-- =========================================

set target_tracks to {}

--log (switchText of theText from "Joe" to "Mike")

set new_selection to {}

tell application "iTunes"
	set old_indexing to fixed indexing
	set fixed indexing to true
	-- collect all tracks from the selction, or the special playlist, into an array 
	-- (since we need to iterate over them two at a time, we can't iterate over them directly here)
	if selection is not {} then
		set cursor to a reference to selection
		repeat with current_track in cursor
			if class of current_track is file track then
				set end of target_tracks to current_track
			end if
		end repeat
	else
		repeat with current_track in (get every track of playlist target_playlist)
			if class of current_track is file track then
				set end of target_tracks to current_track
			end if
		end repeat
		
	end if
	
	log "About to iterate over " & (count target_tracks) & " tracks."
	
	--set theText to "Hi - my name is Joe!" as string
	--log (my replaceText(theText, "Joe", "Mike"))
	
	-- iterate over target_tracks, except for the last one
	set i to 1
	set max_i to (count target_tracks)
	repeat while i < max_i
		set track_1 to item i of target_tracks
		set track_2 to item (i + 1) of target_tracks
		
		set track_1_id to ((get artist of track_1) & " - " & (get name of track_1)) as string
		set track_1_id to (my replaceText(track_1_id, "\"", ""))
		set track_2_id to ((get artist of track_2) & " - " & (get name of track_2)) as string
		set track_2_id to (my replaceText(track_2_id, "\"", ""))
		
		-- compare operation
		set levenshtein_distance to (do shell script "/usr/local/bin/levenshtein \"" & track_1_id & "\" \"" & track_2_id & "\"")
		set duration_difference to (get duration of track_1) - (get duration of track_2)
		set duration_difference to duration_difference * duration_difference -- square to get an absolute value (easiest way!)
		
		-- tolerate at most two character changes and a difference of 10 seconds
		if levenshtein_distance as integer < 2 and duration_difference < 100 then
			set track_1_bit_rate to (get bit rate of track_1)
			set track_2_bit_rate to (get bit rate of track_2)
			if track_1_bit_rate > track_2_bit_rate then
				set keep to track_1
				set discard to track_2
			else
				--either track_2_bit_rate > track_1_bit_rate or they're equal
				set keep to track_2
				set discard to track_1
				if track_1_bit_rate = track_2_bit_rate then
					-- if there's no bit rate difference, go with the one that's been played more.
					if (get played count of track_1) > (get played count of track_2) then
						set keep to track_1
						set discard to track_2
					end if
				end if
			end if
			
			--enabled
			set enabled of keep to true
			set enabled of discard to false
			--play count
			set played count of keep to (get played count of keep) + (get played count of discard)
			set played count of discard to 0
			--rating
			set summed_rating to ((get rating of keep) + (get rating of discard))
			if (get rating of keep) ­ 0 and (get rating of discard) ­ 0 then
				set summed_rating to (summed_rating / 2)
			end if
			set rating of keep to summed_rating
			set rating of discard to 0
			--artwork
			if exists artworks of discard then
				--set artwork_1 to 
				set data of artwork 1 of keep to (get data of artwork 1 of discard)
				tell discard to delete artworks
			end if
			--playlists
			set old_playlists to (get playlists of discard)
			repeat with old_playlist in old_playlists
				set old_playlist_special_kind to (get special kind of old_playlist)
				--log "playlist: " & (get name of old_playlist) & " is of type: " & old_playlist_special_kind
				if (get special kind of old_playlist) is none and (get smart of old_playlist) is false and (get name of old_playlist) ­ target_playlist then
					--and old_playlist does not contain keep 
					--http://forums.ilounge.com/applescripts-itunes-mac/242884-how-check-if-track-part-playlist.html
					--log "Attempting to duplicate " & (get name of keep) & " to playlist: " & (get name of old_playlist)
					duplicate keep to old_playlist
					--tell old_playlist to delete discard
				end if
			end repeat
			set end of new_selection to discard
			
			log "Duplicate mended " & track_1_id & " + " & track_2_id & " (LEV: " & levenshtein_distance & ")"
			-- the next track has been dealt with, skip it.
			set i to i + 2
		else
			log "NOT duplicates: " & track_1_id & " ;; " & track_2_id
			-- just go to the next track
			set i to i + 1
		end if
	end repeat
	
	set fixed indexing to old_indexing
	
	--set selection to new_selection
end tell

to switchText of t from s to r
	set d to text item delimiters
	set text item delimiters to s
	set t to every text item of t
	set text item delimiters to r
	tell t to set t to beginning & ({""} & rest)
	set text item delimiters to d
	t
end switchText

on replaceText(original_text, to_find, to_replace)
	set old_delimiters to text item delimiters
	set text item delimiters to to_find
	set parts to every text item of original_text
	set text item delimiters to to_replace
	set result_text to parts as string -- "as string" joins the parts using the current text item delimiters
	set text item delimiters to old_delimiters
	result_text
end replaceText


