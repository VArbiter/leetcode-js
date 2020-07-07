/*
4. 寻找两个正序数组的中位数

    给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
    请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
    你可以假设 nums1 和 nums2 不会同时为空。

示例 1:
    nums1 = [1, 3]
    nums2 = [2]

    则中位数是 2.0

示例 2:
    nums1 = [1, 2]
    nums2 = [3, 4]

    则中位数是 (2 + 3)/2 = 2.5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

// 比较难 .
// 官方建议 , 带 log 的一般用二分法比较好 .

// 但是此题我最开始想到的是双指针 ,
// 实现后发现 , 官方的验证只是对结果 , 并没有对运算时间 😂😂😂

// ###########################################################
// 时间复杂度 为题目要求 O(log(m + n))
// 采用了二分法 . (但是为何执行时间仍然比双指针要长?)
// 空间复杂度 O(1) , 因为是递归 , 所以主要是在堆栈上 .
var findMedianSortedArrays4 = function(nums1 , nums2) {

    // 交换 , 将较小的作为 nums1
    // 即为保证 , 若存在空数组 , 那么一定是 nums1
    if (nums1.length < nums2.length) {
        let t = nums1;
        nums1 = nums2;
        nums2 = t;
    }

    let l1 = nums1.length;
    let l2 = nums2.length;

    // 因为 最终下标 end 是不会变化的 ,
    // 所以这里可以写为固定值 .
    // nums1 , nums2 最后元素的下标
    let e1 = l1 - 1 ,
        e2 = l2 - 1 ;

    // 起始坐标不能 使用 类似 e1 , e2 定义 ,
    // 因为是递归调用 ,
    // 递归栈
    // 出栈时 , 第 n - 1 次递归 , 依赖 第 n 次的值

    // 其实是 查询下标为 k 小的数
    // k 是第几小 , 下标是 k_idx = (k - 1);
    // 中位数是 k 小数的特殊情况
    var k_func = (nums1, p1, nums2, p2, k_idx) => {

        // l1 , l2 是比较过后 ,
        // 去除数组中不需要的元素后 , 剩余的部分长度
        let l1 = e1 - p1 + 1,
            l2 = e2 - p2 + 1;

        if (l2 == 0) return nums1[p1 + k_idx];

        // 这里这个判断 , 因为在 两数组 长度相等的时候 , 都是舍弃 nums1 中的元素
        // 保证 nums1 不会在之后的比较中产生 undefined
        if (l1 == 0) return nums2[p2 + k_idx];

        if (k_idx <= 0) return Math.min(nums1[p1], nums2[p2]);

        // 这里 Math.min(l1, parseInt(k / 2)) - 1
        // 其实就是 k / 2 - 1

        // k / 2 - 1
        // 表示每次比较后
        // 要抛弃的 数据长度
        // 因为 K 代表的是 第 k 小数 (这里是中位数) 下标
        // 假设 每次分割 ,
        // nums2[k/2] < nums1[k/2]
        // 那么 nums2中 最多只有 k / 2 - 1 个 比 nums1[k/2] 小
        // nums1中 最多只有 k / 2 - 1 个 比 nums1[k/2] 小
        // 所以在合并后的总长度来说 , 共有 (k / 2 - 1) * 2 = k - 2 个数比 nums1[k/2] 小
        // 所以 若 k - 2 仅仅跟在在 nums1[k/2] 之前 ,
        // 则代表 nums1[k/2] 是 第 k-1 小的数 , 仅仅与 k 相邻
        let k = k_idx + 1;
        let idx1 = p1 + Math.min(l1, parseInt(k / 2)) - 1;
        let idx2 = p2 + Math.min(l2, parseInt(k / 2)) - 1;

        // 除非 较小的数组中的元素 大于 较大数组中的
        // 均舍弃掉较小数组中的元素
        // 两数组 长度相等的情况 , 默认舍弃 nums1 中的数据
        if (nums1[idx1] <= nums2[idx2]) {

            // 去掉 此次比较中 ,
            // 比较小的数组中的下标 0 ~ (k - 1) 值 (k - 1 为坐标)
            // 游标并 向后移动一位
            // 为下次二分查找做准备

            k_idx = k_idx - (idx1 - p1) - 1;
            p1 = idx1 + 1;
        } else {
            k_idx = k_idx - (idx2 - p2) - 1;
            p2 = idx2 + 1;
        }

        return k_func(nums1, p1 , nums2, p2, k_idx);
    }

    let res = k_func(nums1, 0, nums2, 0, parseInt((l1 + l2 + 1) / 2) - 1);
    if ((l1 + l2) % 2 == 0) {
        // 是偶数
        return (res
                + k_func(nums1, 0, nums2, 0, parseInt((l1 + l2 + 2) / 2) - 1))
                * 0.5;
    }
    // 奇数
    return res;
// 结果
// 用例 : 2085 / 2085
// 状态：通过
// 执行用时：140 ms
// 内存消耗：40.3 MB

// 内存小了点 , 时间竟然比双指针还多 ... 说好了不是 O(log(m+n)) 么
}

// ###########################################################
// 采用双指针法 , 第 88 题方法变种
// 时间复杂度达不到 O(log(m+n)) , 是 O((m+n)/2 + 1);
// m , n 是数组长度
// 空间复杂度 , 因为没有开辟新的空间 , 所以是 O(1)
var findMedianSortedArrays1 = function(nums1, nums2) {
    // 整体思路是 , 因为是有序数组
    // 所以遍历只需要 执行 (m + n) / 2 + 1
    // 即为 p1 p2 的移动次数总和满足 (m + n) / 2 + 1 即可

    let l1 = nums1.length,
        l2 = nums2.length;
    let p1 = 0, // 定义 指向 nums1 和 nums2 的指针
        p2 = 0;

    // 无论是奇数和偶数 , 都需要循环 (l1+l2) / 2 + 1 次
    // 奇数情况 , (l1+l2) / 2 + 1 的值即为中位数
    // 偶数情况 , (l1+l2) / 2 的值 和 (l1+l2) / 2 + 1 的 平均值为 中位数
    let len = parseInt((l1 + l2) / 2) + 1;

    // 用于保存上一次的循环结果
    // 定义 nums1 和 nums2 的初始值 为 空 (避免 测试用例中负数的影响)
    // 这是为了防止 , 指针走空后停止 (两个指针指向两个数组 , 无法统一) ,
    // 结果错误的情况
    let v1 = 0, // 旧值
        v2 = 0; // 新值

    for (let i = 0 ; i < len ; i ++) {
        v1 = v2 ; // 重置
        // 不越界

        // 这里该怎么写判断呢 ? ... 肯定有更简单的 ...
        // 我这线性思维 ...
        if (p1 < l1) {
            if (p2 < l2) {
                if (nums1[p1] < nums2[p2]) {
                    v2 = nums1[p1++];
                } else {
                    v2 = nums2[p2++];
                }
            } else v2 = nums1[p1++];
        } else if (p2 < l2) {
            v2 = nums2[p2++];
        } else break;
    }

    // 判断是否是奇数个
    return (l1 + l2) % 2 == 1 ? v2 : (v1 + v2) / 2 ;

// 结果
// 用例 2085 / 2085
// 执行用时：116 ms
// 内存消耗：40.6 MB

// 笑哭 😂 ... 就这时间还显示了超过 97.24% 的人 ...
// 但是空间就太嗷嗷叫了 , 只有 6.25% .
};


let nums1 = [1, 3];
let nums2 = [2];
// 2.0

let nums3 = [1, 2];
let nums4 = [3, 4];
// 2.5

let nums5 = [2];
let nums6 = [];
// 2

let nums7 = [3];
let nums8 = [-2,-1];
// -1

let nums9 = [1, 2];
let nums10 = [3, 4, 5, 6];
// 3.5

let nums11 = [1, 2, 3, 4, 5, 6];
let nums12 = [3, 3];
// 3

let nums13 = [1, 2];
let nums14 = [3, 3];
// 2.5

let nums15 = [3, 3];
let nums16 = [3, 3];

let res1 = findMedianSortedArrays1(nums1 , nums2);
let res2 = findMedianSortedArrays1(nums3 , nums4);
let res3 = findMedianSortedArrays1(nums5 , nums6);
console.log(res1 , res2 , res3);

console.log("###########################");

let res4 = findMedianSortedArrays4(nums1 , nums2);
console.log(res4);
let res5 = findMedianSortedArrays4(nums3 , nums4);
console.log(res5);
let res6 = findMedianSortedArrays4(nums5 , nums6);
console.log(res6);
let res7 = findMedianSortedArrays4(nums7 , nums8);
console.log(res7);
let res8 = findMedianSortedArrays4(nums9 , nums10);
console.log(res8);
let res9 = findMedianSortedArrays4(nums11 , nums12);
console.log(res9);
let res10 = findMedianSortedArrays4(nums13 , nums14);
console.log(res10);
let res11 = findMedianSortedArrays4(nums15 , nums16);
console.log(res11);
