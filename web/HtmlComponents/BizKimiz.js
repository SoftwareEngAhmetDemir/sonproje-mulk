import React from 'react'
import ReactDOM from 'react-dom';
import renderHTML from 'react-render-html';
function BizKimiz() {
  return (
    <div>  
    <section id="whous"  style={{width:"90%"}}>
          <div className="row">
        <div className="container mt-3 ">
            <div className="container text-center">
                <h5 className="sectionTitle" >
                    BİZ KİMİZ
                    <span >BİZ KİMİZ</span>
                </h5>
             </div>
 
            <div className="person_area row  ">
                <div className="img_area col-12 col-sm-4 px-0 ">
                    <img src="img/parson_border_bg.png" 
                    className="w-100 mt-sm-5 mt-sm-1 " style={{backgroundImage: 'url(img/cem-tayfun-yilmaz.png)' }} />
                </div>
                <div className="text_area col-12 col-sm-8 ">
                    <h2>Cem Tayfun Yılmaz</h2>
                    <h5>Mülkedin Kurucu / Founder</h5>
                    <p>Cem Tayfun Yılmaz 15 yılda gayrimenkul değerleme ve geliştirme sektöründe Türkiye’nin önde gelen TSKB Gayrimenkul Değerleme, TSKB GYO, Fiba Gayrimenkul, Turkmall, Toya, Rönesans Gayrimenkul, Altınhas Gayrimenkul, Makyol, İş Altınhas gibi şirketlerinde üst düzey yönetici ve yönetim kurulu üyesi olarak geliştirdiği AVM, Konut, Ofis, Otel, Karma Kullanım projelerden edindiği bilgi-birikim ve tecrübeyi Investin çatısı altında yatırımcı ve geliştiricilere aktarmayı hedeflemektedir.</p>
                </div>
            </div>

            <div className="person_area row  ">
                <div className="text_area col-12 col-sm-8 ">
                    <h2>Batuhan Tarkan</h2>
                    <h5>Mülkedin Kurucu / Founder</h5>
                    <p>Batuhan Tarkan İTÜ Mimarlık Fakültesi’nde 2004 yılında mezun olmuş ve aynı
                         yıl İTÜ Gayrimenkul Geliştirme Yüksek Lisans programına başlamıştır. 
                         Lisans mezuniyeti öncesinde 2003 yılında Kuzeybatı Gayrimenkul ekibine 
                         Danışman olarak dahil olmuştur.<br/>2016 yılında AND ekibinin kadrosundan 
                         ayrılacak ortağı Cem Tayfun Yılmaz ile birlikte Investin Gayrimenkul’ü kurdu.
                          AND de dahil olmak üzere birçok kurumsal firmaya gayrimenkul geliştirme, 
                          satış ve genel danışmanlık hizmetleri vermeye başladı.</p>
                </div>
                <div className="img_area col-12 col-sm-4 px-0 ">
                    <img src="img/parson_border_bg.png" 
                    className="w-100 mt-sm-5 mt-sm-1 " 
                    style={{backgroundImage: 'url(img/batuhan-tarkan.png)'  }} />
                </div>
            </div>
         </div>
        </div>
       </section>
      
     

           
                
                
      

{/*  */}
      
       </div>
  )
}

export default BizKimiz
