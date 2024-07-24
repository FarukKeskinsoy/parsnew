// src/app/temsilcilikler/[id]/TemsilciDetayClient.js
"use client";
import Link from 'next/link';

function SectorDetayClient({ id, docId, data }) {
  return (
    <div>
      <div>{docId}</div>
      <span>{data?.title}</span>
      
    </div>
  );
}

export default SectorDetayClient;
