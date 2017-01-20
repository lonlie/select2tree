# select2tree
extend select2 for treeview. 扩展select2，使它可以树形展示，可以缩放。

<a href="http://runjs.cn/detail/bezljwvl" target="_blank">See demo</a>

# 使用方法
1、与select2用法一致，只是在使用时$('select').select2()变成了$('select').select2tree()。
2、option标签中指定parent属性即可实现树形展示，支持数据源乱序，展示下拉选项时将自动排序。
