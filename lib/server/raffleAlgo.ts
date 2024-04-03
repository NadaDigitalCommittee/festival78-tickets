export function solveDistribution(distribution: number[], capacity: number) {
  const arr1 = solveDistribution1(distribution, capacity);
  if (arr1.length !== 0) {
    return arr1;
  }
  const arr2_ = solveDistribution2(distribution, capacity);
  const arr2 = arr2_[Math.floor(Math.random() * arr2_.length)];
  return arr2;
}

/**
 運ゲーアルゴリズム
 */
function solveDistribution1(
  distribution: number[],
  capacity: number,
  count: number = 1000000
) {
  const length = distribution.length;
  if (sumDistribution(distribution) <= capacity) {
    return distribution;
  }
  let count_ = 0;
  while (count_ < count) {
    let flag2 = false;
    const arr = soln(capacity, length);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > distribution[i]) {
        flag2 = true;
      }
    }
    count_++;
    if (flag2) continue;
    return arr;
  }

  //差で考える

  const sumD = sumDistribution(distribution);
  count_ = 0;
  while (count_ < count) {
    let flag = false;
    const arr = soln(sumD - capacity, length).map(
      (v, i) => distribution[i] - v
    );
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < 0) {
        flag = true;
      }
    }
    count_++;
    if (flag) continue;
    return arr;
  }
  return [];
}

function soln(n: number, length: number): number[] {
  const groups: number[] = [];
  let remaining = n;
  while (remaining > 0) {
    const size = Math.min(Math.floor(Math.random() * length) + 1, remaining);
    groups.push(size);
    remaining -= size;
  }
  return Array(length)
    .fill(0)
    .map((_, i) => groups.filter((v) => v === i + 1).length);
}

function sumDistribution(distribution: number[]) {
  let sum = 0;
  for (let i = 0; i < distribution.length; i++) {
    sum += distribution[i] * (i + 1);
  }
  return sum;
}

/**
 全探索アルゴリズム
 */
function solveDistribution2(
  distribution: number[],
  capacity: number,
  count: number = 1000000
) {
  let count_ = 0;
  let C: number[][] = [];

  function generateRecursive(index: number, currentArray: number[]) {
    if (count_ > count) {
      return;
    }
    if (index === distribution.length) {
      let sum = 0;
      for (let i = 0; i < currentArray.length; i++) {
        sum += currentArray[i] * (i + 1);
      }
      if (sum == capacity) {
        C.push(currentArray.slice());
      }
      count_++;
      return;
    }
    count_++;

    for (let i = 0; i <= distribution[index]; i++) {
      currentArray.push(i);
      generateRecursive(index + 1, currentArray);
      currentArray.pop();
    }
  }

  generateRecursive(0, []);

  return C;
}
