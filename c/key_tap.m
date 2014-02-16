// From http://danielbeard.wordpress.com/2010/10/29/listening-for-global-keypresses-in-osx/
// compile like:
//     gcc -Wall -o keys_listen keys_listen.m -framework ApplicationServices
// https://developer.apple.com/library/mac/documentation/Carbon/Reference/QuartzEventServicesRef/Reference/reference.html
#include <ApplicationServices/ApplicationServices.h>

// CGEventTapCallBack type of function:
CGEventRef myCGEventCallback(CGEventTapProxy proxy, CGEventType type, CGEventRef event, void *refcon) {
    /*
    proxy
        A proxy for the event tap. See CGEventTapProxy. This callback function may pass this proxy to other functions such as the event-posting routines.
    type
        The event type of this event. See “Event Types.”
    event
        The incoming event. This event is owned by the caller, and you do not need to release it.
    refcon
        A pointer to user-defined data. You specify this pointer when you create the event tap. Several different event taps could use the same callback function, each tap with its own user-defined data.
    */
    // Paranoid sanity check.
    // if ((type != kCGEventKeyDown) && (type != kCGEventKeyUp)) {
    //     return event;
    // }

    CGEventFlags flags = CGEventGetFlags(event);
    if ((flags & kCGEventFlagMaskShift) == kCGEventFlagMaskShift) {
        printf("(shift) ");
        // kCGEventFlagMaskAlphaShift =    NX_ALPHASHIFTMASK,
        // kCGEventFlagMaskShift =         NX_SHIFTMASK,
        // kCGEventFlagMaskControl =       NX_CONTROLMASK,
        // kCGEventFlagMaskAlternate =     NX_ALTERNATEMASK,
        // kCGEventFlagMaskCommand =       NX_COMMANDMASK,
        // kCGEventFlagMaskHelp =          NX_HELPMASK,
        // kCGEventFlagMaskSecondaryFn =   NX_SECONDARYFNMASK,
        // kCGEventFlagMaskNumericPad =    NX_NUMERICPADMASK,
        // kCGEventFlagMaskNonCoalesced =  NX_NONCOALSESCEDMASK
    }

    // The incoming keycode.
    CGKeyCode keycode = (CGKeyCode)CGEventGetIntegerValueField(event, kCGKeyboardEventKeycode);

    // CGEventKeyboardGetUnicodeString

    // Keypress code goes here.
    if (type == kCGEventKeyDown) {
        printf("%d down\n", keycode);
    }
    else if (type == kCGEventKeyUp) {
        printf("%d up\n", keycode);
    }
    else if (type == kCGEventFlagsChanged) {
        printf("flag change %d\n", keycode);
    }


    if (keycode == 0) {
        CGEventSourceRef source = CGEventSourceCreate(kCGEventSourceStateCombinedSessionState);
        bool down = type == kCGEventKeyDown;
        CGEventRef s_key = CGEventCreateKeyboardEvent(source, (CGKeyCode)1, down);

        // key = "a" -> "s", since it has to go to something; not sure how we can just swallow it
        return s_key;
    }
    else if (keycode == 3) {
        // just ignore the 'f' key
        return NULL;
    }

    // We must return the event for it to be useful.
    return event;
}

int main(void) {
    // Create an event tap. We are interested in key presses.
    // CGEventMask eventMask = ((1 << kCGEventKeyDown) | (1 << kCGEventKeyUp)) ;
    CGEventMask eventMask = ((1 << kCGEventKeyDown) | (1 << kCGEventKeyUp) | (1 << kCGEventFlagsChanged)) ;

    /*
    kCGHIDEventTap
        Specifies that an event tap is placed at the point where HID system events enter the window server.
    kCGSessionEventTap
        Specifies that an event tap is placed at the point where HID system and remote control events enter a login session.
    kCGAnnotatedSessionEventTap
        Specifies that an event tap is placed at the point where session events have been annotated to flow to an application.
    */
    CFMachPortRef eventTap = CGEventTapCreate(kCGSessionEventTap, kCGHeadInsertEventTap, 0,
        eventMask, myCGEventCallback, NULL);

    if (!eventTap) {
        fprintf(stderr, "failed to create event tap\n");
        exit(1);
    }

    // Create a run loop source.
    CFRunLoopSourceRef runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0);

    // Add to the current run loop.
    CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, kCFRunLoopCommonModes);

    // Enable the event tap.
    CGEventTapEnable(eventTap, true);

    // Set it all running.
    CFRunLoopRun();

    exit(0);
}
