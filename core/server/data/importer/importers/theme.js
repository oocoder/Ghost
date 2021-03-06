var Promise = require('bluebird'),
    storage = require('../../../storage'),
    ThemeImporter;

ThemeImporter = {
    type: 'theme',
    preProcess: function (importData) {
        importData.preProcessedByTheme = true;
        return importData;
    },
    doImport: function (importData) {
        var store = storage.getStorage();

        return Promise.map(importData, function (file) {
            return store.save(file, file.targetDir).then(function (result) {
                return {originalPath: file.originalPath, newPath: file.newPath, stored: result};
            });
        });
    }
};

module.exports = ThemeImporter;
