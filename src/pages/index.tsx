import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

interface Post {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false); // 👈 Hydration çözümü

  useEffect(() => {
    setIsClient(true); // 👈 sadece client'ta true olur
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1 className="mb-4">📚 Blog Yazıları</h1>

      {isClient && ( // 👈 sadece client'ta göster
        <Form.Control
          type="text"
          placeholder="🔍 Başlığa göre ara..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      <Row>
        {filteredPosts.map((post) => (
          <Col md={4} key={post.id} className="mb-4 d-flex">
            <Card className="w-100">
              {post.imageUrl && (
   <Card.Img
  variant="top"
  src={post.imageUrl}
  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
/>

  )}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text className="line-clamp-3">{post.summary}</Card.Text>

                {post.summary.length > 100 && (
                  <Link href={`/posts/${post.id}`} passHref>
                    <Button variant="primary">Devamını Oku</Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://686e7376c9090c495389b578.mockapi.io/posts');
    const posts = await res.json();

    return {
      props: { posts },
    };
  } catch {
    return {
      props: { posts: [] },
    };
  }
};
