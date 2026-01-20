const Footer = () => {
  return (
    <footer className="bg-nav-bg text-nav-text py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="font-heading text-xl mb-4">Philomath Community Church</p>
        <div className="text-sm space-y-1 opacity-90">
          <p>145 North 14th Street</p>
          <p>PO BOX 1567</p>
          <p>Philomath, Oregon 97370</p>
        </div>
        <p className="mt-4 text-sm opacity-80">
          © {new Date().getFullYear()} Philomath Community Church. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
