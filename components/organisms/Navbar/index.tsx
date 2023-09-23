import Image from "next/image"
import Menu from "./Menu"
import AuthNav from "./AuthNav"
import ToggleMenu from "./ToggleMenu"

export default function Navbar() {
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white pt-lg-40 pb-lg-40 pt-30 pb-50">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image src={"/assets/icon/logo.png"} width={60} height={60} alt="" />
          </a>
          <ToggleMenu />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
              <Menu />
              <AuthNav isLogin />
            </ul>
          </div>
        </div>
      </nav>
    </section>
  )
}
