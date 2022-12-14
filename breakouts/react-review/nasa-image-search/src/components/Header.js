function Header() {
  const nasaLogoSrc =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png';

  return (
    <div className="header">
      <img src={nasaLogoSrc} alt="nasa logo" />
    </div>
  );
}

export default Header;
