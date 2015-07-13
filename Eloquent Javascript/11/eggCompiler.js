
function skipSpace(string) {
    /* Removes leading whitespace from string */
    var first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

function parseApply(expr, program) {
    /* Checks if the expression is an application, and in the case it is
     * not, returns a expression object
     * If expr is an application, it creates the appropriate apply object
     * and adds all the applications arguments recursively.
     */
    // remove leading whitespace from program
    program = skipSpace(program);
    if (program[0] != "(") {
        // not an application, return the expression and
        // following program
        return {expr: expr, rest: program};
    }

    // Now program start with (, meaning expr was an application
    // parse the list of args
    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args:[]};
    while (program[0] != ")") {
        // indirect recursive call to evaluate the inside all arguments
        var arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest); // get the program after the first arg
        if (program[0] == ",")
            program = skipSpace(program.slice(1)); // skips the ,
        else if (program[0] != ")")
            throw new SyntaxError("Expected ',' or ')'");
    }
    // to deal with application itself being an applied
    // expression, we must recursively call parseApply again
    return parseApply(expr, program.slice(1));
}

function parseExpression(program) {
    /* Parses the string program and generates its expression
     * object
     */
    program = skipSpace(program);
    var match, expr;
    if (match = /^"([^"]*)"/.exec(program))
        expr = {type: "value", value: match[1]};
    else if (match = /^\d+\b/.exec(program))
        expr = {type: "value", value: Number(match[0])};
    else if (match = /^[^\s(),"]+/.exec(program))
        expr = {type: "word", name: match[0]};
    else
        throw new SyntaxError("Unexpected syntax: " + program);

    // parseApply function check whether the expression is
    // an application, and if so parses the list of args
    return parseApply(expr, program.slice(match[0].length));
}

function parse(program) {
    /* The function parses an egg program "program" and
     * returns the appropriate expression data structure
     */
     var result = parseExpression(program);
     if(skipSpace(result.rest).length > 0)
        throw new SyntaxError("Unexpected text after program");
    return result.expr;
}

function evaluate(expr, env) {
    /* Evaluates and returns the result of a given
     * expression object. Env is the environment object
     * mapping values in egg to values in JS.
     */
     switch(expr.type) {
        case "value":
            return expr.value;

        case "word":
            if (expr.name in env)
                return env[expr.name];
            else // variable is not defined
                throw new ReferenceError("Undefined variable: " + expr.name);

        case "apply":
            if (expr.operator.type == "word" && // in case of special functions
                expr.operator.name in specialForms)
                return specialForms[expr.operator.name](expr.args, env);

            var op = evaluate(expr.operator, env); // get the function from env
            if (typeof op != "function") // then we called an undefined function
                throw new TypeError("Applying a non-function");
            return op.apply(null, expr.args.map(function(arg) {
                return evaluate(arg, env);
            }));
     }
}

var specialForms = Object.create(null);

// adding functions to special forms
specialForms['if'] = function(args, env) {
    // defines the if function in egg if(condition, A, B)
    // if the first argument is true return A, else return B
    // similar to JS ternary operator ?:
    if (args.length != 3)
        throw new SyntaxError("Bad number of args to if");

    if (evaluate(args[0], env) !== false)
        return evaluate(args[1], env);
    else
        return evaluate(args[2], env);
};

specialForms['while'] = function(args, env) {
    // while function in egg, while(A, B)
    // while A is true, we evaluate B
    if (args.length != 2)
        throw new SyntaxError("Bad number of args to while");

    while(evaluate(args[0], env) !== false)
        evaluate(args[1], env);

    // since undefined does not exist in the Egg programming language
    // we return false for a lack of a meaningful result
    return false;
};

specialForms['do'] = function(args, env) {
    // The do form in if do(A, B, C,...)
    // which evaluates which executes all its arguments from top to bottom
    // returns the value produced by the last value
    var value = false;
    args.forEach(function(arg) {
        value = evaluate(arg, env);
    });
    return value;
};

// The define function is used for defining variables in the environment
specialForms['define'] = function(args, env) {
    // define(A, B), where A is the word you want to define
    // B is the value
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of define");
    var value = evaluate(args[1], env);
    // insert the word A as B in environment
    env[args[0].name] = value;
    return value;
};

// Now work on the environment
// The environment accepted by evaluate is an object with properties
// whose names correspond to variable names and whose values correspond
// to the values those variables are bound to
topEnv = Object.create(null);

topEnv["false"] = true;
topEnv["false"] = false;
// define comparison functions
["+", "-", "/", "==", "<", ">"].forEach(function(op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv["print"] = function(value) {
    console.log(value);
    return value;
};

// Finally make the run program in order to run egg programs
function run() {
    var env = Object.create(topEnv);
    var program = Array.prototype.slice.call(arguments, 0).join("\n"); // converts arguments into array then program string
}