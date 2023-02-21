module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue: 192, // 设计稿宽度的1/ 10
      propList: ['*', '!border'], // 除 border 外所有px 转 rem
      selectorBlackList: ['.mars3d-'], // 需要过滤掉不进行rem转换的class，例如：.el-
    },
  },
};
