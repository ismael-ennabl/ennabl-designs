import{j as e}from"./iframe-LWRVmnFj.js";import{c as t}from"./utils-CBfrqCZ4.js";import"./preload-helper-D9Z9MdNV.js";function d({className:a,...l}){return e.jsx("div",{"data-slot":"table-container",className:"relative w-full overflow-x-auto",children:e.jsx("table",{"data-slot":"table",className:t("w-full caption-bottom text-sm",a),...l})})}function i({className:a,...l}){return e.jsx("thead",{"data-slot":"table-header",className:t("[&_tr]:border-b",a),...l})}function c({className:a,...l}){return e.jsx("tbody",{"data-slot":"table-body",className:t("[&_tr:last-child]:border-0",a),...l})}function s({className:a,...l}){return e.jsx("tr",{"data-slot":"table-row",className:t("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",a),...l})}function r({className:a,...l}){return e.jsx("th",{"data-slot":"table-head",className:t("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l})}function n({className:a,...l}){return e.jsx("td",{"data-slot":"table-cell",className:t("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l})}d.__docgenInfo={description:"",methods:[],displayName:"Table"};i.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};c.__docgenInfo={description:"",methods:[],displayName:"TableBody"};r.__docgenInfo={description:"",methods:[],displayName:"TableHead"};s.__docgenInfo={description:"",methods:[],displayName:"TableRow"};n.__docgenInfo={description:"",methods:[],displayName:"TableCell"};const h={title:"Design Tokens/Table",component:d,parameters:{layout:"centered"},tags:["autodocs"]},o={render:()=>e.jsxs(d,{children:[e.jsx(i,{children:e.jsxs(s,{children:[e.jsx(r,{children:"Name"}),e.jsx(r,{children:"Title"}),e.jsx(r,{children:"Role"})]})}),e.jsxs(c,{children:[e.jsxs(s,{children:[e.jsx(n,{children:"Jane"}),e.jsx(n,{children:"Engineer"}),e.jsx(n,{children:"Admin"})]}),e.jsxs(s,{children:[e.jsx(n,{children:"John"}),e.jsx(n,{children:"Designer"}),e.jsx(n,{children:"Editor"})]})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane</TableCell>
          <TableCell>Engineer</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
}`,...o.parameters?.docs?.source}}};const x=["Default"];export{o as Default,x as __namedExportsOrder,h as default};
