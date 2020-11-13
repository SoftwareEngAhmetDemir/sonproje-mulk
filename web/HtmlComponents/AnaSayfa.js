import { Tooltip } from "@material-ui/core";
import Axios from "axios";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Redirect, useHistory } from "react-router-dom";
import TurkeyMap from "turkey-map-react";
import axios from "axios";
import "../../web/style.css";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { Pagination } from "swiper";

import { PieChart } from "react-minimal-pie-chart";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../panel/Context/AuthContext";

SwiperCore.use([Pagination]);

function AnaSayfa() {

  const [t] = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  var [show_cities, show_cities_f] = useState([]);
  var [chart_show, char_show_f] = useState([]);
  var son_mat = [];
  var colors = [
    { color: "#E38627", Ticari: "Arsa" },
    { color: "#C13C37", Ticari: "Tarla" },
    { color: "#6A2135", Ticari: "Ticari" },
    { color: "blue", Ticari: "Konut" },
  ];
  useEffect(() => {
    async function fx() {
      // ///////////////////////////////
      await axios.get("/estate/city").then((response) => {
        if (response.data.length > 0) {
          ct = response.data;
        }
      });

      // console.log(ct);

      // //////////////////////////
      var cities;

      cities = ct.map((e) => e._id.city[0].label);

      console.log(cities);
      show_cities_f(cities);
      // //////////////////
      var city_count = ct.map((e) => e.count);

      console.log(city_count);

      // ///////////////////////
      var city_with_dup = [];

      // console.log(city_with_dup)

      // /////////////////////////////////

      var all_cities_sorted = [];

      var f = [];
      cities.map((e) => {
        city_with_dup.map((ce) => {
          if (e === ce.title) {
            // console.log(JSON.stringify(ce))
            all_cities_sorted.push(ce);
            f.push(ce.Ticari);
          }
        });
      });
      console.log(f);
      console.log(all_cities_sorted);

      // //////////////////////////////
      var tc;

      await axios.get("/estate/Ticari").then((response) => {
        if (response.data.length > 0) {
          tc = response.data;
        }
      });

      // console.log(tc)
      // /////////////////
      var sort_tc = [];
      var tow_c;
      tow_c = tc.map((e) => e.count);

      // console.log(tow_c)
      cities.map((e) => {
        tc.map((r, index) => {
          if (e === r._id.City[0].label) {
            //  console.log(r)
            var tobj = {
              title: r._id.Ticari,
              value: tow_c[index],
              city: r._id.City[0].label,
            };
            sort_tc.push(tobj);
          }
        });
      });

      console.log(sort_tc);
      // /////////////////////////

      /////////////

      var son_data = [];
      let uv = 0;
      cities.map((e, j) => {
        var nat = [];
        console.log(e);
        uv = 0;
        sort_tc.map((s, index) => {
          if (e === s.city) {
            let ind = colors.find((e) => e.Ticari === s.title);
            console.log(ind);
            nat.push({
              title: s.value,
              value: s.value,
              color: ind.color,
              turu: s.title,
            });
            uv++;
          }
        });
        son_mat.push(nat);
      });
      // ////////////////////////

      char_show_f(son_mat);
    }
    fx();
  }, []);

  const [ilan_S, ilan_S_F] = useState("");
  const [sehir_counter, setCounter] = useState("");
  const history = useHistory();

  const Go_To_Filter = (Details) => {
    //console.log(Details);

    if (sehir_counter !== "Bekleyiniz...." && sehir_counter !== "0")
      history.push("/filter?plateNumber=" + Details.plateNumber);
  };
  const Ilan_Sayisi_Harita_Uzerinde = async (Details) => {
    console.log(Details.plateNumber);
    ilan_S_F("Bekleyiniz....");
    setCounter("Bekleyiniz....");
    var plaka = [];
    await axios.get("/city/public").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);

        plaka = response.data.find(
          (item) => item.sehir_key === Details.plateNumber
        );
        console.log(plaka);
      }
    });
    console.log(JSON.stringify(plaka));
    if (JSON.stringify(plaka) !== undefined) {
      var sehir_adi = plaka.sehir_title;
      var City_Db = [];
      await axios
        .get("/estate/public")
        .then((response) => {
          if (response.data.length > 0) {
            City_Db = response.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
      var Cities_Counter = 0;
      for (let k = 0; k < City_Db.length; k++) {
        if (City_Db[k].city[0].value === sehir_adi) Cities_Counter++;
      }

      //  console.log(Cities_Counter)
      ilan_S_F(sehir_adi + " : " + Cities_Counter.toString() + " Ilan var");
      setCounter(Cities_Counter.toString());
    }
  };

  const mydata = [
    // { title: 'One', value: 10, color: '#E38627' },
    // { title: 'One', value: 10, color: '#E38627' },
    // { title: 'Three', value: 20, color: '#6A2135' },
  ];

  var ct; //cities

  const Ftr = (e, segmentIndex, index) => {
    console.log(chart_show[index][segmentIndex]);

    console.log(show_cities[index]);

    history.push(
      "/filter?city=" +
        show_cities[index] +
        "&&turu=" +
        chart_show[index][segmentIndex].turu
    );
  };

  const [open, setOpen] = useState(false);
  const [state, setState] = useState([]);
  const [category, setCategory] = useState({
    findCategory: [],
    selectedCategoryItemValue: "",
    selectedCategoryItemLabel: "",
  });
  const { gState, seTgState } = useContext(AuthContext);
  const [userState, setUserState] = useState({
    username: '',
    name: '',
    surname: '',
    favorites: [],
    id: '',
  });

  function getUserData() {
    if (user && user.id !== '') {
      if (user.role[0].customers === true) {
        axios.get(`/staff/customer/${user.id}`).then(async (response) => {
          await setUserState({
            ...userState,
            id: response.data._id,
            username: response.data.username,
            name: response.data.name,
            surname: response.data.surname,
            favorites: response.data.favorites,
          });
        });
      } else {
        axios.get(`/staff/${user.id}`).then(async (response) => {
          await setUserState({
            ...userState,
            id: response.data._id,
            username: response.data.username,
            name: response.data.name,
            surname: response.data.surname,
            favorites: response.data.favorites,
          });
        });
      }
    }
  }
  
  const getEstateData = () => {
    axios.get("/estate/public").then((response) => {
      if (response.data.length > 0) {
        setState(response.data);
      }
    });
  };

  function getEstateCategories() {
    axios
      .get("/estatecategory/public")
      .then((res) => {
        if (res.data.length > 0) {
          const details = [];
          for (const i in res.data) {
            details.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setCategory({ ...category, findCategory: details });
        }
      })
      .catch((err) => console.log(err));
  }
  const get_isin_Tipleri = async () => {
    await axios.get("/estate/public/").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
      }
    });
  };
  const handleSelectCategory = (newValue) => {
    setCategory({
      ...category,
      selectedCategoryItemValue: newValue.value,
      selectedCategoryItemLabel: newValue.label,
    });
    setOpen(true);
  };

  const estateId = state.map((estate) => {
    if (estate.chance_category) {
      return estate.chance_category.map((value) => value.value);
    }
  });

  var chanceCat = [];

  for (const estate of state) {
    if (chanceCat.indexOf(estate.chance_category) === -1) {
      if (estate.chance_category) {
        const values = estate.chance_category.map((value) => value.value);
        for (const i in values) {
          chanceCat.push(values[i]);
        }
      }
    }
  }
  // console.log(chanceCat);
  useEffect(() => {
    getUserData();
    getEstateCategories();
    getEstateData();
  }, []);

  return (
    <div>
{/* ege */}

<section id="mainSlider">
        <div className="searchBar row container-md px-0">
          <form>
            <div className="col-sm-3 col-4  px-0  float-left">
              <div className="form-control category  " id="select1">
                <Select
                  value={category.selectedCategoryItems}
                  options={category.findCategory}
                  onChange={handleSelectCategory}
                />
              </div>
            </div>
            <div className="col-sm-3 col-4  px-0  float-left">
              <div className="form-control location" id="select2">
                <Select
                  value={category.selectedCategoryItems}
                  options={category.findCategory}
                  onChange={handleSelectCategory}
                />
              </div>
            </div>
            <div className="col-sm-3 col-4  px-0  float-left">
              <div className="form-control room" id="select3">
                <Select
                  value={category.selectedCategoryItems}
                  options={category.findCategory}
                  onChange={handleSelectCategory}
                />
              </div>
            </div>
            <div className="col-sm-3 col-12  px-0 float-left">
              <div className="searchArea">
                <input
                  type="search"
                  id="gsearch"
                  name="gsearch"
                  placeholder="Aramak istediğiniz kelimeyi giriniz..."
                />
                <button type="submit">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-search"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="container justify-content-center">
          <div className="features owerflow-1200">
            <div className="li">
              <div className="ov2">
                <img src="img/icons/servicePrice.png" alt="" />
                <span>Hizmet Bedeli Avantajı</span>
              </div>
            </div>
            <div className="li">
              <div className="ov2">
                <img src="img/icons/kdv.png" alt="" />
                <span>KDV Avantajı</span>
              </div>
            </div>
            <div className="li">
              <div className="ov2">
                <img src="img/icons/authorMark.png" alt="" />
                <span>Kurumsal Satıcı</span>
              </div>
            </div>
            <div className="li">
              <div className="ov2">
                <img src="img/icons/tapu.png" alt="" />
                <span>Temiz Tapu</span>
              </div>
            </div>
            <div className="li">
              <div className="ov2">
                <img src="img/icons/seffaf.png" alt="" />
                <span>Şeffaf Satış</span>
              </div>
            </div>
            <div className="li">
              <div className="ov2">
                <img src="img/icons/experience.png" alt="" />
                <span>Mesleki Tecrübe</span>
              </div>
            </div>
            <div className="li">
              <div className="ov2">
                <img src="img/icons/profVision.png" alt="" />
                <span>Profesyonel Görüş</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!open && (
        <section id="first-slider">
          {category.findCategory.map((data) => (
            <Fragment key={data.value}>
              <div className="container">
                <h5 className="sectionTitle">
                  {data.label}
                  <span>{data.label}</span>
                </h5>
              </div>
              <div id="sliderFirst" className="slider-wrapper">
                <div className="container-fluid">
                  <h1>Lorem ipsum dolor sit amet consectetur</h1>
                  <span className="text">
                    Sit amet consectetur masa sed arcu
                  </span>
                  <Link to="">Tümüne Göz At</Link>
                </div>
                <br />
                <Swiper spaceBetween={50} slidesPerView={3}>
                  {chanceCat.map((cData) => {
                    if (cData === data.value) {
                      {
                        return state.map((estate) => (
                          <SwiperSlide>
                            <div className="swiper-wrapper">
                              <div className="swiper-slide" key={estate._id}>
                                <Link to="">
                                  <img src="img/product/product.jpg" alt="" />
                                  <div className="product-summary">
                                    <div className="summary-top">
                                      <span className="badge offer left-top">
                                        Teklif Bekleniyor
                                      </span>
                                      <span className="badge oppor right-top">
                                        Fırsat
                                      </span>
                                    </div>
                                    <div className="summary-bottom">
                                      <ul>
                                        <li>{estate.props.Fiyat} TL</li>
                                        <li>
                                          <button>
                                            <i className="fas fa-heart"></i>
                                          </button>
                                        </li>
                                        <li>
                                          Şekerbank'tan Kocaeli Başiskele'de
                                          2.400m2 arsa
                                        </li>
                                        <li>
                                          <i className="fas fa-map-marker-alt"></i>
                                          Kocaeli-Başiskele-Körfez-Arsa-Ticari
                                          İmarlı
                                        </li>
                                        <li>BRG</li>
                                      </ul>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              <div className="swiper-pagination"></div>
                            </div>
                          </SwiperSlide>
                        ));
                      }
                    }
                  })}
                </Swiper>
              </div>
              <br />
            </Fragment>
          ))}
        </section>
      )}
      {open && (
        <section id="first-slider">
          {category.selectedCategoryItemLabel && (
            <div className="container">
              <h5 className="sectionTitle">
                {category.selectedCategoryItemLabel}
                <span>{category.selectedCategoryItemLabel}</span>
              </h5>
            </div>
          )}

          <div id="sliderFirst" className="slider-wrapper">
            <div className="container-fluid">
              {category.selectedCategoryItemLabel && (
                <Fragment>
                  <br />
                  <h1>Lorem ipsum dolor sit amet consectetur</h1>
                  <span className="text">
                    Sit amet consectetur masa sed arcu
                  </span>
                  <Link to="#">Tümüne Göz At</Link>
                  <br />
                </Fragment>
              )}

              <Swiper spaceBetween={50} slidesPerView={4}>
                {state.map((estate) => {
                  if (estate.chance_category) {
                    const categoryArray = estate.chance_category;
                    return categoryArray.map((item) => {
                      if (item.value === category.selectedCategoryItemValue) {
                        return (
                          <SwiperSlide>
                            <Link to="#">
                              <img src="img/product/product.jpg" alt="" />
                              <div className="product-summary">
                                <div className="summary-top">
                                  <span className="badge offer left-top">
                                    Teklif Bekleniyor
                                  </span>
                                  <span className="badge oppor right-top">
                                    {" "}
                                    {estate.chance_category
                                      ? estate.chance_category.map((label) => (
                                          <Fragment key={label.value}>
                                            <p>{label.label}</p>
                                            <hr
                                              style={{
                                                marginTop: "0",
                                                marginBottom: 0,
                                              }}
                                            />
                                          </Fragment>
                                        ))
                                      : ""}
                                  </span>
                                </div>
                                <div className="summary-bottom">
                                  <ul>
                                    <li>{estate.props.Fiyat}</li>{" "}
                                    <li>
                                      <button>
                                        <i className="fas fa-heart"></i>
                                      </button>
                                    </li>
                                    <li>
                                      Şekerbank'tan Kocaeli Başiskele'de 2.400m2
                                      arsa
                                    </li>
                                    <li>
                                      <i className="fas fa-map-marker-alt"></i>
                                      Kocaeli-Başiskele-Körfez-Arsa-Ticari
                                      İmarlı
                                    </li>
                                    <li>BRG</li>
                                  </ul>
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        );
                      }
                    });
                  }
                })}
              </Swiper>
            </div>
          </div>
        </section>
      )}
      <section id="secondSlider">
        <div className="container-wide">
          <div id="sliderSecond" className="swiper-container">
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <Link className="tarla" to="/filter">
                    <img
                      className="first-img"
                      src="img/icons/Yatitimlik_Arsalar.png"
                      alt=""
                    />
                    <img
                      className="second-img d-none"
                      src="img/icons/Yatitimlik_Arsalar1.png"
                      alt=""
                    />
                    <p className="option-title">Yatırımlık Arsalar</p>
                    <p className="option-desc">
                      İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                      uzmanlarımız ile konuşun ve bilgi alın.
                    </p>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="konut" to="/filter">
                    <img
                      className="first-img"
                      src="img/icons/satilik-konutlar.png"
                      alt=""
                    />
                    <img
                      className="second-img d-none"
                      src="img/icons/satilik-konutlar1.png"
                      alt=""
                    />
                    <p className="option-title">Satılık Konutlar</p>
                    <p className="option-desc">
                      İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                      uzmanlarımız ile konuşun ve bilgi alın.
                    </p>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="mustakil" to="/filter">
                    <img
                      className="first-img"
                      src="img/icons/Mustakil-Evler.png"
                      alt=""
                    />
                    <img
                      className="second-img d-none"
                      src="img/icons/Mustakil-Evler1.png"
                      alt=""
                    />
                    <p className="option-title">Müstakil Evler</p>
                    <p className="option-desc">
                      İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                      uzmanlarımız ile konuşun ve bilgi alın.
                    </p>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="villa" to="/filter">
                    <img
                      className="first-img"
                      src="img/icons/Villalar.png"
                      alt=""
                    />
                    <img
                      className="second-img d-none"
                      src="img/icons/Villalar12.png"
                      alt=""
                    />
                    <p className="option-title">Villalar</p>
                    <p className="option-desc">
                      İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                      uzmanlarımız ile konuşun ve bilgi alın.
                    </p>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="daire" to="/filter">
                    <img
                      className="first-img"
                      src="img/icons/Daireler.png"
                      alt=""
                    />
                    <img
                      className="second-img d-none"
                      src="img/icons/Daireler2.png"
                      alt=""
                    />
                    <p className="option-title">3+1 Daireler</p>
                    <p className="option-desc">
                      İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                      uzmanlarımız ile konuşun ve bilgi alın.
                    </p>
                  </Link>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      



      {/*ege  */}
      {/* <button onClick={() => get_isin_Tipleri()}>+++</button> */}
      <TurkeyMap
        onClick={(Details) => Go_To_Filter(Details)}
        onHover={(Details) => Ilan_Sayisi_Harita_Uzerinde(Details)}
        cityWrapper={(cityComponent, cityData) => (
          <Tooltip title={ilan_S} key={cityData.id}>
            {cityComponent}
          </Tooltip>
        )}
      />

      {/* <img className='myimg' src='http://www.theage.com.au/ffximage/2007/09/12/mario300_narrowweb__300x392,0.jpg' 
width='200' height='150' style={{position:'absolute',bottom:'30px',
left:'10px',zIndex:'2',border:'0 none',borderRadius:'50%',objectFit:'contain',opacity:'1'}}/> */}
      <div
        style={{ width: "70%", margin: "auto" }}
        class="d-xs-none d-md-block"
      >
        <table width="60%" style={{ margin: "auto" }}>
          <tr width="70%">
            <tbody>
              {chart_show.map((e, index) => {
                return (
                  <td key={index}>
                    <PieChart
                      style={{
                        width: "200px",
                        position: "relative",
                        zIndex: "1",
                        left: "10px",
                      }}
                      onClick={(e, segmentIndex) => Ftr(e, segmentIndex, index)}
                      data={e}
                    />
                    <br />
                    <div style={{ marginLeft: "95px" }}>
                      {show_cities[index]}
                    </div>
                  </td>
                );
              })}
            </tbody>
          </tr>
        </table>
      </div>
      <br />
      <div className="d-xs-none d-md-block">
        <div
          className="row "
          style={{ margin: "auto", top: "500px", marginLeft: "100px" }}
        >
          <div
            style={{
              backgroundColor: colors[0].color,
              height: "20px",
              width: "20px",
              marginLeft: "95px",
            }}
          ></div>{" "}
          <span style={{ fontSize: "20px" }}>Arsa</span>
          <div
            style={{
              backgroundColor: colors[1].color,
              height: "20px",
              width: "20px",
              marginLeft: "95px",
            }}
          ></div>{" "}
          <span style={{ fontSize: "20px" }}>Tarla</span>
          <div
            style={{
              backgroundColor: colors[2].color,
              height: "20px",
              width: "20px",
              marginLeft: "95px",
            }}
          ></div>{" "}
          <span style={{ fontSize: "20px" }}>Ticari</span>
          <div
            style={{
              backgroundColor: colors[3].color,
              height: "20px",
              width: "20px",
              marginLeft: "95px",
            }}
          ></div>{" "}
          <span style={{ fontSize: "20px" }}>Konut</span>
        </div>

        {/* ////////////////// */}
        {/* <div style={{width:'70%',margin:'auto'}} class='d-sm-block d-xs-block d-md-none'>
      <table width='60%' style={{margin:'auto'}}>
        <tr width='70%'>
          <tbody>
            {chart_show.map((e, index) => {
              return (
                <td key={index}>
                  <PieChart
                    style={{
                      width: "200px",
                      position: "relative",
                      zIndex: "1",
                      left: "10px",
                    }}
                    onClick={(e, segmentIndex) => Ftr(e, segmentIndex, index)}
                    data={e}
                  />
                  <br />
                  <div style={{ marginLeft: "95px" }}>{show_cities[index]}</div>
                </td>
              );
            })}
          </tbody>
        </tr>
      </table>
      </div>
      <br />
      <div className='d-sm-block d-xs-block d-md-none'>
      <div className="row " style={{ margin:'auto' ,top:'500px',marginLeft:'100px'}} >
        <div 
          style={{
            backgroundColor: colors[0].color,
            height: "20px",
            width: "20px",
           marginLeft: "95px"
          }}
        ></div>{" "}
        <span style={{ fontSize: "20px" }}>Arsa</span>
        <div
          style={{
            backgroundColor: colors[1].color,
            height: "20px",
            width: "20px",
            marginLeft: "95px",
          }}
        ></div>{" "}
        <span style={{ fontSize: "20px" }}>Tarla</span>
        <div
          style={{
            backgroundColor: colors[2].color,
            height: "20px",
            width: "20px",
            marginLeft: "95px"
          }}
        ></div>{" "}
        <span style={{ fontSize: "20px" }}>Ticari</span>
        <div
          style={{
            backgroundColor: colors[3].color,
            height: "20px",
            width: "20px",
            marginLeft: "95px"
          }}
        ></div>{" "}
        <span style={{ fontSize: "20px" }}>Konut</span>
      </div>
      </div> */}
        {/* ////////////////////////// */}
      </div>
    </div>
  );
}

export default AnaSayfa;
