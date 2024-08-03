"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entry = void 0;
const fileSystem_1 = require("./fileSystem");
const entry = (token, option) => {
    (0, fileSystem_1.createStoreDirectories)();
    (0, fileSystem_1.saveApiToken)(token);
    console.log("Configuration saved succesfully!");
};
exports.entry = entry;
