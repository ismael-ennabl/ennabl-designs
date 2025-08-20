import{j as e}from"./iframe-LWRVmnFj.js";import{c as a}from"./utils-CBfrqCZ4.js";import{B as m}from"./button-ClTaPFkY.js";import"./preload-helper-D9Z9MdNV.js";import"./index-DPcGnTxN.js";import"./index-CdJFUDDL.js";function d({className:t,...r}){return e.jsx("div",{"data-slot":"card",className:a("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",t),...r})}function n({className:t,...r}){return e.jsx("div",{"data-slot":"card-header",className:a("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",t),...r})}function s({className:t,...r}){return e.jsx("div",{"data-slot":"card-title",className:a("leading-none font-semibold",t),...r})}function i({className:t,...r}){return e.jsx("div",{"data-slot":"card-description",className:a("text-muted-foreground text-sm",t),...r})}function c({className:t,...r}){return e.jsx("div",{"data-slot":"card-content",className:a("px-6",t),...r})}function l({className:t,...r}){return e.jsx("div",{"data-slot":"card-footer",className:a("flex items-center px-6 [.border-t]:pt-6",t),...r})}d.__docgenInfo={description:"",methods:[],displayName:"Card"};n.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};l.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};s.__docgenInfo={description:"",methods:[],displayName:"CardTitle"};i.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};c.__docgenInfo={description:"",methods:[],displayName:"CardContent"};const g={title:"Design Tokens/Card",component:d,parameters:{layout:"centered"},tags:["autodocs"]},o={render:()=>e.jsxs(d,{style:{width:360},children:[e.jsxs(n,{children:[e.jsx(s,{children:"Card title"}),e.jsx(i,{children:"Small description"})]}),e.jsx(c,{children:"Content goes here."}),e.jsx(l,{children:e.jsx(m,{children:"Action"})})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Card style={{
    width: 360
  }}>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Small description</CardDescription>
      </CardHeader>
      <CardContent>
        Content goes here.
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
}`,...o.parameters?.docs?.source}}};const _=["Default"];export{o as Default,_ as __namedExportsOrder,g as default};
