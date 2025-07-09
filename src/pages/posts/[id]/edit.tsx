// pages/posts/[id]/edit.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  // ✅ useEffect sadece client tarafında çalışır, hydration sorunu yaşamayız
  useEffect(() => {
    if (!id) return;

    fetch(`https://686e7376c9090c495389b578.mockapi.io/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setSummary(data.summary);
        setImageUrl(data.imageUrl || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Veri alınamadı');
        setLoading(false);
      });


      
  }, [id]);


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`https://686e7376c9090c495389b578.mockapi.io/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, summary, imageUrl }),

    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push('/'), 1500); 
    } else {
      setError('Güncelleme başarısız oldu');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Yükleniyor...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>✏️ Yazıyı Düzenle</h3>
        <Button variant="secondary" onClick={() => router.back()}>
          <FaArrowLeft className="me-2" />
          Geri Dön
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Yazı başarıyla güncellendi!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Başlık</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
  <Form.Label>Görsel URL</Form.Label>
  <Form.Control
    type="text"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
  />
</Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Özet</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Güncellemeyi Kaydet
        </Button>
      </Form>
    </Container>
  );
}
