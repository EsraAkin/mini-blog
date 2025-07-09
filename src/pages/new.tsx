// src/pages/new.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title || !summary) {
      setError('Tüm alanlar zorunludur');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://686e7376c9090c495389b578.mockapi.io/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ title, summary, imageUrl }),

      });

      if (!res.ok) throw new Error('Gönderme başarısız');

      router.push('/'); // Ana sayfaya yönlendir
    } catch {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>✍️ Yeni Yazı Ekle</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">


<Form.Label>Görsel URL</Form.Label>
  <Form.Control
    type="text"
    placeholder="https://..."
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
  />


          <Form.Label>Başlık</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Yazı başlığını girin"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="summary">
          <Form.Label>Özet</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Yazının özetini girin"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Gönderiliyor...' : 'Yazıyı Kaydet'}
        </Button>
      </Form>
    </Container>
  );
}
