import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="menu nav navbar-dark bg-dark">
      <Link className="nav-link link-light" href="/">Home</Link>
      <Link className="nav-link link-light" href="LivroLista">Catálogo</Link>
      <Link className="nav-link link-light" href="LivroDados">Novo</Link>
    </nav>
  );
};
