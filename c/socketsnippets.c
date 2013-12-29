// Snippets from Beej, etc. (not runnable)
#include <arpa/inet.h>
#include <errno.h>
#include <netdb.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <sys/un.h>
#include <time.h>
#include <unistd.h>

#define PORT 9004
#define SOCK_PATH "testechos.sock"

char* strfill(char* s, int n, char fill) {
  while (n--) *s++ = fill;
  // *s = '\0';
  return s;
}

void *get_in_addr(struct sockaddr *sa) {
  // get sockaddr, IPv4 or IPv6:
  if (sa->sa_family == AF_INET) {
    return &(((struct sockaddr_in*)sa)->sin_addr);
  }
  return &(((struct sockaddr_in6*)sa)->sin6_addr);
}


int main(void) {
  // declaring an array of strings
  // char array[NUMBER_STRINGS][STRING_MAX_SIZE];
  struct sockaddr_un local;
  local.sun_family = PF_LOCAL;
  strcpy(local.sun_path, SOCK_PATH);
  unlink(local.sun_path);
  unsigned long sun_len = strlen(local.sun_path) + sizeof(local.sun_family);
  int socket_1 = socket(PF_LOCAL, SOCK_STREAM, 0);
  // bind(socket_1, (struct sockaddr *)&local, sun_len + 1);
  // listen(socket_1, 5);

  connect(socket_1, (struct sockaddr *)&local, sun_len + 1);
  for(;;) {
    printf(">>%ld\n", time(NULL));
    char *payload = "hello";
    // send(s, str, strlen(str), 0)
    send(socket_1, payload, strlen(payload), 0);
    sleep(1);
  }

  return 0;
}


int listen(void) {
  struct sockaddr_in sa;
  sa.sin_family = AF_INET; // AF_LOCAL
  sa.sin_port = htons(PORT); // host to network short
  // sa.sin_addr.s_addr = INADDR_BROADCAST; //*((struct in_addr *)he->h_addr);
  sa.sin_addr.s_addr = INADDR_ANY;
  // inet_pton(AF_INET, "127.0.0.1", &sa.sin_addr);

  printf("listening on %s\n", inet_ntoa(sa.sin_addr));
  // memset(sa.sin_zero, '\0', sizeof(sa.sin_zero));

  int sockfd = socket(PF_INET, SOCK_DGRAM, 0);

  char payload[100];
  for(;;) {
    // sprintf(payload, "hello world, it's %ld\n", time(NULL));
    // send(sockfd, payload, strlen(payload), 0);
    struct sockaddr_in source;
    socklen_t sizeof_source =  sizeof(source);
    int recv_result = recvfrom(sockfd, payload, 100 - 1, 0, (struct sockaddr *)&source, &sizeof_source);
    // int recv_result = recv(sockfd, payload, 100 - 1, 0);
    // sendto(sockfd, payload, strlen(payload), 0, (struct sockaddr *)&sa, sizeof(sa));
    // printf("%ld '%s': %d\n", time(NULL), payload, sendto_result);
    // printf("recv %d-length '%s' from %s\n", recv_result, payload, inet_ntoa(source.sin_addr));
    printf("recv %d-length '%s' (%lu bytes) from %s\n", recv_result, payload, strlen(payload), inet_ntoa(source.sin_addr));
  }
  printf("closing sockfd: %d", sockfd);
  close(sockfd);

  return 0;
}

int broadcast_time(void) {
  // struct sockaddr_un local;
  // local.sun_family = PF_LOCAL;
  // unsigned long sun_len = strlen(local.sun_path) + sizeof(local.sun_family);
  // int socket_1 = socket(PF_LOCAL, SOCK_DGRAM, 0);
  // bind(socket_1, (struct sockaddr *)&local, sun_len + 1);
  // listen(socket_1, 5);

  struct sockaddr_in sa;
  sa.sin_family = AF_INET; // AF_LOCAL
  sa.sin_port = htons(PORT); // host to network short
  sa.sin_addr.s_addr = INADDR_BROADCAST; //*((struct in_addr *)he->h_addr);
  // memset(sa.sin_zero, '\0', sizeof(sa.sin_zero));

  int sockfd = socket(PF_INET, SOCK_DGRAM, 0);

  // set options
  int broadcast = 1;
  int setsockopt_broadcast_result = setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &broadcast, sizeof(broadcast));
  int yes = 1;
  int setsockopt_reuse_result = setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(yes));

  // int bind_result = bind(sockfd, (struct sockaddr *)&sa, sizeof(sa));
  char ip4[INET_ADDRSTRLEN];
  inet_ntop(AF_INET, &(sa.sin_addr), ip4, INET_ADDRSTRLEN);

  printf("sockfd=%d, setsockopt_broadcast_result=%d, setsockopt_reuse_result=%d\n",
    sockfd, setsockopt_broadcast_result, setsockopt_reuse_result);

  for(;;) {
    char payload[100];
    sprintf(payload, "hello world, it's %ld\n", time(NULL));
    // int send_result = send(sockfd, payload, strlen(payload), 0);
    int send_result = sendto(sockfd, payload, strlen(payload), 0, (struct sockaddr *)&sa, sizeof(sa));
    printf("sent %d bytes to %s\n", send_result, inet_ntoa(sa.sin_addr));
    sleep(1);
  }
  printf("closing sockfd: %d", sockfd);
  close(sockfd);


  return 0;
}

int main(void) {}
