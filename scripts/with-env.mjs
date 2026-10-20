import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const separatorIndex = args.indexOf('--');

if (separatorIndex === -1) {
  console.error('Użycie: node scripts/with-env.mjs VAR1=VAL1 VAR2=VAL2 -- command arg1 arg2');
  process.exit(1);
}

const envPairs = args.slice(0, separatorIndex);
const cmdArgs = args.slice(separatorIndex + 1);

const childEnv = { ...process.env };
for (const pair of envPairs) {
  const eqIdx = pair.indexOf('=');
  if (eqIdx !== -1) {
    const k = pair.slice(0, eqIdx);
    const v = pair.slice(eqIdx + 1);
    childEnv[k] = v;
  }
}

const [cmd, ...rest] = cmdArgs;
const child = spawn(cmd, rest, {
  stdio: 'inherit',
  shell: true,
  env: childEnv,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
