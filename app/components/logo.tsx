import { Link } from "remix"

function Logo() {
  return (
    <Link to="/" prefetch="intent">
      <span className="logo">
        Aniwait
      </span>
    </Link>
  )
}

export { Logo }