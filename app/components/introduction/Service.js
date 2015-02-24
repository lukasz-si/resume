/**
 * Created by meep_sitl on 11/02/15.
 */
define([
    'angular',
    'jquery',
    'components/introduction/module'
], function (ng, $, module) {
    'use strict';

    module.factory('OnImageLoadService', ['$q', function ($q) {

        var deferred = $q.defer();

        return {
            getPromise: function () {
                return deferred.promise;
            },
            getDefer: function () {
                return deferred;
            }
        };
    }]);

    module.factory('LettersService', ['$interval', function ($interval) {

        var aCharCode = 'A'.charCodeAt(0),
            zCharCode = 'Z'.charCodeAt(0),
            azDiff = zCharCode - aCharCode + 1;

        return {
            /**
             * Generates random characters based on 'data' object
             * @param data
             * @returns {Array}
             */
            generateRandomLetters: function (data) {
                var rows = data.rows,
                    rowsLength = rows.length,
                    columnsNum = data.columnsNum || 20,
                    scopeRows = [],
                    i, j, row, offset, cell, text, textLength, className, char;

                if (!ng.isArray(rows) || isNaN(columnsNum)) {
                    return [];
                }

                // rows loop
                for (i = 0; i < rowsLength; i++) {
                    row = {};
                    row.cells = [];
                    text = rows[i].text;
                    textLength = text.length;
                    offset = rows[i].offset;
                    className = rows[i].class;

                    // cells loop
                    for (j = 0; j < columnsNum; j++) {
                        cell = {};
                        cell.random = this.getRandomLetter();

                        if (j < offset || j >= offset + textLength) {
                            cell.char = this.getRandomLetter();
                        }
                        else {
                            char = text.charAt(j - offset);

                            // checks if there is a ' ', if yes random character is generated
                            if (char === ' ') {
                                cell.char = this.getRandomLetter();
                            }
                            else {
                                cell.char = char;
                                cell.class = className;
                            }
                        }
                        row.cells.push(cell);
                    }
                    scopeRows.push(row);
                }

                return scopeRows;
            },
            /**
             * Sets interval for generated letters
             * @param scopeRows
             * @returns {boolean} false if data is empty
             */
            setInterval: function (scopeRows) {
                var that = this, promise;

                if (scopeRows.length === 0) {
                    return false;
                }

                promise = $interval(function () {
                    that.incrementLetters(scopeRows);
                }, 200, azDiff);

                promise.then(function () {
                    that.setFinalLetters(scopeRows);
                });
            },
            /**
             * Increments all letters (starts from 'A') until they have proper characters
             * @param rows
             */
            incrementLetters: function (rows) {
                var i, j, randomCharCode, randomChar, charCode;

                for (i = rows.length; i--;) {
                    for (j = rows[i].cells.length; j--;) {
                        randomChar = rows[i].cells[j].random;
                        randomCharCode = randomChar.charCodeAt(0);
                        charCode = rows[i].cells[j].char.charCodeAt(0);

                        // increment character if it is less than final one
                        if (randomCharCode < charCode) {
                            randomCharCode++;
                            rows[i].cells[j].random = String.fromCharCode(randomCharCode);
                        }
                        // decrement character if it is greater than final one
                        else if (randomCharCode > charCode) {
                            randomCharCode--;
                            rows[i].cells[j].random = String.fromCharCode(randomCharCode);
                        }
                        // do nothing when they are equal
                    }
                }
            },
            /**
             * Sets final characters in case a character is out of range 'A' - 'Z'
             * @param rows
             */
            setFinalLetters: function (rows) {
                var i, j;

                for (i = rows.length; i--;) {
                    for (j = rows[i].cells.length; j--;) {
                        rows[i].cells[j].random = rows[i].cells[j].char;
                    }
                }
            },
            /**
             * Gets random letter - from 'A' to 'Z'
             * @returns {string}
             */
            getRandomLetter: function () {
                return String.fromCharCode(Math.floor(Math.random() * azDiff) + aCharCode);
            }


        };
    }]);

    return module;
});

