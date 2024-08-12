import React from 'react'
import "./cards.scss"
import { Eye, Goal } from 'lucide-react'


const MissionVision = () => {

const circles=[
    {className:" rounded-full bg-[#f5f5f5] w-[40px] h-[40px] animate-bounce-slow absolute top-10 left-[50%]"},
    {className:" rounded-full bg-[#f5f5f5] w-[30px] h-[30px] animate-bounce-slow absolute bottom-10 left-[50%]"},
    {className:" rounded-full bg-[#f5f5f5] w-[30px] h-[30px] animate-bounce-slow absolute top-30 left-30"},
    {className:" rounded-full bg-[#f5f5f5] w-[40px] h-[40px] animate-bounce absolute top-40 left-[48%]"},
    {className:" rounded-full bg-[#f5f5f5] w-[80px] h-[80px] animate-bounce-slow absolute top-80 left-[49%]"},
    {className:" rounded-full bg-[#f5f5f5] w-[60px] h-[60px] animate-bounce absolute bottom-10 left-[40%]"},
]
    return (

    <section className='bg-white my-4'>
    <div className="inner bg-white relative">
        {circles.map((c,cdx)=>{
            return(
                <div
                key={cdx}
                className={"hidden lg:flex "+c.className}>
                        
                </div>
            )
        })}
    <div className="circles flex-col lg:flex-row">
        <div className="circle-1-outer rounded-full ">
            <div className="circle-1 rounded lg:rounded-full ">
                <div className="icon-holder rounded-full">
                    <Eye className='icon' color='gainsboro' size={32}/>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-[85%]">
                    <p className='font-bold text-xl lg:text-3xl border-b-4 border-[gainsboro] pb-2 font-oswald'
                    >Misyonumuz</p>
                    <p className='text-center' >Pars Analitik Kimya ve End. Cih. İth. İhr. Ltd. Şti. olarak misyonumuz, laboratuvar ve proses analitik cihaz ve sistemlerinin satış, servis ve eğitim hizmetlerini en yüksek kalite standartlarında sunmak, müşteri memnuniyetini en üst seviyede tutmak ve sektördeki tecrübemizle müşterilerimize en doğru çözümleri optimal maliyetlerle sağlamaktır. Çeşitli sektörlerden müşterilerimizin ihtiyaçlarını en iyi şekilde analiz ederek, onlara en uygun ve yenilikçi çözümleri sunmayı görev bilmekteyiz.
                    </p>
                </div>
                
            </div>
        </div>

        <div className="circle-2-outer rounded-full">
            <div className="circle-2 rounded lg:rounded-full">
                <div className="icon-holder rounded-full">
                    <Goal className='icon'/>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-[85%]">
                <p className='font-bold text-xl lg:text-3xl border-b-4 border-[gainsboro] pb-2 font-oswald'
                    >Vizyonumuz</p>
                    <p className='text-center' >Pars Analitik Kimya ve Endüstriyel Cihazlar olarak, Türkiye'de ve dünyada laboratuvar ve proses analitik cihazlar sektöründe öncü ve güvenilir bir marka olmak, müşteri memnuniyetini en üst seviyede tutarak sektörde fark yaratan yenilikçi çözümler sunmaktır. Sürekli gelişim ve teknolojik yeniliklerle sektörün ihtiyaçlarını karşılayarak, müşterilerimize değer katan bir iş ortağı olmayı hedeflemekteyiz.</p>
                </div>
            </div>
        </div>
</div>

    </div>
    </section>

  )
}

export default MissionVision