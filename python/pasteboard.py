#!/usr/bin/python
from ScriptingBridge import NSPasteboard, NSString, NSUTF8StringEncoding

pb = NSPasteboard.generalPasteboard()
print pb
print repr(pb.pasteboardItems())
print 'change', pb.changeCount()
print 'types', pb.types()

pb_string_data = pb.dataForType_(NSString)
pb_string = NSString.alloc().initWithData_encoding_(pb_string_data, NSUTF8StringEncoding)

print u"Pastboard string: %r" % pb_string
# .encode("utf-8")
