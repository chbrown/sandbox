## Credits

I owe much to [DougScripts](http://dougscripts.com/itunes/) for the basis of many of the scripts in this folder,
but that guy has a really outdated sense of what 'open source' means.
The scripts on his site are distributed as apps within mountable images; he has left the hacker spirit far behind, and I expect that if binarized / obfuscated Applescripts were as easy to distribute, he would not provide the sources.
Which is a pity, because there is a lot of knowledge bundled up in the scripts on his site.

I think that the scripts in this folder are different enough from those of Doug's that may overlap in some functionality, that I need not be obligated to his license or copyright.

And so they are available as MIT-licensed plain `.applescript` files.

### Useful snippets

Split text with some separator that isn't the default (you have to change the global, and then change it back):

    on splitText(delimiter, someText)
      set prevTIDs to AppleScript's text item delimiters
      set AppleScript's text item delimiters to delimiter
      set output to text items of someText
      set AppleScript's text item delimiters to prevTIDs
      return output
    end splitText

Or this, which might be different; I'm not sure:

    on splitText(delimiter, someText)
      set prevTIDs to text item delimiters
      set text item delimiters to delimiter
      set output to text items of someText
      set text item delimiters to prevTIDs
      return output
    end splitText

Replace a certain character by splitting on it and joining things back together around the replacement.
It doesn't set the current global delimiters as the two previously splits do.

    on replaceChars(txt, srch, repl)
      set text item delimiters to the srch
      set the item_list to every text item of txt
      set text item delimiters to the repl
      set txt to the item_list as string
      set text item delimiters to ""
      txt
    end replaceChars

This is another way to do the same thing. Kind of ridiculous how they can be so different:

    to switchText of t from s to r
      set d to text item delimiters
      set text item delimiters to s
      set t to t's text items
      set text item delimiters to r
      tell t to set t to beginning & ({""} & rest)
      set text item delimiters to d
      t
    end switchText

Do something to all tracks in a selection, or ask user to select some tracks.

    tell application "iTunes"
      set sel to selection
      if sel is not {} then
        set old_indexing to fixed indexing
        set fixed indexing to true
        repeat with thisTrack in sel
          --
          -- do something with thisTrack
          --
        end repeat
        set fixed indexing to old_indexing
      else
        display dialog return & "Select some tracks first..." buttons {"Cancel"} default button 1 with icon 0 giving up after 15
        return
      end if
    end tell

Things you can try to do with `thisTrack`, e.g., in the loop above:

    -- start it playing:
    play thisTrack

    -- erase the track's comment with the string "Comment erased"
    set comment of thisTrack to "Comment erased"
    -- or do it more imperatively
    tell thisTrack to set comments to "Comment erased"

    -- get the number of plays, and rating, and store them in local variables
    set track_played_count to (get played count of thisTrack)
    set track_rating to (get rating of thisTrack)
    -- join into single string, log, and set as the comment
    set full_comment to ("plays:" & track_played_count & ";rating:" & track_rating) as string
    log full_comment
    set comment of thisTrack to full_comment
    --tell thisTrack to set comments to full_comment

    -- set the year (not sure where my_year was declared)
    copy (get year of thisTrack) to my_year

    -- list playlists that this track is in
    set track_playlists to (get playlists of thisTrack)
    repeat with track_playlist in track_playlists
      log (get name of track_playlist)
      log (get special kind of track_playlist)
    end repeat

    -- increment play count of the track
    set played count of thisTrack to (track_played_count + 1)

    -- increment rating of this track a full star (5 stars = 50, 3.5 stars = 35, etc.)
    set rating of thisTrack to (track_rating + 10)

Or put this function / method / procedure in the global scope:

    on getTrackMetadataString(someTrack)
      -- get play count, rating, and the playlist that this track is a member of
      set track_played_count to (get played count of someTrack)
      set track_rating to (get rating of someTrack)
      set metadata_string to ("plays:" & track_played_count & ";rating:" & track_rating) as string

      set track_playlists to (get playlists of someTrack)
      repeat with track_playlist in track_playlists
        set playlist_name to (get name of track_playlist)
        --log (get special kind of track_playlist)
        set metadata_string to (metadata_string & ";playlist:" & playlist_name)
      end repeat

      return metadata_string
    end getTrackMetadataString

And then in the loop, put:

    set saved_comment to (get comment of thisTrack)
    set track_metadata_comment to (getTrackMetadataString(thisTrack))
    set both_comment = (track_metadata_comment & ";" & saved_comment)
    set comment of thisTrack to both_comment

And to decode all that, for example (using the splitText snippet global above):

    set stored_comment to (get comment of thisTrack)
    set comment_splits to my splitText(";", stored_comment)
    repeat with comment_split in comment_splits
      set {prop_name, prop_value} to my splitText(":", comment_split)
      if prop_name is "plays" then
        set played count of thisTrack to prop_value
      end if
      if prop_name is "rating" then
        set rating of thisTrack to prop_value
      end if
      -- should also handle playlists, and delete the metadata parts of the
      -- comment, now that we've processed them.
    end repeat

If you have a single playlist in mind, you can use that as the iterator, e.g.:

    tell application "iTunes"
      repeat with this_track in (get every track of playlist target_playlist)
        --
        -- do whatever with this_track
        --
      end repeat
    end tell

For example, to get all directory bases of files in a playlist:

    -- there must have been some other declarations up here...

    to get_shortpath_from_filepath(fp)
      if (class of fp) is not string then set fp to (fp as string)
      switchText of fp from music_base as string to ""
    end get_shortpath_from_filepath

    tell application "iTunes"
      repeat with this_track in (get every track of playlist target_playlist)

        if class of this_track is file track then
          try
            set loc to this_track's location
            set track_shortpath to my get_shortpath_from_filepath(loc)
            set end of track_shortpaths to track_shortpath
          end try
        end if -- not file track
      end repeat
    end tell

    repeat with i from 1 to length of track_shortpaths
      set this_shortpath to item i of track_shortpaths
      set dest_posix to (quoted form of POSIX path of (export_base & this_shortpath))
      do shell script "mkdir -p \"`dirname " & dest_posix & "`\" && cp " & (quoted form of POSIX path of (music_base & this_shortpath)) & " " & dest_posix
    end repeat

    log "Done"
