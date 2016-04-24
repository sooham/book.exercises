CC=cc
CFLAGS=-Werror -Wall -std=c11 -g

# TODO: Segregate files into includes, lib and src folders

all:
	echo "usage: make [c source file]"

%.c: %.h
	$(CC) $(CFLAGS) $@

clean:
	rm -rf *.dSYM *.o a.out



