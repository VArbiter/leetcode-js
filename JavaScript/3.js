/*
3. 无重复字符的最长子串

    给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。


示例 1:
    输入: "abcabcbb"
        输出: 3
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
    输入: "bbbbb"
        输出: 1
    解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
    输入: "pwwkew"
        输出: 3
    解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
        请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/*
时间复杂度
    O(n) , n 是字符串长度
空间复杂度
    按照官方说法 , 本题没特别指定 , 这里 obj存储的 认为 是 ASCII 码集合 ,
    所以空间复杂度最大为 O(128)
*/

// 官方解法用了循环嵌套
// 个人认为一次循环足以 ,
// 因为要获得的是子字符串的长度 , 并不是子字符串
// 本质上还是使用了 "浮动窗口" 解法
var lengthOfLongestSubstring = function(s) {
    // 向右移动 的 指针 (每次均为出现在 obj 中的 重复字符的 下标)
    let k = -1;
    let res = 0;
    let hash_map = {}; // 用 obj 模拟 哈希 , 或者直接用 set 也可以

    for (let i = 0 ; i < s.length ; i ++) {
        let c = s.charAt(i);
        // 字符 c 存在于 obj  ,
        // 且上次出现的下标大于当前长度的起始下标
        if (hash_map[c] != undefined && hash_map[c] > k) {
            // 重置 浮动下标 (重置到上一次出现重复字符的下标)
            k = hash_map[c];
            // 删除左边 第一次 重复的字符 ,
            // 其实 删不删都行 , 注释了少一次执行运算 , 费一点空间 ?
            // delete hash_map[c];
            hash_map[c] = i;

            // console.log("++" , "k", k , "i" , i , "res" , res , hash_map);
        } else {
            hash_map[c] = i;

            // 上一个不重复字符串长度 和 当前 不重复字符串长度比较
            // (计数 i 与 浮动下标 k 之间的差值 , 即为当前不重复子字符串长度)
            res = Math.max(res , i - k);

            // 通过 log 输出可以更清楚的明白
            // console.log("--" , "k", k , "i" , i , "res" , res , hash_map);
        }
    }
    return res;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));

// 结果
// 用例 987 / 987
// 状态：通过
// 执行用时：132 ms
// 内存消耗：42.7 MB

// 为啥效率略低 ???
