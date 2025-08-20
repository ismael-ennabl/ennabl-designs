import{j as n}from"./iframe-LWRVmnFj.js";import{c as t}from"./utils-CBfrqCZ4.js";import{b as f}from"./button-ClTaPFkY.js";import{C as u}from"./chevron-left-Dxj1BIsZ.js";import{c as x}from"./createLucideIcon-DztGgPSJ.js";import{C as h}from"./chevron-right-it21FO-v.js";import"./preload-helper-D9Z9MdNV.js";import"./index-DPcGnTxN.js";import"./index-CdJFUDDL.js";/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],j=x("ellipsis",P);function r({className:i,...a}){return n.jsx("nav",{role:"navigation","aria-label":"pagination","data-slot":"pagination",className:t("mx-auto flex w-full justify-center",i),...a})}function c({className:i,...a}){return n.jsx("ul",{"data-slot":"pagination-content",className:t("flex flex-row items-center gap-1",i),...a})}function s({...i}){return n.jsx("li",{"data-slot":"pagination-item",...i})}function e({className:i,isActive:a,size:p="icon",...g}){return n.jsx("a",{"aria-current":a?"page":void 0,"data-slot":"pagination-link","data-active":a,className:t(f({variant:a?"outline":"ghost",size:p}),i),...g})}function l({className:i,...a}){return n.jsxs(e,{"aria-label":"Go to previous page",size:"default",className:t("gap-1 px-2.5 sm:pl-2.5",i),...a,children:[n.jsx(u,{}),n.jsx("span",{className:"hidden sm:block",children:"Previous"})]})}function d({className:i,...a}){return n.jsxs(e,{"aria-label":"Go to next page",size:"default",className:t("gap-1 px-2.5 sm:pr-2.5",i),...a,children:[n.jsx("span",{className:"hidden sm:block",children:"Next"}),n.jsx(h,{})]})}function m({className:i,...a}){return n.jsxs("span",{"aria-hidden":!0,"data-slot":"pagination-ellipsis",className:t("flex size-9 items-center justify-center",i),...a,children:[n.jsx(j,{className:"size-4"}),n.jsx("span",{className:"sr-only",children:"More pages"})]})}r.__docgenInfo={description:"",methods:[],displayName:"Pagination"};c.__docgenInfo={description:"",methods:[],displayName:"PaginationContent"};e.__docgenInfo={description:"",methods:[],displayName:"PaginationLink",props:{isActive:{required:!1,tsType:{name:"boolean"},description:""},size:{defaultValue:{value:'"icon"',computed:!1},required:!1}}};s.__docgenInfo={description:"",methods:[],displayName:"PaginationItem"};l.__docgenInfo={description:"",methods:[],displayName:"PaginationPrevious"};d.__docgenInfo={description:"",methods:[],displayName:"PaginationNext"};m.__docgenInfo={description:"",methods:[],displayName:"PaginationEllipsis"};const z={title:"Design Tokens/Pagination",component:r,parameters:{layout:"centered"},tags:["autodocs"]},o={render:()=>n.jsx(r,{children:n.jsxs(c,{children:[n.jsx(l,{href:"#"}),n.jsx(s,{children:n.jsx(e,{href:"#",children:"1"})}),n.jsx(s,{children:n.jsx(e,{href:"#",isActive:!0,children:"2"})}),n.jsx(s,{children:n.jsx(e,{href:"#",children:"3"})}),n.jsx(m,{}),n.jsx(d,{href:"#"})]})})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationPrevious href="#" />
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationNext href="#" />
      </PaginationContent>
    </Pagination>
}`,...o.parameters?.docs?.source}}};const E=["Default"];export{o as Default,E as __namedExportsOrder,z as default};
