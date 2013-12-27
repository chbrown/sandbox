
tell application "iTunes"
	set sel to selection
	if sel is not {} then
		set ofi to fixed indexing
		set fixed indexing to true
		repeat with thisTrack in sel
			try
				
				tell thisTrack to set year to my year_of_release_date(get release date)
			on error m
				log m -- do you care?
			end try
		end repeat
		set fixed indexing to ofi
	else
		display dialog return & "Select some tracks first..." buttons {"Cancel"} default button 1 with icon 0 giving up after 15
		return
	end if -- no sel	
end tell

on year_of_release_date(d)
	try
		return (year of d)
	end try
end year_of_release_date