import{j as e}from"./iframe-LWRVmnFj.js";import{B as l}from"./button-ClTaPFkY.js";import{c as i}from"./createLucideIcon-DztGgPSJ.js";import"./preload-helper-D9Z9MdNV.js";import"./index-DPcGnTxN.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],d=i("funnel",c),p=({label:o,count:r,disabled:n})=>e.jsx("div",{className:"p-6",children:e.jsxs(l,{"aria-label":"Open filters",disabled:n,className:"gap-2",onClick:()=>{},children:[e.jsx(d,{className:"h-4 w-4","aria-hidden":!0}),e.jsx("span",{children:o}),typeof r=="number"&&r>0?e.jsx("span",{"aria-label":`${r} filters applied`,className:"ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-xs text-primary",children:r}):null]})}),h={title:"Features/Global Filters/Trigger Button",component:p,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Standalone Filters trigger button. Use this control to open your Filters modal or sidebar. Accessible label and optional applied-count badge included."}},a11y:{config:{rules:[{id:"button-name",enabled:!0}]}}},argTypes:{label:{control:"text",description:"Button label",table:{category:"content"}},count:{control:"number",description:"Applied filters badge count",table:{category:"state"}},disabled:{control:"boolean",description:"Disable the trigger",table:{category:"state"}}},args:{label:"Filters",count:0,disabled:!1}},t={},a={args:{count:3}},s={args:{disabled:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    count: 3
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...s.parameters?.docs?.source}}};const j=["Default","WithCount","Disabled"];export{t as Default,s as Disabled,a as WithCount,j as __namedExportsOrder,h as default};
