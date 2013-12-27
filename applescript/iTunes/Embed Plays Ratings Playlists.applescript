tell application "iTunes"
  set current_selection to selection
  set n_current_selection to count of current_selection
  if n_current_selection is equal to 0 then
    set old_fixed_indexing to fixed indexing
    set fixed indexing to true
    repeat with current_track in current_selection
      set track_played_count to (get played count of current_track)
      set track_rating to (get rating of current_track)
      set encoded_details to ("plays:" & track_played_count & ";rating:" & track_rating) as string

      set track_playlists to (get playlists of current_track)
      repeat with track_playlist in track_playlists
        if (get special kind of track_playlist) is none then
          if (get smart of track_playlist) is false then
            set playlist_name to (get name of track_playlist)
            set encoded_details to (encoded_details & ";playlist:" & playlist_name)
          end if
        end if
      end repeat

      set comment of current_track to encoded_details
    end repeat
    set fixed indexing to old_fixed_indexing
  else
    display dialog return & "Select some tracks first..." buttons {"Cancel"} default button 1 with icon 0 giving up after 15
    return
  end if

  log "Did " & ()
end tell

on splitText(delimiter, someText)
  set prevTIDs to AppleScript's text item delimiters
  set AppleScript's text item delimiters to delimiter
  set output to text items of someText
  set AppleScript's text item delimiters to prevTIDs
  return output
end splitText
