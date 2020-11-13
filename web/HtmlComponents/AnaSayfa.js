import { Tooltip } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Redirect, useHistory } from "react-router-dom";
import TurkeyMap from "turkey-map-react";
import axios from "axios";
import "../../web/style.css";
import Select from "react-select";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.scss";
// import "swiper/components/pagination/pagination.scss";
// import SwiperCore, { Pagination } from "swiper";

import { PieChart } from "react-minimal-pie-chart";
// SwiperCore.use([Pagination]);

function AnaSayfa() {
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
        chart_show[index][segmentIndex].title
    );
  };

  const [open, setOpen] = useState(false);
  const [state, setState] = useState([]);
  const [category, setCategory] = useState({
    findCategory: [],
    selectedCategoryItemValue: "",
    selectedCategoryItemLabel: "",
  });

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
    getEstateCategories();
    getEstateData();
  }, []);

  return (
    <div>
      <button onClick={() => get_isin_Tipleri()}>+++</button>
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
