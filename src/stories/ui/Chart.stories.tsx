import type { Meta, StoryObj } from '@storybook/react'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis } from 'recharts'

const meta: Meta<typeof ChartContainer> = {
  title: 'UI/Chart',
  component: ChartContainer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

const data = Array.from({ length: 7 }).map((_, i) => ({
  day: `D${i + 1}`,
  visitors: Math.round(Math.random() * 1000) + 200,
}))

export const Default: Story = {
  render: () => (
    <ChartContainer config={{ visitors: { label: 'Visitors', color: 'hsl(221,83%,53%)' } }}>
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={30} />
        <Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={2} dot={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  ),
}
