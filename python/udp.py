# listener

import socket

# UDP_IP = '127.0.0.1'
UDP_IP = '0.0.0.0'
UDP_PORT = 5050

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

while True:
    data, addr = sock.recvfrom(1024)  # buffer size is 1024 bytes
    print 'received message:', data
    print '  from:', addr


# sender

import socket

remote_ip = '1.2.3.4'  # replace this with the IP of your Linode VM or whatever
# UDP_PORT = 5050

# print 'UDP target IP:', UDP_IP
# print 'UDP target port:', UDP_PORT
# print 'message:', MESSAGE

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto('hey there!', (remote_ip, 5050))
