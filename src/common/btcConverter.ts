export function FromSatoshiToBtc(satoshi: number): number {
  return satoshi * 0.00000001;
}

export function FromBtcToSatoshi(btc: number): number {
  return btc * 100000000;
}
