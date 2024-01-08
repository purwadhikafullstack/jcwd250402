import Search from "./Navbar/Search";
import UserMenu from "./Navbar/UserMenu";
import logo from "../asset/Logo.svg";
import logoWhite from "../asset/Logo-White.svg";
import Categories from "./Categories";
import Container from "./Container";

const Navbar = ({ children, transparent, showType }) => {
  return (
    <div>
      <div
        className={`fixed z-[999999999] w-full ${
          transparent
            ? "bg-opacity-0 transition-opacity duration-300 shadow-none"
            : "bg-white transition-all duration-300 shadow-sm"
        }`}
      >
        <div className="py-4">
          <Container>
            <div className="flex flex-row items-center justify-end md:justify-between">
              <div className="hidden md:block md:pl-2">
                <a href="/">
                  {transparent ? (
                    <>
                      <img
                        src={logoWhite}
                        alt="app logo"
                        className="h-80px w-[120px] cursor-pointer"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={logo}
                        alt="app logo"
                        className="h-80px w-[120px]"
                      />
                    </>
                  )}
                </a>
              </div>
              {transparent ? null : <Search transparent={transparent} />}
              <UserMenu transparent={transparent} />
            </div>
          </Container>
        </div>
        {showType ? (
          <>
            <Categories />
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export default Navbar;
