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
            generateRandomLetters: function (data) {
                var rows = data.rows,
                    rowsLength = rows.length,
                    columnsNum = data.columnsNum || 20,
                    scopeRows = [],
                    i, j, row, offset, cell, text, textLength, className, randomInterval;

                if (!ng.isArray(rows) || isNaN(columnsNum)) {
                    return [];
                }

                for (i = 0; i < rowsLength; i++) {
                    row = {};
                    row.cells = [];
                    text = rows[i].text;
                    textLength = text.length;
                    offset = rows[i].offset;
                    className = rows[i].class;

                    for (j = 0; j < columnsNum; j++) {
                        cell = {};
                        cell.random = this.getRandomLetter();

                        if (j < offset || j >= offset + textLength) {
                            cell.char = this.getRandomLetter();
                        }
                        else {
                            cell.char = text.charAt(j - offset);
                            cell.class = className;
                        }
                        row.cells.push(cell);
                    }
                    scopeRows.push(row);
                }

                return scopeRows;
            },
            setInterval: function (scopeRows) {
                var that = this;

                if (scopeRows.length === 0) {
                    return false;
                }

                $interval(function () {
                    that.incrementLetters(scopeRows);
                }, 150, 100);
            },
            incrementLetters: function (rows) {
                var i, j, randomCharCode, randomChar, charCode;

                for (i = rows.length; i--;) {
                    for (j = rows[i].cells.length; j--;) {
                        randomChar = rows[i].cells[j].random;
                        randomCharCode = randomChar.charCodeAt(0);
                        charCode = rows[i].cells[j].char.charCodeAt(0);

                        if (randomCharCode < charCode) {
                            randomCharCode++;
                            rows[i].cells[j].random = String.fromCharCode(randomCharCode);
                        }
                        else if (randomCharCode > charCode) {
                            randomCharCode--;
                            rows[i].cells[j].random = String.fromCharCode(randomCharCode);
                        }
                    }
                }
            },
            getRandomLetter: function () {
                return String.fromCharCode(Math.floor(Math.random() * azDiff) + aCharCode);
            }


        };
    }]);

    return module;
});

