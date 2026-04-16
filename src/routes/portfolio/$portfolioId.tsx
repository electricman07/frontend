import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/$portfolioId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/portfolio/$portfolioId"!</div>
}
