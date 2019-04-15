// eslint-disable-line import/no-extraneous-dependencies
import { FileBlob, BuildOptions } from '@now/build-utils/file-blob.js'
import OptiPng from 'optipng'
import pipe from 'multipipe'

export function analyze({ files, entrypoint }) {
  return files[entrypoint].digest
}

export async function build({ files, entrypoint }: BuildOptions) {
  const optimizer = new OptiPng(['-o9']);
  const stream = pipe(
    files[entrypoint].toStream(),
    optimizer,
  );
  const result = await FileBlob.fromStream({ stream });
  return { [entrypoint]: result };
}
