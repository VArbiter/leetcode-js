/*
2. 两数相加
    给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

    如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

    您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

    输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
    输出：7 -> 0 -> 8
    原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

// 单链表定义
function ListNode(val) {
   this.val = val;
   this.next = null;
}

/*
时间复杂度
    O(max(m,n)) , 这里 m,n 代表 l1, l2 的长度 . 最多重复 max(m,n) 次
空间复杂度
    O(max(m,n)) , 新列表的长度最多为 max(m,n) + 1
*/

// 要考虑 "极限" 长度问题
// 若要使用 极限 长度 ,
// 可以使用 "字符串"
// 若非极限长度
// 则使用 int 64 即可
// 题目中说的是 "数字" , 则使用 int 64
var addTwoNumbers = function(l1, l2) {
    // 官方思路 , 较长的链表长度为准 ,
    // 短链表位不足则补 0
    // 考虑进位 . 若末端链表结果值为 1 , 则添加新的节点到 cur_nd
    var pre_nd = new ListNode(0); // 为了保存指针头不至于丢失 , (单向链表)
    var cur_nd = pre_nd; // 哨兵

    // 进位值 , 低位到高位
    var flag_value = 0;
    while (l1 || l2) {
        let sum = (l1 ? l1.val : 0)
                + (l2 ? l2.val : 0)
                + flag_value; // 计算总值 (进位值)

        // 是否需要进位 , JS 的关系必须转换为整型 , 否则是默认的浮点型
        flag_value = parseInt(sum / 10) ;
        cur_nd.next = new ListNode(sum % 10); // 使用当前位 , 构建 新节点

        cur_nd = cur_nd.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    // 判断最后是否有进位
    if (flag_value != 0) cur_nd.next = new ListNode(flag_value);
    return pre_nd.next;
};

// 这个函数 只是为了构造测试用的参数
function params(num) {

    var p = new ListNode(num % 10); // 防止链表头丢失
    var t = p;

    num = parseInt(num / 10);
    while (num > 0) {
        t.next = new ListNode(num % 10);
        t = t.next;
        num = parseInt(num / 10);
    }
    return p;
}

let l1 = params(342);
let l2 = params(465);
let res = addTwoNumbers(l1 , l2);

while (res) {
    console.log(res.val);
    res = res.next;
}

// 结果
// 用例 1563 / 1563
// 执行用时：124 ms
// 内存消耗：41.8 MB
