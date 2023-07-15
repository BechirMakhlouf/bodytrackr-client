import Menu from "./menuComponent";

const Header = () => {
  return (
    <header className="relative mb-8 m-4 flex justify-between">
      <div id="logo">
        <img src="/logo-long-form.svg" alt="logo" className="w-full" />
      </div>
      <Menu />
    </header>
  );
};

export default Header;
