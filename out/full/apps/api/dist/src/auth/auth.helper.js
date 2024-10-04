"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areArraysOverlapping = void 0;
const areArraysOverlapping = (first, second) => {
    return first.some((f) => second.includes(f));
};
exports.areArraysOverlapping = areArraysOverlapping;
//# sourceMappingURL=auth.helper.js.map