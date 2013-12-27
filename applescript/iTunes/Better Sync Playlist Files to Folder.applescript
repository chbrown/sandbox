-- this must be the EXACT name of the playlist--keeping in quotes:
property the_playlist : "To Remove P-Z"

-- this should be a string of the path to the folder you want to use--keeping in quotes:
--property path_to_folder : "Hyacinth:Music - Zero Plays from 20101118 B:"
property export_base : "Zooey:Users:chbrown:Desktop:MusicExports:"
property music_base : "Zooey:Users:chbrown:Music:iTunes:iTunes Music:Music:"
-- =========================================

set track_shortpaths to {}

tell application "iTunes"
	repeat with this_track in (get every track of playlist the_playlist)
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
	set src_posix to (quoted form of POSIX path of (music_base & this_shortpath))
	log "Copying " & src_posix & " to " & dest_posix
	try
		do shell script "mkdir -p \"`dirname " & dest_posix & "`\" && cp " & src_posix & " " & dest_posix
	on error m
		log m
	end try
end repeat

log "Done"

to switchText of t from s to r
	set d to text item delimiters
	set text item delimiters to s
	set t to t's text items
	set text item delimiters to r
	tell t to set t to beginning & ({""} & rest)
	set text item delimiters to d
	t
end switchText

to get_shortpath_from_filepath(fp)
	if (class of fp) is not string then set fp to (fp as string)
	switchText of fp from music_base as string to ""
end get_shortpath_from_filepath
