"use strict";
// https://github.com/Zazama/node-id3/blob/master/index.js
Object.defineProperty(exports, "__esModule", { value: true });
const iconv = require("iconv-lite");
exports.mp3Buffer = () => {
    const toStr = String.fromCharCode;
    const readBytesToUTF8 = (bytes, maxToRead) => {
        if (maxToRead == null || maxToRead < 0) {
            maxToRead = bytes.length;
        }
        else {
            maxToRead = Math.min(maxToRead, bytes.length);
        }
        let index = 0;
        console.log(16, bytes[0], bytes[1], bytes[2]);
        if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
            index = 3;
        }
        const arr = [];
        // Continue to insert string to arr until processed bytes' length reach max.
        for (let i = 0; index < maxToRead; i++) {
            const byte1 = bytes[index++];
            let byte2;
            let byte3;
            let byte4;
            let codepoint;
            console.log(29, byte1);
            // End flag.
            if (byte1 === 0x00) {
                console.log('32');
                break;
            }
            // ASCII
            else if (byte1 < 0x80) {
                arr[i] = toStr(byte1);
            }
            // Check 110yyyyy（C0-DF) 10zzzzzz(80-BF）--> 000080 - 0007FF
            // Because C0/C1 is invalid (RFC 3629), begin with C2.
            else if (byte1 >= 0xC2 && byte1 < 0xE0) {
                byte2 = bytes[index++];
                arr[i] = toStr(((byte1 & 0x1F) << 6) + (byte2 & 0x3F));
            }
            // Check 1110xxxx(E0-EF) 10yyyyyy 10zzzzzz --> 000800 - 00D7FF 00E000 - 00FFFF
            else if (byte1 >= 0xE0 && byte1 < 0xF0) {
                byte2 = bytes[index++];
                byte3 = bytes[index++];
                arr[i] = toStr(((byte1 & 0x0F) << 12) + ((byte2 & 0x3F) << 6) + (byte3 & 0x3F));
            }
            // Check 11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz
            // --> 010000 - 10FFFF
            // RFC 3629 makes F5, F6, F7 invalid.
            else if (byte1 >= 0xF0 && byte1 < 0xF5) {
                byte2 = bytes[index++];
                byte3 = bytes[index++];
                byte4 = bytes[index++];
                // See <https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae>
                codepoint = ((byte1 & 0x07) << 18) +
                    ((byte2 & 0x3F) << 12) +
                    ((byte3 & 0x3F) << 6) +
                    (byte4 & 0x3F) - 0x10000;
                // Invoke String.fromCharCode(H, L) to get correct char.
                arr[i] = toStr((codepoint >> 10) + 0xD800, (codepoint & 0x3FF) + 0xDC00);
            }
        }
        console.log(arr);
        return arr.join('');
    };
    return {
        read: (buffer) => {
            let tags = readBytesToUTF8(buffer);
            console.log(76, tags);
        },
    };
};
