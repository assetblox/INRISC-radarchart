type Metrics = {
  size: number,
  score: number,
  cashflow: number,
  liquidity: number,
  operations: number,
  capital_structure: number,
};

type TestData = {
  [key: string]: Metrics,
};

const testData = {
  combined: {
    size: 87.95978509650902,
    score: 32.04413196787198,
    cashflow: 8.219002700714078,
    liquidity: 40.30135487773425,
    operations: 12.246496010182156,
    capital_structure: 22.752684023958796,
  },
  realized: {
    size: 91.20738233706632,
    score: 58.358674372685975,
    cashflow: 58.78661976274096,
    liquidity: 59.952489525408154,
    operations: 70.07988746684661,
    capital_structure: 22.570909949856905,
  },
};

export default testData ;
export type { TestData, Metrics };
