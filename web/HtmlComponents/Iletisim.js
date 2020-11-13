import React from 'react'


function Iletisim() {
    return (
        <div>
         <section id="contact" >
        <div className="container mt-3">
            <div className="row">
                <div className="col-12 col-md-7 float-left px-sm-0 ">
                    <h1 className="h4">Bizimle iletişime geçin</h1>
                    <p className="fontSize-11 my-3 float-left">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel dapibus odio. Praesent ut pulvinar est, vel volutpat leo. Praesent ac augue suscipit, cursus nisl a, mattis dui. Aenean nec lacus non risus scelerisque fermentum id at ipsum. Maecenas at molestie odio. Orci varius natoque penatibus et magnis dis parturient montes
                    </p>
                    <h3 className="font-weight-bold fontSize-10 mt-4 float-left w-100 mb-2">İletişim Bilgilerimiz</h3>
                    <div className="row">
                        <div className="col-sm-6 col-12 mt-3 float-left">
                            <div className="col-2 px-0 float-left">
                                <img src="img/icons/location.png" className=" w-100"/>
                            </div>
                            <div className="fontSize-9 float-left col-10 pr-0 ">
                                Atatürk Mah. Ertuğrul Gazi Cad. Metropol İstanbul C Blok No.225 Ataşehir - İSTANBUL
                            </div>
                        </div>
                        <div className="col-sm-6 col-12 mt-3 float-left">
                            <div className="col-2 px-0 float-left">
                                <img src="img/icons/time.png" className=" w-100"/>
                            </div>
                            <div className="fontSize-9 float-left col-10 pr-0 ">
                                0212 123 45 67<br/>444 123 45
                            </div>
                        </div>
                        <div className="col-sm-6 col-12 mt-3 float-left">
                            <div className="col-2 px-0 float-left">
                                <img src="img/icons/dotcom.png" className=" w-100"/>
                            </div>
                            <div className="fontSize-9 float-left col-10 pr-0 ">
                                Bir sorunuz mu var? <br/>
                                <a href="mailto:loremipsum123@gmail.com" className="mt-1 float-left"> loremipsum123@gmail.com</a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-12 mt-3 float-left">
                            <div className="col-2 px-0 float-left">
                                <img src="img/icons/picker.png" className=" w-100"/>
                            </div>
                            <div className="fontSize-9 float-left col-10 pr-0 ">
                                Hafta içi - Hafta sonuz<br/>
                                9:00 - 17:00
                            </div>
                        </div>
                    </div>
                    <h3 className="font-weight-bold fontSize-10 mt-4 float-left w-100 mb-2">Sosyal Medya Hesaplarımız</h3>
                    <i className="fab fa-twitter hover1 fontSize-12"></i>
                    <i className="fab fa-facebook-f mx-2 hover1 fontSize-12"></i>
                    <i className="fab fa-instagram hover1 fontSize-13"></i>
                </div>
                <div className="ccol-12 col-md-5 px-0 mt-5   ">
                    <img src="img/maps.png" className="w-100 float-left"/>
                </div>
                <div className="w-100 float-left border-bottom my-5"></div>
                <div className="col-12 row">
                    <h1 className="h2 w-100 float-left pl-3 pl-sm-0">Bize Mesaj Gönder</h1>
                    <div className="col-sm-8 col-12 my-4 px-0">
                        <div className="form-group float-left col-md-6 pl-3  pl-sm-0">
                            <label htmlFor="adsoyad">Ad Soyad</label>
                            <input type="text" className="form-control" id="adsoyad" placeholder="Adınız ve Soyadınız"/>
                        </div>
                        <div className="form-group  float-left col-md-6 pl-3 pl-sm-0">
                            <label htmlFor="adsoyad">E-Posta Adresi</label>
                            <input type="text" className="form-control" id="adsoyad" placeholder="Adınız ve Soyadınız"/>
                        </div>
                        <div className="form-group float-left col-md-6 pl-3  pl-sm-0">
                            <label htmlFor="adsoyad">Cep Telefonu</label>
                            <input type="text" className="form-control" id="adsoyad" placeholder="Adınız ve Soyadınız"/>
                        </div>
                        <div className="form-group float-left col-md-6 pl-3 pl-sm-0">
                            <label htmlFor="adsoyad">Mesajınız</label>
                            <textarea type="text" className="form-control" id="adsoyad" placeholder="Adınız ve Soyadınız"></textarea>
                        </div>
                        <div className="btn btn-info float-right fontSize-10 mr-3">
                            Gönder
                            <i className="fab fa-telegram-plane ml-2"></i>
                        </div> 
                    </div>
                    <div className="col-sm-4 col-12 d-none d-sm-block">
                        <img src="img/contact_flowers.png" className="w-100" />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mx-0 my-4" style={{backgroundIimage: 'url(img/contacktBanner.png)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
            <div className="container">
                <div className="col-md-6 col-12 bg-black my-md-5   float-left"  >
                    <div className="container row my-4 p-4 BGblueOpacity ">
                        <div className="col-2 px-0">
                            <img src="img/icons/forsale.png" className="w-100" />
                        </div>
                        <div className="col-10  text-white mt-2">
                            <b className="fontSize-12 font-weight-bold">Yeni İlanlar</b>
                            <p className="fontSize-10">İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 bg-black  my-md-5   float-left"  >
                    <div className="col-12 row my-4 p-4 BGblueOpacity">
                        <div className="col-2 px-0">
                            <img src="img/icons/contactIcon.png" className="w-100" />
                        </div>
                        <div className="col-10  text-white mt-2">
                            <b className="fontSize-12 font-weight-bold">Kazandıran İlanlar</b>
                            <p className="fontSize-10">İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında uzmanlarımız ile konuşun ve bilgi alın.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
       </section>
        </div>
    )
}

export default Iletisim
