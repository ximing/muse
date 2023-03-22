// import {
//   expectCompileWXML,
//   expectViewVisitorWXML
// } from './__tests__/view/help';

// const { vDom } = expectViewVisitorWXML(
//   `<template name="a"><view wx:for="{{arr}}" wx:for-item="i" wx:for-index="idx"> {{i}}-{{idx}} </view></template>
// <template is="a" data="{{ ({arr:arr}) }}"/>`,
//   {
//     arr: 'hello'
//   }
// );
//

// const { vDom } = expectViewVisitorWXML(
//   `<template name="a"><view wx:for="{{arr}}" wx:for-item="i" wx:for-index="idx"> {{i}}-{{idx}} </view></template>
//   <template is="a" data="{{arr:arr}}"/>`,
//   {
//     arr: 2
//   }
// );

// const vDom = expectCompileWXML(
//   `<view>
//   <button bind:tap="add">add</button>
//   <view class="count">count:{{count}}</view>
// <view wx:if="{{count===2}}">wx:if:count===2</view>
// <view wx:for="{{count}}">{{item}}: {{index}}</view>
// </view>
// `,
//   {
//     a: 0,
//     b: 5,
//     arr: [1, 2, 3],
//     show: false
//   }
// );
// console.log(JSON.stringify(vDom, null, 2));

// expectViewVisitorWXML(
//   `<view wx:for="{{arr}}" wx:for-item="i" wx:for-index="idx"> {{i}}-{{idx}} </view>`,
//   {
//     arr: 2
//   }
// );

import { getOriginTPL } from './__tests__/helper';

function getComp() {
  return {
    data: {},
    setData(obj: any) {
      Object.assign(this.data, obj);
    }
  };
}
const tpl = getOriginTPL('<view>t</view>', '', {
  data: { count: 1 },
  flows: {
    add: [
      {
        name: 'setData',
        args: { count: 2 }
      }
    ]
  }
});
const $comp = getComp();
tpl.flow.flows.add.call($comp);
