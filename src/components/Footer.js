// src/components/Footer.tsx
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-5 border-top">
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} Mini Blog. Tüm hakları saklıdır.</small>
      </Container>
    </footer>
  );
}
