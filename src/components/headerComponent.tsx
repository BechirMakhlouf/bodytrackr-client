const Header = () => {
  return (
    <header className="p-4 mb-2 flex justify-between">
      <div id="logo">
        <img
          src="../../public/logo-long-form.svg"
          alt="logo"
          className="border w-full"
        />
      </div>
      <ul className="max-w-[400px] w-full flex justify-around text-[16px]">
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </header>
  );
};

export default Header;
