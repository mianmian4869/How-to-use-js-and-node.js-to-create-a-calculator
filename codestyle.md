[参考资料]<https://blog.51cto.com/u_19261/6467222>
# JavaScript书写规范： 
1. 文件编码统一为utf-8；  
2. 书写过程, 每行代码结束必须有分号； 
3. 库引入: 看情况而定；  
4. 变量命名: 以下划线链接每个单词，类型_变量名； 
    s：表示字符串； 
    n：表示数字； 
    b：表示逻辑； 
    a：表示数组； 
    r：表示正则表达式； 
    f：表示函数；  
    o：表示以上未涉及到的其他对象； 
    变量在作用域的顶部申明。  
5.常量：全部大写，以下划线分隔  如网站的URL，域,图片目录路径，js和css用到的目录路径；  
6. 类命名: 首字母大写, 驼峰式命名. 如 Comment; 
7. 函数命名: 首字母小写驼峰式命名. 如getUserName(); 
8. 类中私有方法，以下划线+方法名标注,私有方法不能在类外被调用。  
9. 命名语义化, 尽可能利用英文单词或其缩写； 
10. 代码结构明了化, 加适量注释. 提高函数重用率； 
    1)大功能区块的功能描述(类，函数)/* 功能描述 参数描述 返回值 */  
    2)单行的注释(放在行末尾) //注释  
11. 注重与html分离, 减小reflow, 注重性能. 
12. Dom中自定义的class，以j_classname的形式 
13. 把外部JavaScript文件放在HTML底部,</body>的前面 
14. 优化循环(循环体中若有Dom操作，应该把Dom操作提到循环体外；在同一作用域内，Dom选择赋值给一局部变量。) 
15. 单引号和双引号  为了避免混乱，我们建议在HTML中使用双引号，在JavaScript中使用单引号。 
```
//html  
     <img src="http://zywhunter.blog.163.com/blog/picture.gif" /> 
     //JavaScript  <script type="text/javascript"> document.write('<p>'); </script>  //一段混用的jQuery代码 
     $('h1').after('<div id="content"><h2>目录</h2><ol></ol></div>');
```
16. 使用更简单的格式来写innerscript
```
//早期的代码可能是这样的  
     <script type="text/javascript" language="javascript"> ... </script>  
     //现在不用language属性了 <script type="text/javascript"> ... </script>
```
17. 总是检查数据  要检查你的方法输入的所有数据，一方面是为了安全性，另一方面也是为了可用性。用户随时随地都会输入错误的数据。这不是因为他们蠢，而是因为他们很忙，并且思考的方式跟你不同。用typeof方法来检测你的function接受的输入是否合法。  
18. 避免混入其他技术,js不直接控制css详细的设置，可控制classname  
19. 避免全局变量（类名空间App.dialog.）  全局变量和全局函数是非常糟糕的。因为在一个页面中包含的所有JavaScript都在同一个域中运行。所以如果你的代码中声明了全局变量或者全局函数的话，后面的代码中载入的脚本文件中的同名变量和函数会覆盖掉（overwrite）你的。
```
//糟糕的全局变量和全局函数 
     var current = null; 
     function init(){...} 
     function change(){...} 
     function verify(){...}
```
解决办法有很多，Christian Heilmann建议的方法是：  //如果变量和函数不需要在“外面”引用，那么就可以使用一个没有名字的方法将他们全都包起来。
```
(function(){   
         var current = null;   
         function init(){...}   
         function change(){...}   
         function verify(){...} 
     })();  
     //如果变量和函数需要在“外面”引用，需要把你的变量和函数放在一个“命名空间”中  //我们这里用一个function做命名空间而不是一个var，因为在前者中声明function更简单，而且能保护隐私数据 myNameSpace = function(){   
         var current = null;   
         function init(){...} 
         function change(){...}   
         function verify(){...}    
         //所有需要在命名空间外调用的函数和属性都要写在return里面   
         return{     
             init:init,      
             //甚至你可以为函数和属性命名一个别名     
             set:change   
         } 
     }();
```
20. 声明变量的话，总是用var  JavaScript中的变量可能是全局域或者局部域，用var声明的话会更加直观。  
21. 避免使用eval（)方法(ajax数据请求验证)JavaScript中的eval（)方法是在运行时把任何代码当作对象来计算/运行的方法。实际上由于安全性的缘故，大部分情况下都不应该用 eval（)，总是有一种更“正确”的方法来完成同样的工作的。基本原则是，eval is evil，在任何时候都不要用它，除非你是一个老手，并且知道你不得不这样做。 
22. 不要偷懒省略”和{}  从技术上说，你可以忽略很多花括号和分号。  //虽然看上去很不对头，大部分浏览器都能正确解析这段代码
```
if(someVariableExists)
   x = false  
 //这个代码看上去更不对头了，咋眼一看似乎下面的句都被执行了 //实际上只有x=false在if中 
 if(someVariableExists)    
     x = false     
     anotherFunctionCall();
```
23. 获取对象属性的时候用方括号而不是点号在JavaScript中取得某对象的属性有两种方法：
```
//点号标记 
     MyObject.property   
     //方括号标记 
     MyObject["property"]
```
如果是用点号标记取得对象的属性，属性名称是硬编码，无法在运行时更改；而用方括号的话，JavaScript会求得方括号内值然后通过计算结果来求得属性名。也就是说用方括号标记的方式，属性名称可以是硬编码的，也可以是变量或者函数返回值。 
```
//这样是不行的 
     MyObject.value+i 
     //这样就没有问题 
     MyObject["value"+i]
```
24. for in语句遍历一个对象中的所有条目的时候，用for in语句是非常方便的。但有时候我们不需要遍历对象中的方法，如果不需要的话，可以加上一条filter。  //加上了一个过滤器的for in语句
```
for(key in object) {     
     if(object.hasOwnProperty(key) {       
         ...then do something...    
     } 
 }
```
25. 代码排版 缩进 tab长度为4  行长度 ，控制在可视范围内，以一个分号结束 花括号,如果是一个代码段，花括号紧跟在语句的后面 文件功能定义 base：网站常量
page制作要求：
    １、弹窗：按设计图还原即可，不用考虑弹窗的位置。  
    ２、对于网页代码，一定要保持足够的精简，拷贝的无用代码一定要删除。  
    ３、标签的语义化，不能滥用标签。 
    ４、尽可能不用标签ID来控制样式。 
后端：js功能性修改，需要通知前端。

