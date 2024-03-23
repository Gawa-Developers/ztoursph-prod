import PageTitle from "@components/pages/page-title";
import React, { useEffect, useMemo } from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";
import { Row } from "@components/commons/common";
import styled from "@emotion/styled";
import TripsTable from "@components/trips/tripsTable";
import { useTripsContext } from "@providers/trips";
import { getTrips, useTours } from "@app/modules/tours/actions";

const Panel = styled(Row)`
  margin: 2rem auto;
  width: 100%;
  diplay: flex;
  flex-direction: column;
`;

export default function Trips() {
  const { tripStore } = useTripsContext();
  const [store, dispatch] = useTours();

  useEffect(() => {
    getTrips(dispatch, tripStore.trips.map(({ tripId }) => tripId ) ?? []);
  }, [tripStore.trips]);

  const myTrips = useMemo(() => {
    const trips = tripStore.trips.map((trip) => {
      return {
        ...trip,
        imageUrl: trip.thumbnail,
        pickup: trip.location,
        numberOfTraveller: trip.numberOfTraveller,
      }
    });
    return trips.map((t) => ({
      ...t,
      price: store.trips.find(({ id }) => id === t.tripId )?.price ?? 0,
    }))
  }, [tripStore.trips, store.trips]);

  const isLoading = store.isLoading && tripStore.isLoading;

  return (
    <Layout>
      <PageTitle title="My Trips" bgImage={BannerImage} />
      <Panel>
        <TripsTable data={myTrips} isLoading={isLoading}/>
      </Panel>
    </Layout>
  );
}
