import { print } from "./print.js";
import * as fs from "node:fs";
fs.writeFile("example.txt","Hello","utf-8",() => {
    fs.readFile("example.txt","utf-8",(error,data) => {
        console.log(data);
    })
})