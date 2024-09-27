// import React from "react";

import Map from "../components/common/Map/Map";

export default function OrdersMap() {
  return (
    <>
      <Map
        center={{
          lat: -5.0635954,
          lng: -42.7963721,
        }}
        zoom={12}
      />
    </>
  );
}
