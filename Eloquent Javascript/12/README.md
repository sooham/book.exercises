# The Document Object Model

- **document.documentElement** gives us acess to the DOM, giving us the outermost <html> tag.
- **document.body** and **document.head** gives the <body> and </head> tag.
- each DOM node has a **nodeType** property, which contains a number indicating
  type of node. Here are the types of nodes:
    - **document.ELEMENT_NODE** indicates normal elements.
    - **document.TEXT_NODE** indicates text.
    - **document.COMMENT_NODE** indicates comments.
- Every node in DOM has specific properties i.e links to nearby nodes:
    - (ELEMENT_NODE only) **childNodes** a "list" of child nodes.
    - **firstChild** gives the first child.
    - **lastChild** gives the last child.
    - **parentNode** gives the parent node.
    - **previousSibling**, **nextSibling**, gives siblings
    - all of the above properties can be **null**.
- **TEXT_NODE**s are created for whitespace in between nodes.

- More useful methods allow you to get a tag, class or id easily.
- **node.getElementsbyTagName(tag)** returns an array like object containing
  all descendant tags with given tagname.
- **node.getElementbyId(id)** and **node.getElementbyClass(class)**
- you can get attributes out of element by its attribute property i.e **link.href** will return the href of the link, **image.src** will return the src attribute of the image.
- **node.removeChild(node)** removes the given child, **node.appendChild(node)** appends the child to the node. **node.insertBefore(insert_node, target_node)**. Note that node can only exist in document in only one place. Example:
    """
    <p>One</p>
    <p>Two</p>
    <p>Three</p>

    <script>
        var papragraphs = document.body.getElementByTagName("p");
        document.body.insertBefore(paragraphs[2], paragraphs[0]);
    </script>
    
    // result
    // <p>Three</p>
    // <p>One</p>
    // <p>Two</p>
    """

# Node creation

-  """ 
function replaceImages() {
    var images = document.body.getElementsByTagName("img");
    for (var i = images.length - 1; i >= 0; i--) {
        var image = images[i];
        if (image.alt) {
        var text = document.createTextNode(image.alt);
        image.parentNode.replaceChild(text, image);
        }
    }
}
   """
- **node.createTextNode(string)** creates a TEXT_NODE.
- **node.createElement(tag)** creates and returns an empty node of given type.
- **replaceChild(to, from)** replaces from to to.
- node lists returned are live, changing the DOM changes the list, hence we start last first.

# Attributes
- HTML allows you to set any attribute you want on the nodes (this is done by Angular).
- Non-standard attributes are set by **node.getAttribute** and **node.setAttribute**

# Layout control
- Size and position of a node can be accessed using **offsetWidth** and **offsetHeight** in pixels.
- **clientWidth** and **clientHeight** give the space inside the element, ignoring border widths.
- **getBoundingClientRect** allows you to get the **top, bottom, left, right** position on the screen.
- The current scroll position can be found using the **pageXOffset** and **pageYOffset** global variables.

# Changing CSS of element
- **node.style.css_attribute** provides access to the node's styling through the
HTML style tag. i.e  **node.style.fontFamily = Garamond**
- **node.querySelectorAll(selector)** takes in a CSS selector string i.e "p > a" and returns an array-like object containing all matches. The returned data structure is not live. **node.querySelector** only returns the first match.
- Browsers do not update their screen whilst JS is running.


