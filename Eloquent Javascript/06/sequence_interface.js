/* Design an interface that abstracts iteration over a collection of values.
 * An object that provides this interface represents a sequence,
 * and the interface must somehow make it possible for code that uses
 * such an object to iterate over the sequence, looking at the element values
 * it is made up of and having some way to find out when the end of the
 * sequence is reached.
 */

// define the Node constructor
function Node(key, value, next)  {
    this.key = key;
    this.value = value;
    this.nextNode = next || undefined;
}

// A sequence is a collection of zero or more Nodes

function Sequence(head) {
    // Creates a sequence starting at head container
    this.head = head;
    this.current = head;
    this.next = function() {
        // get the next container with respect to the current container
        if (this.current.nextNode === undefined) {
            this.current = this.head;
            return undefined;
        } else {
            this.current = this.current.nextNode;
            return this.current;
        }
    };
}
