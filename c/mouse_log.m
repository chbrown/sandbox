#import <Foundation/Foundation.h>
#import <ApplicationServices/ApplicationServices.h>

// https://developer.apple.com/library/mac/documentation/Carbon/Reference/QuartzEventServicesRef/Reference/reference.html

// gcc -o mouse_log mouse_log.m -Wall -framework ApplicationServices

CGEventRef callback(CGEventTapProxy proxy, CGEventType type, CGEventRef event, void *refcon) {
    /*
    proxy
        A proxy for the event tap. See CGEventTapProxy. This callback function may pass this proxy to other functions such as the event-posting routines.
    type
        The event type of this event; e.g., kCGEventLeftMouseDown
    event
        The incoming event. This event is owned by the caller, and you do not need to release it.
    refcon
        A pointer to user-defined data. You specify this pointer when you create the event tap. Several different event taps could use the same callback function, each tap with its own user-defined data.
    */

    // flags will tell you things like whether shift was down, or alt, command, etc.
    // CGEventFlags flags = CGEventGetFlags(event);

    // The incoming keycode.
    // CGKeyCode keycode = (CGKeyCode)CGEventGetIntegerValueField(event, kCGKeyboardEventKeycode);

    if (type == kCGEventLeftMouseDown) {
        printf("LeftMouseDown\n");
    } else if (type == kCGEventLeftMouseUp) {
        printf("LeftMouseUp\n");
    } else if (type == kCGEventRightMouseDown) {
        printf("RightMouseDown\n");
    } else if (type == kCGEventRightMouseUp) {
        printf("RightMouseUp\n");
    } else if (type == kCGEventMouseMoved) {
        // printf("MouseMoved\n");
    } else if (type == kCGEventLeftMouseDragged) {
        printf("LeftMouseDragged\n");
    } else if (type == kCGEventRightMouseDragged) {
        printf("RightMouseDragged\n");
    } else if (type == kCGEventScrollWheel) {
        printf("ScrollWheel\n");
    } else if (type == kCGEventTabletPointer) {
        printf("TabletPointer\n");
    } else if (type == kCGEventTabletProximity) {
        printf("TabletProximity\n");
    } else if (type == kCGEventOtherMouseDown) {
        printf("OtherMouseDown\n");
    } else if (type == kCGEventOtherMouseUp) {
        printf("OtherMouseUp\n");
    } else if (type == kCGEventOtherMouseDragged) {
        printf("OtherMouseDragged\n");
    } else if (type == kCGEventTapDisabledByTimeout) {
        printf("TapDisabledByTimeout\n");
    } else if (type == kCGEventTapDisabledByUserInput) {
        printf("TapDisabledByUserInput\n");
    }

    // We must return the event since we're an active listener
    return event;
}

int main(int argc, const char *argv[]) {
  // @autoreleasepool {}

  CGEventMask eventMask =
    (1 << kCGEventLeftMouseDown) |
    (1 << kCGEventLeftMouseUp) |
    (1 << kCGEventRightMouseDown) |
    (1 << kCGEventRightMouseUp) |
    (1 << kCGEventMouseMoved) |
    (1 << kCGEventLeftMouseDragged) |
    (1 << kCGEventRightMouseDragged) |
    (1 << kCGEventScrollWheel) |
    (1 << kCGEventTabletPointer) |
    (1 << kCGEventTabletProximity) |
    (1 << kCGEventOtherMouseDown) |
    (1 << kCGEventOtherMouseUp) |
    (1 << kCGEventOtherMouseDragged);
    // (1 << kCGEventTapDisabledByTimeout) |
    // (1 << kCGEventTapDisabledByUserInput);

  CFMachPortRef eventTap = CGEventTapCreate(kCGSessionEventTap, kCGHeadInsertEventTap, kCGEventTapOptionDefault,
      eventMask, callback, NULL);

  if (!eventTap) {
      fprintf(stderr, "failed to create event tap\n");
      exit(1);
  }

  CFRunLoopSourceRef runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0);
  CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, kCFRunLoopCommonModes);
  CGEventTapEnable(eventTap, true);
  CFRunLoopRun();

}
