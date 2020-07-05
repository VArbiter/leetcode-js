/*
88. 合并两个有序数组

    给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:

    初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
    你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 
示例:

    输入:
    nums1 = [1,2,3,0,0,0], m = 3
    nums2 = [2,5,6],       n = 3

    输出: [1,2,2,3,5,6]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

// 为了做 第 4 题
// 做第 4 题之前 , 需要先掌握 88 题解法 .
// 采用 双指针 , 从后往前合并 .

var merge = function(nums1, m, nums2, n) {
    let pointer_1 = m - 1 ; // 指向 nums1 末尾的指针
    let pointer_2 = n - 1; // 指向 nums2 末尾的指针

    // 最开始移动的指针在合并后的长度位置 (在 nums1 中)
    // 因为 nums1 的空间大于等于 m + n
    let point_mov = m + n - 1;

    while (point_mov != pointer_1) { // 相等代表结束
        // nums1 有 有效值 (pointer_1 >=0)
        if (pointer_1 >=0 && nums1[pointer_1] > nums2[pointer_2]) {
            nums1[point_mov] = nums1[pointer_1];
            --pointer_1;
        } else {
            nums1[point_mov] = nums2[pointer_2];
            --pointer_2;
        }
        --point_mov;

        // 或者
        // nums1[point_mov--] = (pointer_1 >=0
        //                     && nums1[pointer_1] > nums2[pointer_2])
        //                     ? nums1[pointer_1--]
        //                     : nums2[pointer_2--]
    }

    return nums1;

// 结果
// 用例 59 / 59
// 状态：通过
// 执行用时：80 ms
// 内存消耗：32.4 MB
// 还不如暴力解法 = =
};

// 暴力解法就是 两行 , 合并 , 排序没了 .
// 时间复杂度 O((m+n)log(m+n))
var merge_force = function(nums1, m, nums2, n) {
    // 这种方式浪费了多一个 nums2 的空间
    // 空间复杂度 O(n)
    // nums1.push.apply(nums1 , nums2);
    // return nums1.sort((v1,v2) => v1 - v2);

    // 空间复杂度 O(1)
    for (let i = m , j = 0; i < m + n ; i++ , j++) nums1[i] = nums2[j];
    return nums1.sort((v1,v2) => v1 - v2);

// 结果
// 用例: 59 / 59
// 状态：通过
// 执行用时：72 ms
// 内存消耗：33.2 MB
};

let nums1 = [4,5,6,0,0,0] , m = 3;
let nums2 = [1,2,3] , n = 3;

let res1 = merge(nums1,m,nums2,n);
console.log(res1.length , res1);

let nums3 = [2,0] , m1 = 1;
let nums4 = [1] , n1 = 1;

let res2 = merge(nums3,m1,nums4,n1);
console.log(res2.length , res2);

let nums5 = [0] , m2 = 0;
let nums6 = [1] , n2 = 1;

let res3 = merge(nums5,m2,nums6,n2);
console.log(res3.length , res3);

let nums7 = [1,2,3,0,0,0] , m3 = 3;
let nums8 = [2,5,6] , n3 = 3;

let res4 = merge_force(nums7,m3,nums8,n3);
console.log(res4.length , res4);
