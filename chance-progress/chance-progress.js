const _ = require('underscore');
const Chance = require('chance');
const chance = new Chance();

module.exports = (text) => {
    return new Promise((resolve, reject) => {
        let array;
        if ((text.match(/[,\s\n]/) || []).length === 0) {
            array = [text];
        } else if ((text.match(/\n/g) || []).length >= 1) {
            array = text.split(/\n/g).map(x => x.trim());
        } else if ((text.match(/,/g) || []).length >= 1) {
            array = text.split(/,/g).map(x => x.trim());
        } else if ((text.match(/\s/g) || []).length >= 1) {
            array = text.split(/\s/g).map(x => x.trim());
        }

        // 중복 제거
        array = _.uniq(array);

        // 테이블 생성
        let table = [];
        for (const item of array) {
            const num = chance.d100();
            const progress = `[${'='.repeat(parseInt(num / 10))}>${' '.repeat(10 - parseInt(num / 10))}]`;
            table.push({item, num, progress});
        }

        // 역순 정렬
        table = table.sort((item1, item2) => {
            return item2.num - item1.num;
        });

        if (table !== []) {
            resolve(table);
        } else {
            reject(new Error('앗! 뭔가 잘못된 것 같아 ㅠ_ㅠ'));
        }
    });
};

if (require.main === module) {
    require('./chance')('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
}
