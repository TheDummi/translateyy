/** @format */

import translate, { languages } from '../dist/main.js';
import init from './init.js';

console.log(await translate(init, { target: 'ru' }), await languages('french'));
