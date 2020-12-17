import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/index';

export default function PostEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center', margin: '10px'}}>
        Please sign in to post
      </div>


    );
  }

  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      content: e.currentTarget.content.value,
      link: e.currentTarget.link.value,
    };
    if (!e.currentTarget.content.value || !e.currentTarget.link.value) return;
    e.currentTarget.content.value = '';
    e.currentTarget.link.value = '';

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log(body);
    if (res.ok) {
      setMsg('Posted!');
      setTimeout(() => setMsg(null), 5000);

    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>
        {msg}
      </p>
      <form onSubmit={hanldeSubmit} style={{ flexDirection: 'row' }} autoComplete="off">
        <label htmlFor="name">
          <input
            name="content"
            type="text"
            placeholder="Title of your post."
          />
        </label>
        <label htmlFor="link">
          <input
            name="link"
            type="text"
            placeholder="Enter a link."
          />
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Post</button>
      </form>
    </>
  );
}
