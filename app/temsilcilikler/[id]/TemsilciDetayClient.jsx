// src/app/temsilcilikler/[id]/TemsilciDetayClient.js
"use client";
import Link from 'next/link';

function TemsilciDetayClient({ id, docId, data }) {
  return (
    <div>
      <div>{docId}</div>
      <span>{data?.title}</span>
      <Link className='link btn' href={`/temsilcilikler/${id}/urun-gruplari?id=${docId}`}>
        Tüm ürün grupları
      </Link>
    </div>
  );
}

export default TemsilciDetayClient;
