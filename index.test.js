const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {

    {
        const FilePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(FilePath);

        await rejects(result, rejection);
    }

    {
        const FilePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(FilePath);

        await rejects(result, rejection);
    }

    {
        const filePath = './mocks/threeItems-valid.csv';
        Date.prototype.getFullYear = () => 2020;

        const result = await File.csvToJson(filePath);

        const expected = [
            {
                "name": "Joao Mangueira",
                "id": 123,
                "profession": "Javascript Developer",
                "birthDay": 1987
            },
            {
                "name": "Priscila Sousa",
                "id": 124,
                "profession": "PHP Developer Jr",
                "birthDay": 1988
            },
            {
                "name": "Paulo Silva",
                "id": 125,
                "profession": "Java Developer",
                "birthDay": 1991
            }
        ];

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})();


