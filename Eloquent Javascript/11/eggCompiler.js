
function skipSpace(string) {
    /* Removes leading whitespace from string */
    var first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

function parseApply(expr, program) {
    /* Checks if the expression is an application, and in the case it is
     * not, returns a expression object
     * If expr is an application, it create the appropriate apply object
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
            if (expr.operator.type == "word" && // in case of JS incompatible functions
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


