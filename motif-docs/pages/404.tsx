import Link from 'next/link'
import NotFoundIcon from "@components/icons/404.mdx"

export default function FourOhFour() {
  return <div className="pt-12 text-center flex flex-col items-center">
    <div className="w-64 pb-12"><NotFoundIcon /></div>
    <h1>404 - Page Not Found</h1>
    <Link href="/">
      <a>
        Go back home
      </a>
    </Link>
  </div>
}