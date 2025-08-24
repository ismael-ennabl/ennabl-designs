declare module 'ennablux-mcp/api' {
  export type ComponentMeta = {
    id: string;
    title: string;
    exportName?: string;
    importHint?: string;
    stories?: Array<{ id: string; title: string; name?: string }>;
    tags?: string[];
  };
  export const ontology: Record<string, { synonyms: string[] }>;
  export function loadStorybookFromUrl(url: string): Promise<{ components: ComponentMeta[] }>;
  export function generateReactPage(pageName: string, components: ComponentMeta[], importBase?: string): string;
  export function suggestComponents(registry: ComponentMeta[], terms: string[]): Promise<ComponentMeta[]> | ComponentMeta[];
  export function saveSynonymMapping(term: string, componentId: string): Promise<void>;
}


