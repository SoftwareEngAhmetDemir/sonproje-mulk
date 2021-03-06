import React, { Component, forwardRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import MaterialTable, { MTableToolbar } from "material-table";
import { useTranslation } from "react-i18next";

import { Doughnut } from "react-chartjs-2";

import { DialogActions, DialogContent, Button, Dialog, Card, Tooltip, Grid, Typography } from "@material-ui/core";

import {
   Settings,
   Edit,
   GroupAdd,
   AddBox,
   ArrowUpward,
   Check,
   ChevronLeft,
   ChevronRight,
   Clear,
   DeleteOutline,
   FilterList,
   FirstPage,
   LastPage,
   Remove,
   SaveAlt,
   Search,
   ViewColumn,
   Receipt,
} from "@material-ui/icons";

import "../../assets/css/style.css";

export default function CustomersList() {
   const [t] = useTranslation();
   const history = useHistory();

   const [customergroups, seTcustomergroups] = useState([]);
   const [open, seTopen] = useState(false);
   const [details_value, seTdetails_value] = useState("");
   const [data, seTdata] = useState([]);
   const [details_label, seTdetails_label] = useState("");
   const customergroups_label = [{ title: t("groupName"), field: "name" }];
   const pieColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#cc65fe",
      "#445ce2",
      "#e244b1",
      "#0c3836",
      "#51e4b5",
      "#ff0000",
      "#6eff00",
      "#00ffe7",
      "#28a743",
      "#ff00c8",
      "#063361",
      "#1f77b4",
      "#e377c2",
      "#ff7f0e",
      "#2ca02c",
      "#bcbd22",
      "#d62728",
      "#17becf",
      "#9467bd",
      "#7f7f7f",
      "#8c564b",
      "#3366cc",
   ];

   const columns = [
      {
         title: t("Sıra"),
         field: "order",
      },
      {
         title: t("İsim"),
         field: "name",
      },
      {
         title: t("Banka Kodu"),
         field: "code",
      },
      {
         title: t("Logo "),
         render: (rowData) => {
            return <img src={rowData.images} height="80" />;
         },
      },
      {
         title: t("actions"),
         field: "_id",
         render: (rowData) => (
            <div>
               <Link to={`/panel/banks/edit/${rowData._id}`}>
                  <Edit />
               </Link>
            </div>
         ),
      },
   ];

   const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
   };

   const getBanksData = () => {
      axios.get("/banks").then((response) => {
         if (response.data.length > 0) {
            seTdata(response.data);
         }
      });
   };

   useEffect(() => {
      getBanksData();
   }, []);

   return (
      <>
         <div className="containerP">
            <Grid item container spacing={3}>
               <Grid container item md={12} className="panelGridRelative">
                  <Card className="panelLargeIcon">
                     <GroupAdd fontSize="large" />
                  </Card>
                  <Card className="listViewPaper">
                     <MaterialTable
                        title=""
                        icons={tableIcons}
                        columns={columns}
                        data={data}
                        options={{
                           exportButton: true,
                           pageSize: 10,
                           grouping: true,
                        }}
                        components={{
                           Toolbar: (props) => (
                              <div>
                                 <Typography component="h5" variant="h6" color="inherit" noWrap className="typography">
                                    {t("Bankalar")}
                                 </Typography>
                                 <Link to="/panel/bankcreate" className="addButtonPlace">
                                    <Tooltip title={t("Create Bank")}>
                                       <AddBox fontSize="large" className="addButtonIcon" />
                                    </Tooltip>
                                 </Link>
                                 <MTableToolbar {...props} />
                                 <div style={{ clear: "both" }} />
                              </div>
                           ),
                        }}
                     />
                  </Card>
               </Grid>
            </Grid>
         </div>
      </>
   );
}
