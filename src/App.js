import React, { useEffect, useState } from "react";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import { useDispatch } from "react-redux";
import helpers from "./helpers";

const DATA_URL = "";

const sampleConfig = {
  // haritanın durumu
  visState: {
    filters: [
      {
        id: "dateFilter_id",
        dataId: "date_id",
        name: "the name of the column to be filtered",
        type: "timeRange", //filter type to be use
      },
    ],
  },
};

function Map() {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const fetchData = async () => {
    setData(await helpers.httpGet(DATA_URL));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    data &&
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "RECENT EARTHQUAKES IN TURKEY AND ITS ENVIRONMENT",
              id: "EARTHQUAKES",
            },
            data: data,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: sampleConfig,
        })
      );
  }, [dispatch, data]);

  return (
    <KeplerGl
      id="map"
      width={window.innerWidth}
      height={window.innerHeight}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
    />
  );
}

export default Map;
