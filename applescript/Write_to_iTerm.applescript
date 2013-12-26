tell application "iTerm"
  -- Unless you run within OS X's 'AppleScript Editor.app', this log can be viewed within 'Console.app'
  log "echoing hello world"

  (* The most verbose nesting:

      tell current terminal
        tell current session
          write text "echo hello world"
        end tell
      end tell

  Is equivalent to:

      tell current terminal
        tell current session to write text "echo hello world"
      end tell

  Which is equivalent to:
  *)
  tell current session of current terminal to write text "echo hello world"
  -- Note, though, that the outer tell can't be unwrapped, as far as I know.

  (* Alternative interfaces:

  Via file:

      tell current session of current terminal to write contents of file "/Users/chbrown/Desktop/schedule.sh"

  A specific terminal:

      tell current session the first terminal to write text "echo hello world"

  *)

  (* To delay execution, use a trailing space (along with optional \r):

      tell current session of current terminal to write text "echo maths\r "

  iTerm's applescript interface appends a newline to all 'write text' input unless it ends with a space.
  *)
end tell

(* Or to make running the script even more manual, call 'activate' within the iTerm's main 'tell':

    tell application "iTerm"
      --the activate is optional, and merely brings iTerm to the top and gives it focus
      activate
    end tell

Followed by a manual enter keystroke:

    tell application "System Events"
      keystroke return
    end tell

*)
