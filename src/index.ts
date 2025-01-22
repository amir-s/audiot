import { exec } from 'node:child_process';

export interface Section {
  file: string;
  start?: number;
  speed?: number;
}

export type Timeline = Section[];

export const compile = async (timeline: Timeline, output: string) => {
  let command = 'ffmpeg ';
  let filters = '';

  timeline.forEach((section, index) => {
    const input = `-i "${section.file}"`;
    const atempo = `atempo=${section.speed || 1}`;
    const asetpts = `asetpts=PTS-STARTPTS`;
    const adelay = `adelay=${section.start || 0}ms`;
    const filter = `[${index}:a]${atempo},${asetpts},${adelay}[a${index}];`;
    command += input + ' ';
    filters += filter + ' ';
  });
  filters += `${timeline
    .map((_, index) => `[a${index}]`)
    .join('')}amix=inputs=${timeline.length}:duration=longest[out]`;
  command += `-filter_complex "${filters}" -map "[out]" ${output}`;

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};
