nums1 = [1,2,3,0,0,0,0,0];
m = 3;

nums2 = [1,2,5,6,7];
n = 5;

nums3 = [0];
m2 = 0;

nums4 = [1];
n2 = 1;

var merge = function(nums1, m, nums2, n) {
  // if(m === 0){
  //   nums1 = nums2;
  // }
  for (let i = m + n - 1; i > 0; i--){
    if (nums1[m - 1] >= nums2[n - 1]){
      nums1[m + n - 1] = nums1[m - 1];
      m--;
    }else{
      nums1[m + n - 1] = nums2[n - 1];
      n--;
    }
  }
  return nums1;
};

console.log(merge(nums1,m,nums2,n).toString());
console.log(merge(nums3,m2,nums4,n2).toString());
console.log(Array.isArray(merge(nums3,m2,nums4,n2)));