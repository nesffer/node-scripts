const request = require('request-promise');

module.exports = (expr) => {
    return new Promise((resolve, reject) => {
        const url = 'http://api.mathjs.org/v1/?precision=7&expr=' + encodeURIComponent(expr);
        request(url)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(new Error(error.message));
        });
    });
};

if (require.main === module) {
    require('./calculator')('5.08 cm to inch')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
}
