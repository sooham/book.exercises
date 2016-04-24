CC=cc
CFLAGS=-Werror -Wall -std=c11 -g -o

# TODO: Segregate files into includes, lib and src folders

all: *.c
	# compile all c files in the folder separately

%.c: %.h
	$(CC) $(CFLAGS) $@

clean:
	rm -f *.dSYM *.o 



