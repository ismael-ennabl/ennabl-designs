import{j as r}from"./iframe-LWRVmnFj.js";import{S as b}from"./index-DPcGnTxN.js";import{c as t}from"./utils-CBfrqCZ4.js";import{C as p}from"./chevron-right-it21FO-v.js";import"./preload-helper-D9Z9MdNV.js";import"./createLucideIcon-DztGgPSJ.js";function c({...e}){return r.jsx("nav",{"aria-label":"breadcrumb","data-slot":"breadcrumb",...e})}function i({className:e,...a}){return r.jsx("ol",{"data-slot":"breadcrumb-list",className:t("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",e),...a})}function s({className:e,...a}){return r.jsx("li",{"data-slot":"breadcrumb-item",className:t("inline-flex items-center gap-1.5",e),...a})}function o({asChild:e,className:a,...d}){const l=e?b:"a";return r.jsx(l,{"data-slot":"breadcrumb-link",className:t("hover:text-foreground transition-colors",a),...d})}function u({className:e,...a}){return r.jsx("span",{"data-slot":"breadcrumb-page",role:"link","aria-disabled":"true","aria-current":"page",className:t("text-foreground font-normal",e),...a})}function m({children:e,className:a,...d}){return r.jsx("li",{"data-slot":"breadcrumb-separator",role:"presentation","aria-hidden":"true",className:t("[&>svg]:size-3.5",a),...d,children:e??r.jsx(p,{})})}c.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb"};i.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbList"};s.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbItem"};o.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbLink",props:{asChild:{required:!1,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbPage"};m.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbSeparator"};const I={title:"Design Tokens/Breadcrumb",component:c,parameters:{layout:"centered"},tags:["autodocs"]},n={render:()=>r.jsx(c,{children:r.jsxs(i,{children:[r.jsx(s,{children:r.jsx(o,{href:"#",children:"Home"})}),r.jsx(m,{}),r.jsx(s,{children:r.jsx(o,{href:"#",children:"Library"})}),r.jsx(m,{}),r.jsx(s,{children:r.jsx(u,{children:"Data"})})]})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Data</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...n.parameters?.docs?.source}}};const _=["Default"];export{n as Default,_ as __namedExportsOrder,I as default};
