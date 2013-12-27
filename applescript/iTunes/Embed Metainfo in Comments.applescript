tell application "iTunes"
  set sel to selection
  if sel is not {} then
    set old_indexing to fixed indexing
    set fixed indexing to true
    repeat with this_track in sel
      try
        set mode to "embed"
        if mode is "embed" then
          set track_played_count to (get played count of this_track)
          set track_rating to (get rating of this_track)
          set encoded_details to ("plays:" & track_played_count & ";rating:" & track_rating) as string

          set track_playlists to (get playlists of this_track)
          repeat with track_playlist in track_playlists
            if (get special kind of track_playlist) is none then
              if (get smart of track_playlist) is false then
                set playlist_name to (get name of track_playlist)
                set encoded_details to (encoded_details & ";playlist:" & playlist_name)
              end if
            end if
          end repeat

          set comment of this_track to encoded_details
        else
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

          --log thisTrack
          --global track_class
          --set track_class to (get class of thisTrack)

          --set comment_text to (encodeTrack(thisTrack))
          --log (get played count of thisTrack)
          --log comment_text

        end if



      on error m
        log m -- do you care?
      end try
    end repeat
    set fixed indexing to old_indexing
  else
    display dialog return & "Select some tracks first..." buttons {"Cancel"} default button 1 with icon 0 giving up after 15
    return
  end if

  log "Did " & (count (sel))
end tell

on splitText(delimiter, someText)
  set prevTIDs to AppleScript's text item delimiters
  set AppleScript's text item delimiters to delimiter
  set output to text items of someText
  set AppleScript's text item delimiters to prevTIDs
  return output
end splitText
