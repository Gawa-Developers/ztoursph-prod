import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Tooltip } from "@chakra-ui/react";
import { MdOutlineAirplaneTicket, MdPerson } from "react-icons/md";
import { MENU_LINKS } from "@constants/nav";
import Link from "next/link";
import { useTripsContext } from "@providers/trips";
import { useCookies } from "react-cookie";
import { Added_Trips } from "@constants/added_trips";
import { getTrips } from "@app/modules/trips/actions";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("./menu"), { ssr: false });

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  > a {
    margin-right: 35px;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 1024px) {
    > a {
      font-size: 10px;
    }
  }
`;

const MainNav = ({ sticky }) => {
  const { tripStore, tripDispatch } = useTripsContext();
  const [cookie] = useCookies([Added_Trips]);

  useEffect(() => {
    getTrips(tripDispatch, cookie[Added_Trips] ?? []);
  }, []);

  return (
    <Container className="hidden lg:!flex">
      <Menu />
      <Tooltip label="My Trips">
        <Link href="/trips" className="relative">
          <MdOutlineAirplaneTicket
            color={sticky ? "black" : "white"}
            size="2em"
          />
          {tripStore.trips.length > 0 && (
            <span className="absolute -right-1 -mt-5 bg-red-600 rounded-full text-white text-xs w-4 h-4 text-center">
              {tripStore.trips.length}
            </span>
          )}
        </Link>
      </Tooltip>
      {/* <Tooltip label="My Account">
        <Link href="/account">
          <MdPerson size="2em" />
        </Link>
      </Tooltip> */}
    </Container>
  );
};

export default MainNav;
