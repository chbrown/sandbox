#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <time.h>
#include <arpa/inet.h>

#define PORT 9004

int broadcast_loop(void) {
  struct sockaddr_in gateway;
  gateway.sin_family = AF_INET;
  gateway.sin_port = htons(PORT);
  gateway.sin_addr.s_addr = INADDR_BROADCAST;

  int sockfd = socket(PF_INET, SOCK_DGRAM, 0);

  int broadcast = 1;
  int setsockopt_err = setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &broadcast, sizeof(broadcast));
  if (setsockopt_err) printf("Error in setsockopt: %d\n", setsockopt_err);

  char message[100];
  for(;;) {
    sprintf(message, "The time is currently %ld", time(NULL));
    int bytes_sent = sendto(sockfd, message, strlen(message) + 1, 0, (struct sockaddr *)&gateway, sizeof(gateway));
    printf("sent '%s' (%d bytes) to %s\n", message, bytes_sent, inet_ntoa(gateway.sin_addr));
    sleep(1);
  }
  close(sockfd);

  return 0;
}


int listen_loop(void) {
  struct sockaddr_in endpoint;
  endpoint.sin_family = AF_INET;
  endpoint.sin_port = htons(PORT);
  endpoint.sin_addr.s_addr = INADDR_ANY;

  int sockfd = socket(PF_INET, SOCK_DGRAM, 0);

  // this doesn't seem to be working...
  int reuse = 1;
  int setsockopt_err = setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &reuse, sizeof(reuse));
  if (setsockopt_err) printf("Error in setsockopt (SO_REUSEADDR): %d\n", setsockopt_err);
  setsockopt_err = setsockopt(sockfd, SOL_SOCKET, SO_REUSEPORT, &reuse, sizeof(reuse));
  if (setsockopt_err) printf("Error in setsockopt (SO_REUSEPORT): %d\n", setsockopt_err);

  int bind_err = bind(sockfd, (struct sockaddr *)&endpoint, sizeof(endpoint));
  if (bind_err) printf("Error in bind: %d\n", bind_err);

  char message[100];
  for(;;) {
    struct sockaddr_in source;
    socklen_t sizeof_source = sizeof(source);
    int recv_result = recvfrom(sockfd, message, 100 - 1, 0, (struct sockaddr *)&source, &sizeof_source);
    printf("recv'd %d bytes from %s: '%s'\n", recv_result, inet_ntoa(source.sin_addr), message);
  }
  close(sockfd);

  return 0;
}

int main(const int argc, const char *argv[]) {
  // `./a.out` - argc = 1, argv[0] = ./a.out
  char action[10] = "default";
  if (argc >= 2) {
    strncpy(action, argv[1], 10);
  }

  if (strcmp(action, "broadcast") == 0) {
    printf("broadcasting on %d\n", PORT);
    return broadcast_loop();
  }
  else if (strcmp(action, "listen") == 0) {
    printf("listening on %d\n", PORT);
    return listen_loop();
  }
  else {
    printf("unknown action\n");
    return 0;
  }
}
