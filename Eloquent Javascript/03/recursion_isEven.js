function isEven(n)
{
    if (n === 0) {
        return true;
    } else if (n === 1) {
        return false;
    } else if (n < 0) {
        return isEven(-n);
    } else {
        return isEven(n - 2);
    }
}

// The base case for this recursive function is:
// values of n === 1 will be false n === 0 will be true
// to deal with negative numbers, just call the function
// with the negative of the number