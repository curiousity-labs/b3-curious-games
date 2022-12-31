import { constants, utils } from 'ethers';

export function formatBytes4String(str: string) {
  // Get the bytes
  const bytes = utils.toUtf8Bytes(str);
  // Check we have room for null-termination
  if (bytes.length > 3) { throw new Error('bytes4 string must be less than 4 bytes'); }
  // Zero-pad (implicitly null-terminates)
  return utils.hexlify(utils.concat([bytes, constants.HashZero]).slice(0, 4));
}

export function formatMappedStrs(arr: string[][]) {
  return arr.map(loc => loc.map(str => formatBytes4String(str)))
}
