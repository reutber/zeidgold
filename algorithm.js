
'use strict';

const _ = require('lodash');
const dal = require('./dal');
const stringSimilarity = require('string-similarity');

module.exports = {
    getDatesDifference(date1, date2) {
        const timeDiff = Math.abs(date1.getTime() - date2.getTime());
        const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDifference;
    },

    search(input) {
        let data = this.setMatchScore(input);
        data = _.orderBy(data, ['referenceMatch', 'amountMatch', 'dayDifference'], ['desc', 'desc', 'asc']);
        let count = 0;
        for (let index = 0; index < data.length; index++) {
            if (data[index].referenceMatch == 1 && data[index].amountMatch == 1) {
                count = 1;
                break;
            }

            if (data[index + 1]) {
                if (data[index].referenceMatch >= data[index + 1].referenceMatch) {
                    count++;
                    if (data[index].amountMatch <= data[index + 1].amountMatch) {
                        break;
                    }
                    if (data[index].amountMatch >= data[index + 1].amountMatch) {
                        if (data[index].dayDifference <= data[index + 1].dayDifference) {
                            break;
                        }
                    }
                }
            }
        }
        console.log(count);

        return count;
    },
    setMatchScore(input) {
        const dataSource = dal.getData();
        dataSource.forEach(element => {
            element.referenceMatch = stringSimilarity.compareTwoStrings(element.referenceId, input.payment_reference);
            //element.referenceMatchRRR = this.getMatch(element.referenceId, input.payment_reference);
            element.amountMatch = this.getNumberMatch(element.amount, input.amount);
            element.dayDifference = this.getDateMatch(element.dateOccurred, input.payment_date);
        });

        return dataSource;
    },

    getDateMatch(date1, date2) {
        const dayDiffrence = this.getDatesDifference(new Date(date1), new Date(date2));
        return dayDiffrence;
    },
    getNumberMatch(num1, num2) {
        let mathc = 0;
        if (num1 === num2) {
            mathc = 1;
        }
        if (num1 > num2) {
            mathc = num2 / num1;
        }
        if (num1 < num2) {
            mathc = num1 / num2;
        }
        return mathc;
    },
    getMatch(str1, str2) {
        const str1Arr = str1.split('');
        const str2Arr = str2.split('');
        let sum = 0;
        let match = 0;

        str1Arr.forEach((char, index) => {
            if (str2Arr[index]) {
                if (char === str2Arr[index]) {
                    match = (1 / str1Arr.length);
                    sum += match;
                } else {
                    match = 0;
                }
            }
        });


        return sum;
    }
}