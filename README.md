# String Comparator


**Simple string comparison using multiple algorithms** ✨

Just another plugin to tell the degree of closeness of two strings using
 Jaro-Winkler Algorithm, Cosine Similarity and Levenshtein Algorithm

# Installation
 `npm i string-comparator `

# Methods
- `jaro(a,b)` - Search string using Jaro-Winkler Algorithm (0-100)%
- `cosine(a,b)` - Search string using Cosine Similarity (true/false)
- `levenshtein(a,b)` - Search string using Levenshtein Algorithm (0-100)%

# Examples
```
let stringCompare = require('string-comparator')
let matchPercentage = stringCompare.jaro("foo","bar")
let matchPercentage2 = stringCompare.levenshtein("foo","bar")
let isMatch = stringCompare.cosine("foo","bar")

```



# License

MIT © Jhony112
# string-comparator
