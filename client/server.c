#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <pthread.h>

#define PORT 8080

void *client_handler(void *arg)
{
    int client_socket = *(int *)arg;
    free(arg);

    struct sockaddr_in client_addr;
    socklen_t addr_len = sizeof(client_addr);

    char buffer[1024];
    int choice, num;

    // Get client IP address
    getpeername(client_socket,
                (struct sockaddr *)&client_addr,
                &addr_len);

    printf("\nClient Connected");
    printf("\nClient IP Address: %s\n",
           inet_ntoa(client_addr.sin_addr));

    while (1)
    {
        memset(buffer, 0, sizeof(buffer));

        int n = recv(client_socket, buffer, sizeof(buffer) - 1, 0);

        if (n <= 0)
            break;

        sscanf(buffer, "%d %d", &choice, &num);

        if (choice == 1)
        {
            // Factorial
            long long fact = 1;

            for (int i = 1; i <= num; i++)
                fact = fact * i;

            sprintf(buffer, "Factorial of %d = %lld", num, fact);

            send(client_socket, buffer, strlen(buffer), 0);
        }

        else if (choice == 2)
        {
            // Fibonacci
            int a = 0, b = 1, c;

            sprintf(buffer, "Fibonacci series: ");

            for (int i = 0; i < num; i++)
            {
                char temp[50];

                sprintf(temp, "%d ", a);
                strcat(buffer, temp);

                c = a + b;
                a = b;
                b = c;
            }

            send(client_socket, buffer, strlen(buffer), 0);
        }

        else if (choice == 3)
        {
            // Odd or Even
            if (num % 2 == 0)
                sprintf(buffer, "%d is Even", num);
            else
                sprintf(buffer, "%d is Odd", num);

            send(client_socket, buffer, strlen(buffer), 0);
        }

        else if (choice == 4)
        {
            strcpy(buffer, "Thank you. Connection closed.");
            send(client_socket, buffer, strlen(buffer), 0);
            break;
        }

        else
        {
            strcpy(buffer, "Invalid choice");
            send(client_socket, buffer, strlen(buffer), 0);
        }
    }

    printf("Client [%s] disconnected\n",
           inet_ntoa(client_addr.sin_addr));

    close(client_socket);

    return NULL;
}

int main()
{
    int server_socket;

    struct sockaddr_in server_addr;

    server_socket = socket(AF_INET, SOCK_STREAM, 0);

    if (server_socket < 0)
    {
        printf("Socket creation failed\n");
        return 1;
    }

    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    if (bind(server_socket,
             (struct sockaddr *)&server_addr,
             sizeof(server_addr)) < 0)
    {
        printf("Bind failed\n");
        return 1;
    }

    listen(server_socket, 5);

    printf("=================================\n");
    printf("     MULTI CLIENT TCP SERVER\n");
    printf("=================================\n");
    printf("Server started on port %d\n", PORT);
    printf("Waiting for clients...\n");

    while (1)
    {
        struct sockaddr_in client_addr;
        socklen_t client_len = sizeof(client_addr);

        int *client_socket = malloc(sizeof(int));

        *client_socket = accept(
            server_socket,
            (struct sockaddr *)&client_addr,
            &client_len);

        if (*client_socket < 0)
        {
            free(client_socket);
            continue;
        }

        pthread_t thread;

        pthread_create(
            &thread,
            NULL,
            client_handler,
            client_socket);

        pthread_detach(thread);
    }

    close(server_socket);

    return 0;
}