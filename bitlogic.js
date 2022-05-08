function XOR(lo, hi, k) {
  const xorvalue = [];

  for (let i = lo; i < hi; i++) {
    //looping through the range
    let j = i + 1;
    for (; j <= hi; j++) {
      xorvalue.push((i | j) & (~i | ~j)); //pushing the xor value in an array
    }
  }
  xorvalue.sort(); //sorting the array
  for (let i = xorvalue.length - 1; i >= 0; i--) {
    if (xorvalue[i] <= k) {
      //checking the xor value with the k
      return xorvalue[i];
    }
  }
}
const value = XOR(1, 3, 3);
console.log(value);
