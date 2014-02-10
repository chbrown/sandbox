// Compile with:
// gcc -o keys keys.m -framework ApplicationServices -framework Foundation
//
// http://stackoverflow.com/questions/2379867/simulating-key-press-events-in-mac-os-x
// http://stackoverflow.com/questions/10179995/how-to-simulate-a-unicode-char-key-press-in-mac-os-x-using-objective-c
// https://github.com/shortcutrecorder/shortcutrecorder
//   http://code.google.com/p/shortcutrecorder/source/browse/trunk/Framework/Source/SRKeyCodeTransformer.m

#import <Foundation/Foundation.h>
#import <ApplicationServices/ApplicationServices.h>

int main(int argc, char *argv[]) {
  NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
  NSUserDefaults *args = [NSUserDefaults standardUserDefaults];

  // grabs command line arguments -x and -y
  // int x = [args integerForKey:@"x"];
  // int y = [args integerForKey:@"y"];

  // A CGKeyCode is nothing more than an unsigned integer:
  // typedef uint16_t CGKeyCode;  //From CGRemoteOperation.h
  // See CGRemoteOperation.h for details.

  // Here's code to simulate a Cmd-S action (well, S, without kCGEventFlagMaskCommand)

  CGEventSourceRef source = CGEventSourceCreate(kCGEventSourceStateCombinedSessionState);
  CGEventRef saveCommandDown = CGEventCreateKeyboardEvent(source, (CGKeyCode)1, YES);
  // CGEventSetFlags(saveCommandDown, kCGEventFlagMaskCommand);
  CGEventRef saveCommandUp = CGEventCreateKeyboardEvent(source, (CGKeyCode)1, NO);

  // CGEventRef downEvt = CGEventCreateKeyboardEvent( NULL, 0, true );
  // CGEventRef upEvt = CGEventCreateKeyboardEvent( NULL, 0, false );
  // UniChar oneChar = 'h';
  // CGEventKeyboardSetUnicodeString( downEvt, 1, &oneChar );
  // CGEventKeyboardSetUnicodeString( upEvt, 1, &oneChar );
  // CGEventPost( kCGAnnotatedSessionEventTap, downEvt );
  // CGEventPost( kCGAnnotatedSessionEventTap, upEvt );

  CGEventPost(kCGAnnotatedSessionEventTap, saveCommandDown);
  CGEventPost(kCGAnnotatedSessionEventTap, saveCommandUp);

  // You can use the kVK_??? constants instead of plain numbers

  CFRelease(saveCommandUp);
  CFRelease(saveCommandDown);
  CFRelease(source);

  // Your real issue will be turning a character (probably an NSString) into a keycode. Fortunately, the Shortcut Recorder project has code that will do just that in the SRKeyCodeTransformer.m file. It's great for transforming a string to a keycode and back again.

  [pool release];
  return 0;
}
