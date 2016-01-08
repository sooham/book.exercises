#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

struct Address {
    int id;
    int set;
    char *name;
    char *email;
};

struct Database {
    int max_rows;
    int max_data;
    struct Address *rows;
};

struct Connection {
    FILE *file;
    struct Database *db;
};

void Connection_close(struct Connection *);

void die(struct Connection *conn, const char *message) {
    Connection_close(conn);

    if (errno) {
        perror(message);
    } else {
        printf("ERROR: %s\n", message);
    }
}

/* Prints an Addresee's details */
void Address_print(struct Address *addr) {
    printf("%d %s %s\n", addr->id, addr->name, addr->email);
}

/* Loads the Database from the Connection's given file */
void Database_load(struct Connection *conn) {
    struct Database *db = conn->db;
    int rc = fread(&db->max_rows, sizeof(int), 1, conn->file);
    if (rc != 1) die(conn, "Failed to read max rows");

    rc = fread(&db->max_data, sizeof(int), 1, conn->file);
    if (rc != 1) die(conn, "Failed to read max data");

    // now we read the addresses from file into the database
    for (int i = 0; i < db->max_rows; i++) {
        struct Address *addr = &db->rows[i];
        rc = fread(addr, sizeof(struct Address), 1, conn->file);
        if (rc != 1) die(conn, "Failed to read address");
        rc = fread(addr->name, db->max_data, 1, conn->file);
        if (rc != 1) die(conn, "Failed to read address");
        rc = fread(addr->email, db->max_data, 1, conn->file);
        if (rc != 1) die(conn, "Failed to read address");
    }
}

/* Loads a Connection and its Database given the filename and mode */
struct Connection *Connection_open(const char *filename, char mode, int max_rows, int max_data) {
    struct Connection *conn = malloc(sizeof(struct Connection));
    if (!conn) die(conn, "Memory error");

    conn->db = malloc(sizeof(struct Database));
    if (!conn->db) die(conn, "Memory error");

    // allocate memory for the addresses and their respective names, addresses
    struct Database *db = conn->db;
    db->max_rows = max_rows;
    db->max_data = max_data;
    db->rows = malloc(sizeof(struct Address) * max_rows);
    if (!db->rows) die(conn, "Memory Error");

    for (int i = 0; i < max_rows; i++) {
        struct Address *addr = &db->rows[i];
        addr->name = malloc(max_data);
        if (!addr->name) die(conn, "Memory Error");
        addr->email = malloc(max_data);
        if (!addr->email) die(conn, "Memory Error");
    }

    if (mode == 'c') {
        conn->file = fopen(filename, "w");
    } else {
        conn->file = fopen(filename, "r+");

        if (conn->file) {
            Database_load(conn);
        }
    }

    if (!conn->file) die(conn, "Failed to open the file");

    return conn;
}

/* Closes the Connection and its Database */
void Connection_close(struct Connection *conn) {
    if (conn) {
        if (conn->file) fclose(conn->file);
        if (conn->db) {
            if (conn->db->rows) {
                for (int i = 0; i < conn->db->max_rows; i++) {
                    struct Address *addr = &conn->db->rows[i];
                    if (addr->name) free(addr->name);
                    if (addr->email) free(addr->email);
                }
                free(conn->db->rows);
            }
            free(conn->db);
        }
        free(conn);
    }
}

/* Writes to the Database all changes made during runtime*/
void Database_write(struct Connection *conn) {
    rewind(conn->file);

    int wc = fwrite(&conn->db->max_rows, sizeof(int), 1, conn->file);
    if (wc != 1) die(conn, "Failed to write to max rows");
    wc = fwrite(&conn->db->max_data, sizeof(int), 1, conn->file);
    if (wc != 1) die(conn, "Failed to write to max data");

    // write database
    for (int i = 0; i < conn->db->max_rows; i++) {
        struct Address *addr = &conn->db->rows[i];
        wc = fwrite(addr, sizeof(struct Address), 1, conn->file);
        if (wc != 1) die(conn, "Failed to write Address");
        wc = fwrite(addr->name, conn->db->max_data, 1, conn->file);
        if (wc != 1) die(conn, "Failed to write Address");
        wc = fwrite(addr->email, conn->db->max_data, 1, conn->file);
        if (wc != 1) die(conn, "Failed to write Address");
    }

    wc = fflush(conn->file);
    if (wc == -1) die(conn, "Cannot flush database");
}

/* Populate the Database of a Connection with empty addresses */
void Database_populate(struct Connection *conn) {
    for (int i = 0; i < conn->db->max_rows; i++) {
        // make a prototype address to initialize it
        struct Address addr = {.id = i, .set = 0, .name = NULL, .email = NULL};
        // then just assign it
        conn->db->rows[i] = addr;
    }
}

/*Set an Address value of id in Database to have given name and email*/
void Database_set(struct Connection *conn, int id, const char *name, const char *email) {
    struct Address *addr = &conn->db->rows[id];
    if (addr->set) die(conn, "Already set, delete it first");

    addr->set = 1;
    char *res = strncpy(addr->name, name, conn->db->max_data);
    if (!res) die(conn, "Name copy failed");
    res[conn->db->max_data - 1] = '\0';
    res = strncpy(addr->email, email, conn->db->max_data);
    if (!res) die(conn, "Email copy failed");
    res[conn->db->max_data - 1] = '\0';
}

/* Get the information for the Address with given id */
void Database_get(struct Connection *conn, int id) {
    struct Address *addr = &conn->db->rows[id];

    if (addr->set) {
        Address_print(addr);
    } else {
        die(conn, "ID is not set");
    }
}

/* Delete the Address with the given id */
void Database_delete(struct Connection *conn, int id) {
    struct Address addr = {.id = id, .set = 0, .name = NULL, .email = NULL};
    conn->db->rows[id] = addr;
}

/* List all the addresses in the Database */
void Database_list(struct Connection *conn) {
    struct Database *db = conn->db;

    for (int i = 0; i < db->max_rows; i++) {
        struct Address *cur = &db->rows[i];

        if (cur->set) {
            Address_print(cur);
        }
    }
}

int main(int argc, char *argv[]) {
    if (argc < 3) die(NULL, "USAGE ./ex17 <dbfile> <actions> [action params]");

    char *filename = argv[1];
    char action = argv[2][0];
    struct Connection *conn;
    int id = 0;

    switch (action) {
        case 'c':
            // get the max_rows and max_data args
            if (argc != 5) die(conn, "Need max_rows and max_data args");
            int max_rows = atoi(argv[3]);
            int max_data = atoi(argv[4]);

            conn = Connection_open(filename, action, max_rows, max_data);
            Database_populate(conn);
            Database_write(conn);
            break;
        case 'g':
            if (argc != 4) die(conn, "Need an id to get");
            id = atoi(argv[3]);
            Database_get(conn, id);
            break;

        case 's':
            if (argc != 6) die(conn, "Need an id, name, email to set");
            id = atoi(argv[3]);

            Database_set(conn, id, argv[4], argv[5]);
            Database_write(conn);
            break;

        case 'd':
            if (argc != 4) die(conn, "Need id to delete");
            id = atoi(argv[3]);

            Database_delete(conn, id);
            Database_write(conn);
            break;

        case 'l':
            Database_list(conn);
            break;
        default:
            die(conn, "Invalid action, only c=create, g=get, s=set, d=del, l=list");
            break;
    }
}
