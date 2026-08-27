import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="main">
      <div className="container clearfix">
        <div className="uncopyright">
          <p>
            Uncopyright &copy; {year} <strong>Felipe Marin</strong>
          </p>
          <p>Please recycle this code responsibly</p>
        </div>

        <div className="credits">
          <p>
            Sustainably coded with love by{" "}
            <a href="http:felipemv.com.au/"> FelipeMV</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
