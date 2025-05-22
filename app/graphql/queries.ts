import { gql } from '@apollo/client';

export const GET_COUNTIRES = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      currency
      continent {
        name
      }
    }
  }
`;
