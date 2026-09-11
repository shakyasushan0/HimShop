function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer>
      <h5 style={{ backgroundColor: "red", color: "wheat" }}>
        Footer works! {year}
      </h5>
    </footer>
  );
}

export default Footer;
