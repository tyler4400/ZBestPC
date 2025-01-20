import './css/public.css';
import './css/index.css';

import 'jquery';
import './js/public';
import './js/nav';

console.log('hello index')
// treeshaking触发条件
// 1.通过解构的方式获取方法，可以触发 treeshaking  import _ from 'lodash-es' 就不能触发treeshaking，因为是导入整个对象
// 2.调用的npm包必须使用ESM规范
// 3.同一文件的treeshaking有触发条件：必须是mode=production
// 4.一定要使用解构来加载模块
// import {isEqual} from 'lodash-es';  //如果是 from 'lodash'则不可以触发treeshaking，因为lodash不是ESM规范
// console.log(isEqual(1, 1));
