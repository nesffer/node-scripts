const request = require('request-promise');

const url = 'http://hangang.dkserver.wo.tc';

module.exports = () => {
    return new Promise((resolve, reject) => {
        request(url)
        .then(body => {
            const data = JSON.parse(body);
            if (data.result === 'true') {
                resolve({time: data.time, temp: data.temp});
            } else {
                reject(new Error('404 Not Found'));
            }
        })
        .catch(error => {
            reject(new Error(error.message));
        });
    });
};

if (require.main === module) {
    require('./hangang')()
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
}
