import styled from "@emotion/styled";
import HeaderSection from "@components/commons/header-section";
import ListingCard from "@components/listing/listing-card";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React, { useState } from "react";
import { TToursResponse } from "@app/modules/tours/types";
import Loading from "@components/commons/loading";
import { getTours, useTours } from "@app/modules/tours/actions";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
  width: 100%;
  @media (max-width: 1085px) {
    width: 90%;
  }
`;

const Description = styled.div`
  font-size: 0.9rem;
  display: flex;
  color: #596363;
  justify-content: space-between;

  a {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const LoadMoreButton = styled(Button)`
  margin: auto;

  &.ant-btn-primary {
    background-color: transparent !important;
    border-color: #23432c !important;
    color: #23432c !important;

    &:hover {
      background-color: #23432c !important;
      border-color: #23432c !important;
    }
  }
`;

export default function Tours() {
  const pageSize = 9;
  const [state, setState] = useState({
    pageNumber: 1,
    totalItems: 0,
  });
  const [store, dispatch] = useTours();

  React.useEffect(() => {
    const { pageNumber } = state;
    console.log('get')
    getTours(dispatch, { pageNumber, pageSize });
  }, []);

  const handleLoadMore = () => {
    if (store.totalRecords > state.totalItems) {
      const { pageNumber } = state;
      getTours(dispatch, { pageNumber: pageNumber + 1, pageSize });
      setState(s => ({ ...s, pageNumber: s.pageNumber + 1, totalItems: s.totalItems + pageSize }));
    }
  }

  console.log(store)

  return (
    <Layout contained>
      <Row className="!mt-10">
        <HeaderSection>Our Tour Collection</HeaderSection>
      </Row>
      <Row className="!mt-5 !mb-10">
        <Description>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pharetra, lacus eget consectetur eleifend, quam sem mattis dolor,
            non sodales tellus nulla nec est.
          </p>
        </Description>
      </Row>

      <Row>
        {store?.tours.length !== 0 && store.tours && (
          <>
            <ListCardsContainer>
              {store.tours?.map((data, key) => (
                <ListingCard key={key} data={data} />
              ))}
            </ListCardsContainer>
          </>
        )}
      </Row>
      <Row className="flex flex-col items-center justify-center space-y-5 !my-10">
        { store.isLoading && <Loading /> }
          { (store.tours.length > 0 && store.tours.length !== store.totalRecords) && 
            <LoadMoreButton
              onClick={handleLoadMore}
              type="primary">
              Load More Tours
            </LoadMoreButton>
          }
      </Row>
    </Layout>
  );
}
