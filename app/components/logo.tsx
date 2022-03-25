import { Link } from "remix"

function Logo() {
  return (
    <Link to="/" prefetch="intent">
      {/* <img src="/images/logo.svg" alt="logo aniwait" /> */}
      <span className="logo">
        Aniwait
      </span>
    </Link>
  )
}

export { Logo }