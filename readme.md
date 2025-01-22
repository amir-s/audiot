# AUDIOT

Simple wrapper around `ffmpeg` to combine and merge audio clips.
[![npm version](https://badge.fury.io/js/audiot.svg)](https://badge.fury.io/js/audiot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install audiot --save
```

## Usage

```js
import { compile } from 'audiot';
import type { Timeline } from 'audiot';

const timeline: Timeline = [
  { file: '1.mp3', start: 1000, speed: 1 },
  { file: '2.mp3', start: 6000, speed: 0.75 },
];

const {stdout, stderr} = await compile(timeline, 'output.mp3');
```

The `start` property is the time in milliseconds to start the audio clip (default to `0`). The `speed` property is the speed of the audio clip (default to `1`). A speed of `1` is normal speed, `0.5` is half speed, and `2` is double speed etc.

The `compile` function will merge the audio clips in the timeline and save it to the output file. The returned promise contains `stdout` and `stderr` from the `ffmpeg` process.
