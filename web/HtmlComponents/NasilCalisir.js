import React from 'react'

function NasilCalisir() {
    return (
        <div>
         {/* 
          */}
 <section id="profile">
         <div className="container-wide-xl">
            <div className="row">
               <div className="col-md-6">
                  <div className="how">
                     <h1>Mülkedin'den Nasıl Gayrimenkul Edinirim ?</h1>
                     <span>Yandaki adımları izleyerek Mülkedin'den gayrimenkul edinme hakkında bilgil alabilirsiniz.</span>
                  </div>
               </div>
               <div className="col-md-6 mt-5 pt-5" style={{background: 'url(img/blueBg.png) center center no-repeat'}}>
                  <div className="w-75 mx-auto mt-sm-5 mr-sm-5 pr-sm-5 pt-sm-5">
                     <div id="howToBuy" className="swiper-container pr-sm-5 mr-sm-5">
                        <div className="swiper-wrapper">
                           <div className="swiper-slide">
                              <a className="tarla" href="#">
                                 <img className="first-img" src="img/icons/profVision.png" alt="" />
                                 <p className="option-title">Yatırımlık Arsalar</p>
                                 <p className="option-desc">
                                    İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.
                                 </p>
                              </a>
                           </div>
                           <div className="swiper-slide">
                              <a className="konut" href="#">
                                 <img className="first-img" src="img/icons/satilik-konutlar.png" alt="" />
                                 <p className="option-title">Satılık Konutlar</p>
                                 <p className="option-desc">
                                    İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.
                                 </p>
                              </a>
                           </div>
                           <div className="swiper-slide">
                              <a className="mustakil" href="#">
                                 <img className="first-img" src="img/icons/Mustakil-Evler.png" alt="" />
                                 <p className="option-title">Müstakil Evler</p>
                                 <p className="option-desc">
                                    İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.
                                 </p>
                              </a>
                           </div>
                           <div className="swiper-slide">
                              <a className="villa" href="#">
                                 <img className="first-img" src="img/icons/Villalar.png" alt="" />
                                 <p className="option-title">Villalar</p>
                                 <p className="option-desc">
                                    İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.
                                 </p>
                              </a>
                           </div>
                           <div className="swiper-slide">
                              <a className="daire" href="#">
                                 <img className="first-img" src="img/icons/Daireler.png" alt="" />
                                 <img className="second-img d-none" src="img/icons/Daireler2.png" alt="" />
                                 <p className="option-title">3+1 Daireler</p>
                                 <p className="option-desc">
                                    İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.
                                 </p>
                              </a>
                           </div>
                        </div>
                       
                        <div className="swiper-pagination"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>


          {/*  */}
        </div>
    )
}

export default NasilCalisir
