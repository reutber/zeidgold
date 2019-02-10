
'use strict';


const algorithm = require('./algorithm');
const dal = require('./dal');


const start = async () => {
    algorithm.search({ 'amount': 254, 'payment_reference': 'AZMTO158', 'payment_date': '2017-06-19' });
    algorithm.search({ 'amount': 100, 'payment_reference': 'AB12121 AB12122', 'payment_date': '2017-05-26' });
    algorithm.search({ 'amount': 313, 'payment_reference': 'AB1273', 'payment_date': '2018-01-13' });
    algorithm.search({ 'amount': 361, 'payment_reference': '29666779', 'payment_date': '2017-12-27' });
    algorithm.search({ 'amount': 281, 'payment_reference': '99998856', 'payment_date': '2017-08-27' });;
    algorithm.search({ 'amount': 134, 'payment_reference': 'AB12141 12451141414', 'payment_date': '2017-10-18' });

    algorithm.search({ 'amount': 97, 'payment_reference': '98925959', 'payment_date': '2017-07-04' });
    algorithm.search({ 'amount': 255, 'payment_reference': '0115511414', 'payment_date': '2017-10-01' });

}

start();