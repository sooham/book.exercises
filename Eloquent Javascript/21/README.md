#server

- keeps a list of talks proposed for the next meeting
- each talk has a:
    - presenter name
    - a title
    - a summary
    - a list of comments associated with it

# client

- shows the list of upcoming talks
- propose new talks
- delete talks
- comment on existing talks

## Implementation
All this has to happen live via polling

## HTTP syntax
- propose new talks     PUT talks/ JSON of talk
- delete talk           DELETE talks/number
- comment on talk       PUT talks/number/comments comment JSON
- get talks             GET talks/
