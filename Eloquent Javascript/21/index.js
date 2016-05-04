// browser side js. deals with adding, deleting, commenting on talks
// and showing talks as they come in from the server
//
// { "list": [
//      {title: "", author: "",  comments: [{name: "", content: ""}, ...],},
//      {},
//      ...,
//      {}
// ]}

function initializeRequest() {
    talkRequest = new XMLHttpRequest();
    talkRequest.timeout = 2000;
    talkRequest.onload = onload;
    talkRequest.onerror = onerror;
    talkRequest.ontimeout = ontimeout;
    talkRequest.open("GET", "/talks", true);
    talkRequest.send(null);
}

function onload (e) {
    if (talkRequest.status === 200 && talkRequest.readyState === DONE) {
        console.log(talkRequest.responseText);
        talks = JSON.parse(talkRequest.responseText).length;
        // add the talks to the DOM here
        talk_list = document.body.getElementsByClassName("talk-list")[0];
        // create and add the talks
        for (var i = 0; i < talks.length; i++) {
            var talk = document.createElement("form");
            talk.className = "talk";
            talk.method = "post";
            talk.action = "/talks/comments";

            var title = document.createElement("h3");
            title.className = "talk-name";
            title.innerHTML = talks[i].title;
            talk.appendChild(title);

            var author = document.createElement("p");
            var name = document.createElement("span");
            name.className = "user-name";
            name.innerHTML = talks[i].author;
            author.appendChild(document.createTextNode("by ");
            author.appendChild(name);

            var comments = document.createElement("div");
            comments.className = "comments";
            // now add every comment into the comments
            for (var j = 0; j < talks[i].comments.length; j++) {
                var comment = document.createElement("p");
                var name = document.createElement("span");
                name.className = "user-name";
                name.innerHTML = talks[i].comments[j].name;
                comment.appendChild(name);
                comment.appendChild(document.createTextNode(": " + talks[i].comments[j].content));
                comments.appendChild(comment);
            }
            talk.appendChild(comments);

            var comment_box = document.createElement("input");
            var add_comment = document.createElement("input");
            var del_talk = document.createElement("input");

            comment_box.type = "text";
            comment_box.name = "comment";
            talk.appendChild(comment_box);

            add_comment.type = "submit";
            add_comment.value = "Add Comment";
            add_comment.onsubmit = "add_comment()";
            talk.appendChild(add_comment);

            del_talk.type = "submit";
            del_talk.value = "Delete Talk";
            del_talk.onsubmit = "delete_talk()";
            talk.appendChild(del_talk);
        }
    } else {
        console.log(e);
    }

    // send the request again
    initializeRequest();
}

function onerror (e) {
    console.log("onerror() event fired");
    console.log(e);

    initializeRequest();
};

function ontimeout () {
    // send the next one
    initializeRequest();
};

function add_comment() {
    // get the value of #name-input ID
    // add it to the shit in the form if possible
}

function delete_talk() {
    // how to get talk name?
    // send a DELETE request to /talks with body including the talkname
}

function submit_talk() {
    // get the value of #name-input ID
    // add it to the shit in the form
}

// send the talkRequest
initializeRequest();

