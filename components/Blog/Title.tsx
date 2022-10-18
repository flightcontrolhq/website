import { useBlog } from 'lib/blog-context'

type Props = {
  className?: string
  title?: string
}

export function Title({ title, className, ...props }: Props) {
  return (
    <h1
      {...props}
      className={`${className} text-white text-heading1 tracking-[-0.02em] font-bold mb-1`}
    >
      {title}
    </h1>
  )
}

export function BlogTitle({ className }: Pick<Props, 'className'>) {
  const { title } = useBlog()
  return <Title title={title} className={className} />
}
