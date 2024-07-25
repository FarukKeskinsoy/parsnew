import React from 'react'
import "./cards.scss"
const Trapezoid = () => {
  return (

    <section className='bg-white'>
    <div className="inner bg-white">
    <div className="trapezoid flex-col lg:flex-row">
        <div className="trapezoid-1">
            <div className="textFieldl flex flex-col gap-4 p-4 rounded-md w-full lg:w-[70%]">
                <p className='font-semibold text-xl lg:text-2xl'>Misyonumuz</p>
                <p className='' >Pars Analitik Kimya ve End. Cih. İth. İhr. Ltd. Şti. olarak misyonumuz, laboratuvar ve proses analitik cihaz ve sistemlerinin satış, servis ve eğitim hizmetlerini en yüksek kalite standartlarında sunmak, müşteri memnuniyetini en üst seviyede tutmak ve sektördeki tecrübemizle müşterilerimize en doğru çözümleri optimal maliyetlerle sağlamaktır. Çeşitli sektörlerden müşterilerimizin ihtiyaçlarını en iyi şekilde analiz ederek, onlara en uygun ve yenilikçi çözümleri sunmayı görev bilmekteyiz.
                </p>
            </div>
            
        </div>
        <div className="trapezoid-2">
            <div className="textFieldr flex flex-col gap-4 p-4 rounded-md w-full lg:w-[70%]">
                <p className='font-semibold text-xl lg:text-2xl'>Vizyonumuz</p>
                <p className='' >Pars Analitik Kimya ve Endüstriyel Cihazlar olarak, Türkiye'de ve dünyada laboratuvar ve proses analitik cihazlar sektöründe öncü ve güvenilir bir marka olmak, müşteri memnuniyetini en üst seviyede tutarak sektörde fark yaratan yenilikçi çözümler sunmaktır. Sürekli gelişim ve teknolojik yeniliklerle sektörün ihtiyaçlarını karşılayarak, müşterilerimize değer katan bir iş ortağı olmayı hedeflemekteyiz.</p>
            </div>
        </div>
</div>

    </div>
    </section>

  )
}

export default Trapezoid