# vue-typescript

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).























































### 项目开始时间 2020-04-21
  子组件通过@Prop() xxx = 'xxxx'接收数据会报错，“Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated”；需要@Prop({type: string, default:'xxxxxx'}) xxx!: string 来设置默认值，并接受值
  非空断言操作符(!) 在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符!可以用于断言操作对象是非null和非undefined类型的。具体而言，运算x!产生一个不包含null和undefined的x的值