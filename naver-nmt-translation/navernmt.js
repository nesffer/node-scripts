const request = require('request-promise');

const url = 'http://labspace.naver.com/api/n2mt/translate';

exports.ko2en = (text) => {
    return new Promise((resolve, reject) => {
        if (text.length <= 200) {
            const options = {
                method: 'POST',
                url,
                encoding: 'UTF-8',
                form: {
                    'source': 'ko',
                    'target': 'en',
                    'text': text
                }
            };
            request(options)
            .then(body => {
                const json = JSON.parse(body);
                if (json.errorMessage) {
                    reject(new Error(json.errorMessage));
                } else {
                    resolve(json.message.result.translatedText);
                }
            })
            .catch(error => {
                reject(new Error(error.message));
            });
        } else {
            reject(new Error('텍스트가 너무 깁니다.'));
        }
    });
};

if (require.main === module) {
    require('./navernmt').ko2en('안녕 세상!')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
}

exports.en2ko = function (text, callback) {
    return new Promise((resolve, reject) => {
        if (text.length <= 200) {
            const options = {
                method: 'POST',
                url,
                encoding: 'UTF-8',
                form: {
                    'source': 'en',
                    'target': 'ko',
                    'text': text
                }
            };
            request(options)
            .then(body => {
                const json = JSON.parse(body);
                if (json.errorMessage) {
                    reject(new Error(json.errorMessage));
                } else {
                    resolve(json.message.result.translatedText);
                }
            })
            .catch(error => {
                reject(new Error(error.message));
            });
        } else {
            reject(new Error('텍스트가 너무 깁니다.'));
        }
    });
};

if (require.main === module) {
    require('./navernmt').en2ko('Hello World!')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
}
