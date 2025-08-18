import type { Meta, StoryObj } from '@storybook/react'
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from '@/components/ui/command'

const meta: Meta<typeof CommandDialog> = {
  title: 'Design Tokens/Command',
  component: CommandDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <CommandDialog open>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
}
