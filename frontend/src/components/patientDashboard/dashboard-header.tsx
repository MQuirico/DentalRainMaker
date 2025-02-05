interface DashboardHeaderProps {
  heading: string
  text?: string
  loading: boolean
}

export function DashboardHeader({
  heading,
  text,
  loading,
}: DashboardHeaderProps) {
  return (
    <div className='animate-fadeIn relative mb-8 flex flex-col items-center space-y-2 lg:left-[2%]'>
      <h1 className='text-3xl font-bold tracking-tight'>{heading}</h1>
      <p className='text-muted-foreground'>{text}</p>
    </div>
  )
}
