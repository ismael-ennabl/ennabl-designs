import{j as e}from"./iframe-D4P0QQci.js";import{I as i}from"./input-DZfzXvpu.js";import{C as s}from"./checkbox-wbSowQas.js";import{L as t}from"./label-CUNUVvu2.js";import{R as o,a as p}from"./radio-group-BCvpnkY9.js";import{B as d}from"./button-IyCOaBI3.js";const m=({node:a})=>e.jsxs("div",{className:"ml-4 my-1",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 text-sm",children:[e.jsx(s,{id:`tree-${a.id}`}),e.jsx(t,{htmlFor:`tree-${a.id}`,children:a.label})]}),a.children?.map(n=>e.jsx(m,{node:n},n.id))]}),c=({field:a,value:n})=>{const l=`field-${a.id}`;switch(a.type){case"search":return e.jsxs("div",{className:"space-y-1",children:[e.jsx(t,{htmlFor:l,children:a.label}),e.jsx(i,{id:l,placeholder:a.placeholder??"",defaultValue:String(n??a.defaultValue??"")})]});case"radio":return e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-sm font-medium",children:a.label}),e.jsx(o,{defaultValue:String(n??a.defaultValue??""),children:a.options?.map(r=>e.jsxs("div",{className:"inline-flex items-center gap-2 mr-3",children:[e.jsx(p,{id:`${l}-${r.value}`,value:r.value}),e.jsx(t,{htmlFor:`${l}-${r.value}`,children:r.label})]},r.value))})]});case"note":return e.jsx("p",{className:"text-sm text-muted-foreground",children:a.description??a.label});case"tree":return e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"text-sm font-medium",children:a.label}),e.jsxs("div",{className:"text-xs flex gap-3",children:[e.jsx(d,{variant:"link",className:"px-0",children:"Select All"}),e.jsx(d,{variant:"link",className:"px-0",children:"Inverse"}),e.jsx(d,{variant:"link",className:"px-0",children:"Clear"})]})]}),(a.nodes??[]).map(r=>e.jsxs("div",{children:[e.jsxs("div",{className:"inline-flex items-center gap-2 text-sm",children:[e.jsx(s,{id:`tree-${r.id}`}),e.jsx(t,{htmlFor:`tree-${r.id}`,children:r.label})]}),r.children?.map(u=>e.jsx(m,{node:u},u.id))]},r.id))]});case"text":return e.jsxs("div",{className:"space-y-1",children:[e.jsx(t,{htmlFor:l,children:a.label}),e.jsx(i,{id:l,defaultValue:String(n??a.defaultValue??"")})]});case"date":return e.jsxs("div",{className:"space-y-1",children:[e.jsx(t,{htmlFor:l,children:a.label}),e.jsx(i,{id:l,type:"date",defaultValue:String(n??a.defaultValue??"")})]});case"checkbox":return e.jsxs("div",{className:"inline-flex items-center gap-2 text-sm",children:[e.jsx(s,{id:l,disabled:a.disabled,defaultChecked:!!(n??a.defaultValue)}),e.jsx(t,{htmlFor:l,children:a.label})]});case"select":return e.jsxs("div",{className:"space-y-1",children:[e.jsx(t,{htmlFor:l,children:a.label}),e.jsxs("select",{id:l,className:"w-full border rounded px-2 py-1",defaultValue:String(n??a.defaultValue??""),children:[e.jsx("option",{value:"",children:"Any"}),a.options?.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))]})]});case"multiSelect":return e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{className:"text-sm",children:a.label}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.options?.map(r=>e.jsxs("div",{className:"inline-flex items-center gap-1 text-xs border rounded px-2 py-1",children:[e.jsx(s,{id:`${l}-${r.value}`}),e.jsx(t,{htmlFor:`${l}-${r.value}`,children:r.label})]},r.value))})]});default:return null}};c.__docgenInfo={description:"",methods:[],displayName:"FilterFieldRenderer",props:{field:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string
  label: string
  type: FieldType
  options?: FieldOption[]
  defaultValue?: unknown
  placeholder?: string
  description?: string
  disabled?: boolean
  nodes?: TreeNode[]
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:`| 'select'
| 'text'
| 'checkbox'
| 'date'
| 'dateRange'
| 'multiSelect'
| 'search'
| 'radio'
| 'note'
| 'tree'`,elements:[{name:"literal",value:"'select'"},{name:"literal",value:"'text'"},{name:"literal",value:"'checkbox'"},{name:"literal",value:"'date'"},{name:"literal",value:"'dateRange'"},{name:"literal",value:"'multiSelect'"},{name:"literal",value:"'search'"},{name:"literal",value:"'radio'"},{name:"literal",value:"'note'"},{name:"literal",value:"'tree'"}],required:!0}},{key:"options",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ value: string; label: string }",signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]}}],raw:"FieldOption[]",required:!1}},{key:"defaultValue",value:{name:"unknown",required:!1}},{key:"placeholder",value:{name:"string",required:!1}},{key:"description",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"nodes",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string
  label: string
  children?: TreeNode[]
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"children",value:{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]",required:!1}}]}}],raw:"TreeNode[]",required:!1}}]}},description:""},value:{required:!1,tsType:{name:"unknown"},description:""}}};const x=({section:a,values:n})=>e.jsxs("section",{children:[e.jsx("h4",{className:"font-medium mb-2",children:a.label}),e.jsx("div",{className:"space-y-2 text-sm",children:a.fields.map(l=>e.jsx(c,{field:l,value:n?.[l.id]},l.id))})]});x.__docgenInfo={description:"",methods:[],displayName:"FilterSectionRenderer",props:{section:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string
  label: string
  helpText?: string
  fields: FilterField[]
  childSectionIds?: string[]
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"helpText",value:{name:"string",required:!1}},{key:"fields",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string
  label: string
  type: FieldType
  options?: FieldOption[]
  defaultValue?: unknown
  placeholder?: string
  description?: string
  disabled?: boolean
  nodes?: TreeNode[]
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:`| 'select'
| 'text'
| 'checkbox'
| 'date'
| 'dateRange'
| 'multiSelect'
| 'search'
| 'radio'
| 'note'
| 'tree'`,elements:[{name:"literal",value:"'select'"},{name:"literal",value:"'text'"},{name:"literal",value:"'checkbox'"},{name:"literal",value:"'date'"},{name:"literal",value:"'dateRange'"},{name:"literal",value:"'multiSelect'"},{name:"literal",value:"'search'"},{name:"literal",value:"'radio'"},{name:"literal",value:"'note'"},{name:"literal",value:"'tree'"}],required:!0}},{key:"options",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ value: string; label: string }",signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]}}],raw:"FieldOption[]",required:!1}},{key:"defaultValue",value:{name:"unknown",required:!1}},{key:"placeholder",value:{name:"string",required:!1}},{key:"description",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"nodes",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string
  label: string
  children?: TreeNode[]
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"children",value:{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]",required:!1}}]}}],raw:"TreeNode[]",required:!1}}]}}],raw:"FilterField[]",required:!0}},{key:"childSectionIds",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]}},description:""},values:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"},description:""}}};export{x as F};
