// src/pages/posts/[id].tsx

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Container, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';

interface Post {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
}

interface PostDetailProps {
  post: Post | null;
}

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();

  if (!post) {
    return (
      <Container className="mt-4">
        <h2>Yazı bulunamadı</h2>
        <Link href="/" passHref legacyBehavior>
          <Button variant="secondary" className="mt-3">Ana Sayfaya Dön</Button>
        </Link>
      </Container>
    );
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Bu yazıyı silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      await fetch(`https://686e7376c9090c495389b578.mockapi.io/posts/${post.id}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
      alert("Silme işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        {post.imageUrl && (
          <Card.Img
            variant="top"
            src={post.imageUrl}
            alt={post.title}
            style={{
              maxHeight: '350px',
              objectFit: 'cover',
              width: '100%',
            }}
          />
        )}

        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.summary}</Card.Text>

          <div className="d-flex gap-2 mt-3">
            <Link href="/" passHref legacyBehavior>
              <Button variant="primary">
                <FaArrowLeft className="me-2" />
                Geri Dön
              </Button>
            </Link>

            <Link href={`/posts/${post.id}/edit`} passHref legacyBehavior>
              <Button variant="warning">
                <FaEdit className="me-2" />
                Düzenle
              </Button>
            </Link>

            <Button variant="danger" onClick={handleDelete}>
              <FaTrash className="me-2" />
              Sil
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const res = await fetch(`https://686e7376c9090c495389b578.mockapi.io/posts/${id}`);
    if (!res.ok) {
      throw new Error('Veri alınamadı');
    }
    const post = await res.json();

    return {
      props: { post },
    };
  } catch (error) {
    return {
      props: { post: null },
    };
  }
};
