import React, { useContext, useEffect, useState } from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./style.css";
import { UnfoldLessOutlined } from "@material-ui/icons";
import { Button, Input, TextField } from "@material-ui/core";
import Axios from "axios";
// import { AuthContext } from "../../panel/Context/AuthContext";
import { AuthContext } from "../panel/Context/AuthContext";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://softwareengahmetdemir.github.io/mysocket";

export default React.memo(function CardDetails() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const [teklif, setTeklif] = useState(0);
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("cardid");
  const [props, setProps] = useState([]);

  // //////////////////

  function timeDiffCalc(dateFuture, dateNow) {
    if (dateFuture.getFullYear() < dateNow.getFullYear()) {
      return "tarih gecti";
    } else {
      if (
        dateFuture.getFullYear() === dateNow.getFullYear() &&
        dateFuture.getMonth() < dateNow.getMonth()
      ) {
        return "tarih gecti";
      } else {
        if (
          dateFuture.getFullYear() === dateNow.getFullYear() &&
          dateFuture.getMonth() === dateNow.getMonth() &&
          dateFuture.getDate() < dateNow.getDate()
        ) {
          return "tarih gecti";
        } else {
          if (
            dateFuture.getFullYear() === dateNow.getFullYear() &&
            dateFuture.getMonth() === dateNow.getMonth() &&
            dateFuture.getDate() === dateNow.getDate() &&
            dateFuture.getHours() < dateNow.getHours()
          ) {
            return "tarih gecti";
          }
        }

        if (
          dateFuture.getFullYear() === dateNow.getFullYear() &&
          dateFuture.getMonth() === dateNow.getMonth() &&
          dateFuture.getDate() === dateNow.getDate() &&
          dateFuture.getHours() === dateNow.getHours() &&
          dateFuture.getMinutes() === dateNow.getMinutes()
        ) {
          return "tarih gecti";
        }

        if (
          dateFuture.getFullYear() === dateNow.getFullYear() &&
          dateFuture.getMonth() === dateNow.getMonth() &&
          dateFuture.getDate() === dateNow.getDate() &&
          dateFuture.getHours() === dateNow.getHours() &&
          dateFuture.getMinutes() === dateNow.getMinutes() &&
          dateFuture.getSeconds() === dateNow.getSeconds()
        ) {
          return "tarih gecti";
        }
      }
    }

    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    // console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    // console.log('minutes', minutes);
    // console.log(diffInMilliSeconds)
    // console.log('seconds ',seconds)
    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day : ` : `${days} days, `;
    }

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour : ` : `${hours} hours, `;

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;

    // return `${days} days : ${hours} hours: ${minutes} minutes : ${diffInMilliSeconds} seconds `
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: Math.floor(diffInMilliSeconds),
    };
  }

  // /////////////////////////

  async function fx() {
    await Axios.get(`/estate/public/${id}`).then(async (response) => {
      if (response.data.length > 0) {
        console.log(response.data[0].end_date);
        setInterval(() => {
          settarih(
            timeDiffCalc(new Date(response.data[0].end_date), new Date())
          );
        }, 1000);

        setProps([...response.data]);
      }
    });
    // return;
  }

  const [tarih, settarih] = useState("");
  // const [katilan]

  const [response, setResponse] = useState("");
  const myref = React.createRef("");

  const get_fiyat = async () => {
    setResponse("bekleyiniz");
    // setResponse('bekleyiniz')

    await Axios.get(ENDPOINT + `/${id}`).then((response) => {
      if (response.data.length > 0) {
        setResponse(response.data);
      }
    });
    // return;
  };

  const teklifveme = async () => {
    console.log(myref.current.value);
    if (Number(response) < Number(myref.current.value)) {
      // update
      await Axios.get(
        ENDPOINT +
          `/update/${id}/${user.id}/${user.name}/${myref.current.value}`
      ).then(async (response) => {
        if (response.data.length > 0) {
          const socket = socketIOClient(ENDPOINT, {
            transports: ["websocket", "polling", "flashsocket"],
          });
          socket.on("name", (data) => {
            setResponse(data);
          });
        }
      });
    }

    console.log("response ", response);
    if (response === "dahayok") {
      // insert
      // console.log('evet')
      await Axios.get(
        ENDPOINT +
          `/insertfiyat/${id}/${user.id}/${user.name}/${myref.current.value}/${props[0].end_date}`
      ).then(async (response) => {
        if (response.data.length > 0) {
          const socket = socketIOClient(ENDPOINT, {
            transports: ["websocket", "polling", "flashsocket"],
          });
          socket.on("name", (data) => {
            setResponse(data);
          });
        }
      });
    } else {
      console.log("hayir");
    }
  };

  useEffect(() => {
    fx();

    get_fiyat();

    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("name", (data) => {
      setResponse(data);
    });

    // console.log(props.id[0])
  }, []);

  if (props.length > 0)
    return (
      <div>
        <script crossorigin src={ENDPOINT}></script>
        {/* {teklif} */}
        {/* {JSON.stringify(props[0])} */}
        {/* name :{response}
      
        {
        
      
      tarih!=='tarih gecti'?  JSON.stringify( tarih):'tarih gecti'} */}
        <section id="pdp">
          <div class="col-md-12 p-0 pattern-bg mt-5">
            <div class="container-wide-xl">
              <div class="row">
                <div class="pdp-top px-0 col-md-12">
                  <h1>Şekerbank'tan Kocaeli Başiskele'de 2.400m2 Arsa</h1>
                  <div
                    id="sliderProductDetail"
                    class="swiper-container d-block d-md-none"
                  >
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <a href="#">
                          <img
                            src="img/product/house1.jpg"
                            alt=""
                            class="w-100"
                            data-title="test"
                          />
                        </a>
                      </div>
                      <div class="swiper-slide">
                        <a href="#">
                          <img
                            src="img/product/room2.jpg"
                            alt=""
                            class="w-100"
                            data-title="test"
                          />
                        </a>
                      </div>
                      <div class="swiper-slide">
                        <a href="#">
                          <img
                            src="img/product/room3.jpg"
                            alt=""
                            class="w-100"
                            data-title="test"
                          />
                        </a>
                      </div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                  </div>
                  <ul class="gallery d-none d-md-block">
                    {props[0]["images"].map((e) => {
                      return (
                        <li>
                          <a class="grouped_elements" rel="group1" href={e}>
                            <img src={e} alt={e} data-title="test" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <div class="pdp-top-bottom">
                    <div class="row">
                      <div class="col-md-6 order-2 order-md-0 mt-4 mt-md-0">
                        <i
                          class="fas fa-map-marker-alt float-left"
                          aria-hidden="true"
                        ></i>
                        <p class="float-left">
                          {props[0].title}
                          <span>Satılık {props[0].Ticar}</span>
                        </p>
                        <div class="d-blovk d-md-none float-right mr-3">
                          <img
                            src="img/bankLogo/BurganBank_Logo.png"
                            alt="#"
                            class=""
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <ul>
                          <li>
                            <a href="#">Parsel Sorgula</a>
                          </li>
                          <li>
                            <a href="#">Yol Tarifi Al</a>
                          </li>
                          <li class="d-none d-md-block">
                            <img
                              src="img/bankLogo/BurganBank_Logo.png"
                              alt="#"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-wide-xl">
            <div class="row">
              <div class="container w-100 d-md-none px-0 mx-0 mb-3">
                <div class="col-6 float-left pl-0">
                  <a
                    href="javascript:;"
                    class="btn w-100 shadow py-2 border"
                    id="aciklama"
                  >
                    {props[0].note}
                  </a>
                </div>
                <div class="col-6 float-left pr-0">
                  <a
                    href="javascript:;"
                    class="btn w-100 shadow py-2 border"
                    id="ozellikler"
                  >
                    Özellikler
                  </a>
                </div>
              </div>
              <div class="col-md-7 col-lg-9 col-12">
                <div class="ozellikler w-100 float-left dnone">
                  <div class="detail-first-part">
                    <ul class="prop-title">
                      <li>Ada</li>
                      <li>BB No</li>
                      <li>Parsel</li>
                      <li>Yapının DUrumu</li>
                      <li>Binanın Yaşı</li>
                    </ul>
                    <ul class="prop-desc">
                      <li>{props[0].props.Ada}</li>
                      <li>{props[0].props.BBNO}</li>
                      <li>{props[0].props.Parsel}</li>
                      <li>{props[0].props.YapininDurumu}</li>
                      <li>{props[0].props.binayasi}</li>
                    </ul>
                    <ul class="prop-title">
                      <li>Binadaki Kat Sayısı</li>
                      <li>Yapım Yılı</li>
                      <li>WC Sayısı</li>
                      <li>Banyo Sayısı</li>
                      <li>Balkon Sayısı</li>
                    </ul>
                    <ul class="prop-desc">
                      <li>{props[0].props.BinadakiKatSayisi}</li>
                      <li>{props[0].props.YapimYili}</li>
                      <li>{props[0].props.wcsayisi}</li>

                      <li>{props[0].props.BanyoSayisi}</li>
                      <li>{props[0].props.balkon}</li>
                    </ul>
                    <ul class="prop-title">
                      <li>Isınma Tipi</li>
                      <li>Yapı İnşa Tarzı</li>
                      <li>Kredi Uygunluk</li>
                    </ul>
                    <ul class="prop-desc">
                      <li>{props[0].props.isitmaTipi}</li>
                      <li>{props[0].props.YapiinsaaTarzi}</li>
                      <li>{props[0].props.KrediyeUygunluk}</li>
                    </ul>
                  </div>
                  <div class="detail-second-part">
                    <p class="title">Özellikler</p>
                    <ul>
                      <li class="title">İç Özellikler</li>
                      <li class="full">Duşakabin</li>
                      <li class="empty">Banyo</li>
                    </ul>
                    <ul>
                      <li class="title">Dış Özellikler</li>
                      <li class="full">Asansör</li>
                      <li class="empty">Otopark</li>
                      <li class="full">Spor Salonu</li>
                      <li class="full">Yüzme Havuzu</li>
                    </ul>
                  </div>
                </div>
                <div class="detail-third-part dnone">
                  <p class="title">Açıklamalar</p>
                  <p class="desc">{props[0].note}</p>
                  <p class="title">Adres</p>
                  <p class="desc">
                    {/* Atatürk Mh. Ertuğrul Gazi cd. Metropol İstanbul C1 Blok
                    No.225 Ataşehir/İstanbul */}
                    {props[0].neighborhood[0].label} Mh.{" "}
                    {props[0].town[0].label} cd . {props[0].city[0].label}
                  </p>
                  {/* video video_embed */}
                  <div class="video">
                    <p class="title">Uzmanından Videolar</p>
                    <iframe
                      width="100%"
                      height="315"
                      src={props[0].video_embed}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>

                <div class="detail-fourth-part d-none d-md-block">
                  <h2 class="title">Nasıl Teklif Veririm?</h2>
                  <div class="owerflow-700 pb-5">
                    <ul class="howOffer d-flex">
                      <li>
                        <h4>İmzalayın</h4>
                        <a href="#">
                          <div>
                            <img
                              class="first-img"
                              src="img/icons/footerIcon4.png"
                            />
                            <img
                              class="second-img d-none"
                              src="img/icons/footerHover4.png"
                            />
                          </div>
                        </a>
                        <p class="d-none d-md-block">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor .
                        </p>
                      </li>
                      <li>
                        <h4>Ödeyin</h4>
                        <a href="#">
                          <div>
                            <img
                              class="first-img"
                              src="img/icons/footerIcon5.png"
                            />
                            <img
                              class="second-img d-none"
                              src="img/icons/footerHover5.png"
                            />
                          </div>
                        </a>
                        <p class="d-none d-md-block">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor .
                        </p>
                      </li>
                      <li>
                        <h4>Kazanın</h4>
                        <a href="#">
                          <div>
                            <img
                              class="first-img"
                              src="img/icons/footerIcon7.png"
                            />
                            <img
                              class="second-img d-none"
                              src="img/icons/footerHover7.png"
                            />
                          </div>
                        </a>
                        <p class="d-none d-md-block">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor .
                        </p>
                      </li>
                      <li>
                        <h4>Edinin</h4>
                        <a href="#">
                          <div>
                            <img
                              class="first-img"
                              src="img/icons/footerIcon6.png"
                            />
                            <img
                              class="second-img d-none"
                              src="img/icons/footerHover6.png"
                            />
                          </div>
                        </a>
                        <p class="d-none d-md-block">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor .
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-5 col-lg-3 px-0">
                <div>
                  <div class="candidate">
                    <div class="wrapper">
                      <i class="fas fa-clock"></i>
                      <p>
                        {tarih !== "tarih gecti"
                          ? tarih.days +
                            " : " +
                            tarih.hours +
                            " : " +
                            tarih.minutes +
                            " : " +
                            tarih.seconds
                          : "tarih gecti"}
                        <br />

                        <div style={{ marginLeft: "20px" }}>
                          {" "}
                          Gün:saat:dk:sn
                        </div>
                      </p>
                    </div>
                  </div>
                  <div class="candidate">
                    <div class="wrapper">
                      <i class="fas fa-user-alt"></i>
                      <p>
                        <span>123.2131</span>Kişi İhaleye Katıldı
                      </p>
                    </div>
                  </div>
                  <div class="startPrice">
                    <p>
                      Başlangıç Fiyatı:<span>{response} TL</span>
                    </p>
                  </div>
                  <div class="bit-area">
                    <p class="title">Sonraki Teklif </p>
                    <div class="number">
                      <span class="minus">-</span>
                      <input type="text" ref={myref} />
                      <span class="plus">+</span>
                    </div>
                    <div class="post-desc">
                      <p class="priceNote">
                        Minimum Artış Tutarı <span>20.000,00 TL'dir</span>
                      </p>
                      <ul>
                        <li>Hizmet Bedeli</li>
                        <li class="bold">50.000 TL</li>
                        <li>
                          İhaleye katılabilmeniz için belirtilmiş hizmet
                          bedelini yatımanız gerekmektedir. TR94 2323 2334 4549
                          4595 99
                        </li>
                      </ul>
                    </div>
                    <button type="submit" onClick={teklifveme}>
                      TEKLİF VER
                    </button>
                  </div>
                  <div class="information">
                    <a href="tel:+6494461709">
                      <i class="fas fa-phone-alt"></i>444 123 12
                    </a>
                    <span>Nasıl yardımcı olabiliriz?</span>
                    <p>
                      Bu ilan hakkında bilgi almak a da görmek için biizmle
                      iletişime geçebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
              <div class="detail-fourth-part d-block d-md-none">
                <h2 class="title">Nasıl Teklif Veririm?</h2>
                <div class="owerflow-700 pb-5">
                  <ul class="howOffer d-flex">
                    <li>
                      <h4>İmzalayın</h4>
                      <a href="#">
                        <div>
                          <img
                            class="first-img"
                            src="img/icons/footerIcon4.png"
                          />
                          <img
                            class="second-img d-none"
                            src="img/icons/footerHover4.png"
                          />
                        </div>
                      </a>
                      <p class="d-none d-md-block">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor .
                      </p>
                    </li>
                    <li>
                      <h4>Ödeyin</h4>
                      <a href="#">
                        <div>
                          <img
                            class="first-img"
                            src="img/icons/footerIcon5.png"
                          />
                          <img
                            class="second-img d-none"
                            src="img/icons/footerHover5.png"
                          />
                        </div>
                      </a>
                      <p class="d-none d-md-block">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor .
                      </p>
                    </li>
                    <li>
                      <h4>Kazanın</h4>
                      <a href="#">
                        <div>
                          <img
                            class="first-img"
                            src="img/icons/footerIcon7.png"
                          />
                          <img
                            class="second-img d-none"
                            src="img/icons/footerHover7.png"
                          />
                        </div>
                      </a>
                      <p class="d-none d-md-block">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor .
                      </p>
                    </li>
                    <li>
                      <h4>Edinin</h4>
                      <a href="#">
                        <div>
                          <img
                            class="first-img"
                            src="img/icons/footerIcon6.png"
                          />
                          <img
                            class="second-img d-none"
                            src="img/icons/footerHover6.png"
                          />
                        </div>
                      </a>
                      <p class="d-none d-md-block">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor .
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery-1.12.4.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/select2.full.min.js"></script>
        <script src="js/simple-lightbox.min.js"></script>
        <script src="js/jquery.sticky.js"></script>
        <script
          src="https://kit.fontawesome.com/cf2825ec5d.js"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        <script src="js/main.min.js"></script>
      </div>
    );
  else return <div>Beklyein</div>;
});
