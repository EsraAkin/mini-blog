// src/components/Header.tsx
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>📝 Mini Blog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Ana Sayfa</Nav.Link>
            </Link>
            <Link href="/hakkinda" passHref legacyBehavior>
              <Nav.Link>Hakkında</Nav.Link>
            </Link>

            <Link href="/new" passHref legacyBehavior>
            <Nav.Link>New</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
