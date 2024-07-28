import { fetchFAQById } from '@/lib/firebase/faq/read';
import React, { useEffect, useState } from 'react'

const OneFAQPage = ({id}) => {
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [isClient, setIsClient] = useState(false)


    useEffect(() => {
        setIsClient(true)

        if (id) {
          fetchFAQById(id)
            .then((faq) => {
              setSelectedFAQ(faq);
            }).then(()=>{
                const element = document.getElementById(`nav`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth',block: 'start' });
                }
      
            })
            .catch((error) => {
              console.error("Error fetching FAQ by ID:", error);
            });

        }
      }, [id]);
  return (
    <div id={`faq-${id}`} className='flex flex-col flex-1 lg:flex-[4] w-full lg:p-8 gap-4'>
                <h1 className='text-xl font-semibold'>{selectedFAQ?.title}</h1>
                {isClient&&<p dangerouslySetInnerHTML={{__html:selectedFAQ?.content}}></p>}

    </div>
  )
}

export default OneFAQPage