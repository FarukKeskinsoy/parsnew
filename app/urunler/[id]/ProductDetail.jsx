"use client"

import React, { useEffect, useState } from 'react';
import RelatedCollDocs from '@/app/components/RelatedCollDocs';
import RelatedDocuments from './RelatedDocuments';
import RelatedVideos from './RelatedVideos';
import { checkDataExists } from '@/lib/firebase/faq/read';

const ProductDetail = ({ data, docId }) => {
  const [isClient, setIsClient] = useState(false);
  const [anchors, setAnchors] = useState([]);

  useEffect(() => {
    const checkAnchors = async () => {
      const applicationExists = await checkDataExists("Applications", "rproduct", "a", docId);
      const faqExists = await checkDataExists("FAQs", "rproduct", "a", docId);

      const newAnchors = [
        {
          label: "Teknik Özellik",
          id: "technical description",
          component: (
            <p id="technical description" className='content' dangerouslySetInnerHTML={{ __html: data?.content }}></p>
          ),
          condition: true,
          arg: isClient,
          className: "h-auto",
          render: true
        },
        {
          label: "Video",
          id: "videos",
          component: <RelatedVideos item={data} />,
          className: "h-auto",
          render: data?.videos.length > 0
        },
        {
          label: "Uygulamalar",
          id: "applications",
          component: <RelatedCollDocs coll="Applications" field="rproduct" type="a" docId={docId} />,
          className: "h-auto",
          condition: true,
          arg: isClient,
          render: applicationExists
        },
        {
          label: "S.S.S.",
          id: "faq",
          component: <RelatedCollDocs coll="FAQs" field="rproduct" type="a" docId={docId} />,
          className: "h-auto",
          condition: true,
          arg: isClient,
          render: faqExists
        },
        {
          label: "İlgili Ürünler",
          id: "related products",
          component: (
            <RelatedCollDocs coll="Products" field="rproduct" type="a" docId={[...data?.rproduct]} />
          ),
          className: "h-auto",
          render: data?.rproduct.length > 0
        },
        {
          label: "Dokümanlar",
          id: "related documents",
          component: <RelatedDocuments item={data} />,
          className: "h-auto",
          render: data?.documents.length > 0
        }
      ];

      setAnchors(newAnchors);
    };

    setIsClient(true);
    checkAnchors();
  }, [docId, data, isClient]);

  const [tabs, setTabs] = useState('technical description');

  const toggleTabs = (name) => {
    setTabs(name);
    document.getElementById(name)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='w-full'>
      <div className='w-full'>
        <ul className="sm:flex font-semibold border-b border-[#ebedf2] mb-5 whitespace-nowrap overflow-y-auto w-full flex gap-4 lg:8 items-center justify-between">
          {anchors.filter(l => l.render).map((a, adx) => (
            <li key={adx} className="inline-block">
              <button
                onClick={() => toggleTabs(a.id)}
                className={`flex gap-2 p-4 border-b  border-[transparent] hover:border-blue-500 hover:text-blue-500 ${tabs === a.id ? '!border-blue-500 text-blue-500' : ''}`}
              >
                {a.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col gap-4 lg:gap-16'>
        {docId && anchors.filter(a => a.render).map((ad, adx) => (
          <div key={adx} id={ad.id} className={ad.className}>
            {adx !== 0 && <h1 className='w-full border-b border-black pb-2 text-xl font-semibold'>{ad.label}</h1>}
            {ad.condition ? (ad.arg && ad.component) : ad.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
