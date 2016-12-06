const request = require('request-promise');

/*
curl --request POST \
     --header 'Authorization: Token 12345678-c12b-4b3e-a517-6ce889723ebf' \
     --header 'Content-type: application/json' \
     --data '{"files": [{"name": "main.py", "content": "print(42)"}]}' \
     --url 'https://run.glot.io/languages/python/latest'
*/

module.exports = (name, language, content) => {
    return new Promise((resolve, reject) => {
        const url = `https://run.glot.io/languages/${language}/latest`;

        const body = {
            files: [{
                name,
                content
            }]
        };

        const options = {
            method: 'POST',
            url,
            encoding: 'UTF-8',
            headers: {
                'Authorization': 'Token 12345678-c12b-4b3e-a517-6ce889723ebf',
                'Content-Type': 'application/json'
            },
            body,
            json: true,
            timeout: 3000
        };

        request(options)
        .then(json => {
            if (json.stderr) {
                reject(new Error(json.stderr));
            } else if (json.stdout) {
                resolve(json.stdout);
            } else {
                reject(new Error('No output value.'));
            }
        })
        .catch(() => {
            reject(new Error('Error! Something is wrong.'));
        });
    });
};

if (require.main === module) {
    require('./glot')('main.js', 'javascript', 'console.log(42);')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
}
