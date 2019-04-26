'use strict';
let compareStrings = {
    jaro: function (a, b) {


        var m = 0;

        // Exit early if either are empty.
        if (a.length === 0 || b.length === 0) {
            return 0;
        }

        // Exit early if they're an exact match.
        if (a === b) {
            return 1;
        }

        var range = (Math.floor(Math.max(a.length, b.length) / 2)) - 1,
            aMatches = new Array(a.length),
            bMatches = new Array(b.length);

        for (var i = 0; i < a.length; i++) {
            var low = (i >= range) ? i - range : 0,
                high = (i + range <= b.length) ? (i + range) : (b.length - 1);

            for (var j = low; j <= high; j++) {
                if (aMatches[i] !== true && bMatches[j] !== true && a[i] === b[j]) {
                    ++m;
                    aMatches[i] = bMatches[j] = true;
                    break;
                }
            }
        }

        // Exit early if no matches were found.
        if (m === 0) {
            return 0;
        }
        var n_trans ;
        // Count the transpositions.
        var k = n_trans = 0;

        for (i = 0; i < a.length; i++) {
            if (aMatches[i] === true) {
                for (j = k; j < b.length; j++) {
                    if (bMatches[j] === true) {
                        k = j + 1;
                        break;
                    }
                }

                if (a[i] !== b[j]) {
                    ++n_trans;
                }
            }
        }

        var weight = (m / a.length + m / b.length + (m - (n_trans / 2)) / m) / 3,
            l = 0,
            p = 0.1;

        if (weight > 0.7) {
            while (a[l] === b[l] && l < 4) {
                ++l;
            }

            weight = weight + l * p * (1 - weight);
        }

        return weight *100;

    },
    cosine: function (a, b) {

        function termFreqMap(str) {
            var words = str.split(' ');
            var termFreq = {};
            words.forEach(function (w) {
                termFreq[w] = (termFreq[w] || 0) + 1;
            });
            return termFreq;
        }

        function addKeysToDict(map, dict) {
            for (var key in map) {
                dict[key] = true;
            }
        }

        function termFreqMapToVector(map, dict) {
            var termFreqVector = [];
            for (var term in dict) {
                termFreqVector.push(map[term] || 0);
            }
            return termFreqVector;
        }

        function vecDotProduct(vecA, vecB) {
            var product = 0;
            for (var i = 0; i < vecA.length; i++) {
                product += vecA[i] * vecB[i];
            }
            return product;
        }

        function vecMagnitude(vec) {
            var sum = 0;
            for (var i = 0; i < vec.length; i++) {
                sum += vec[i] * vec[i];
            }
            return Math.sqrt(sum);
        }

        function cosineSimilarity(vecA, vecB) {
            return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
        }

        var termFreqA = termFreqMap(a);
        var termFreqB = termFreqMap(b);

        var dict = {};
        addKeysToDict(termFreqA, dict);
        addKeysToDict(termFreqB, dict);

        var termFreqVecA = termFreqMapToVector(termFreqA, dict);
        var termFreqVecB = termFreqMapToVector(termFreqB, dict);

        return cosineSimilarity(termFreqVecA, termFreqVecB);


    },
    levenshtein: function (a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        var matrix = [];

        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        //return matrix[b.length][a.length];

        return  100 - 100 * matrix[b.length][a.length] / Math.max(a.length, b.length)
    }
};
/**
 * Searches for similarities between strings
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = compareStrings;
