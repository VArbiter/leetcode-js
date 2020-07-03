/*
1. 两数之和
    给定一个整数数组 nums 和一个目标值 target，
    请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:
    给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/*
 使用 obj (模拟哈希表) 解决
 时间复杂度 O(n) ,
    因为值便利了包含有 n 个元素的列表一次 , 在表中进行的每次查找只花费 O(1) 的时间
 空间件复杂度 O(n)
    所需要的额外空间取决于 模拟 哈希表 / 无序不重复集合 中储存的元素数量 , 该 obj 最多需要存储 n 个元素 .
 */

var twoSum = function (nums, target) {
    let k = {};
    for (let i = 0; i < nums.length; i++) {
        let t = target - nums[i];
        if (k[t.toString()] != undefined) {
            return [k[t.toString()] , i];
        }
        k[nums[i].toString()] = i;
    }
    return [];
};

twoSum([2,7,11,5] , 9);

// 结果
// 用例 29/29
// 执行用时：72 ms
// 内存消耗：36.8 MB (略大 , 是因为使用了 obj 模拟了哈希表)
