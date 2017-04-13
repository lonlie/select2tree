# select2tree
extend select2 for treeview. 扩展select2，使它可以树形展示，可以缩放。

<a href="http://runjs.cn/detail/bezljwvl" target="_blank">See demo</a>

# 使用方法
* 与select2用法一致，只是在使用时$('select').select2()变成了$('select').select2tree()。
* option标签中指定parent属性即可实现树形展示，支持数据源乱序，展示下拉选项时将自动排序。


# select2tree (EN)
This is plugin for tree representation select2's dropdown. It allows any levels in hierarchy for ``<option>`` inside ``<select>``.

Parent option should be referenced in children via ``parent`` attribute. You should set it like parent's ``value`` attribute - ``parent="parent_value_attribute"``.

### Example

[Look at demo](http://runjs.cn/detail/bezljwvl)

This files are required for correct working:
```
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.6/select2-bootstrap.min.css" rel="stylesheet" />
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
<script src="select2tree.js"></script>
```

To initialize your widget use such code: 
```
  <select id="tree-select">
    <option value="root">Root</option>
    <option value="level11" parent="root">Level 1.1</option>
    <option value="level12" parent="root">Level 1.2</option>
    <option value="level21" parent="level12">Level 2.1</option>
    <option value="level22" parent="level12">Level 2.2</option>
    <option value="level13" parent="root">Level 1.3</option>
  </select>
  <script>
    $("#tree-select").select2tree();
  </script>
```

If you want to apply some values at the begining, use select2's event triggering:
```
  <script>
    $("#tree-select").val(["root", "level21"]).trigger('change');
  </script>  
```


# select2tree (RU)
Плагин для древовидного отображения выпадающего списка select2. Позволяет реализовать любой уровень вложенности для ``<option>`` в ``<select>``. 

Связывание дочернего ``<option>`` с родительским происходит через аттрибуты ``val`` и ``parent`` - у дочернего элемента должен быть указан ``parent="parent_value_attribute"``.

### Пример использования

[Посмотреть демо](http://runjs.cn/detail/bezljwvl)

Минимально необходимые файлы для работы плагина:

```
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.6/select2-bootstrap.min.css" rel="stylesheet" />
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
<script src="select2tree.js"></script>
```

Для инициализации виджета используйте следующий код: 

```
  <select id="tree-select">
    <option value="root">Корень</option>
    <option value="level11" parent="root">Уровень 1.1</option>
    <option value="level12" parent="root">Уровень 1.2</option>
    <option value="level21" parent="level12">Уровень 2.1</option>
    <option value="level22" parent="level12">Уровень 2.2</option>
    <option value="level13" parent="root">Уровень 1.3</option>
  </select>
  <script>
    $("#tree-select").select2tree();
  </script>
```

Если вы хотите предварительно выставить значения, то можете использовать событие select2:
```
  <script>
    $("#tree-select").val(["root", "level21"]).trigger('change');
  </script>  
```
