
type Scale = {
  color: string,
  pointColor: string,
  backgroundColor: string,
  borderColor: string,
  title: string,
};

type Scales = {
  [key: string]: Scale;
};

const scales: Scales = {
  realized: {
    color: 'rgba(167, 215, 96, 1)',
    pointColor: 'rgba(167, 215, 96, 1)',
    backgroundColor: 'rgba(167, 215, 96, 0.1)',
    borderColor: 'rgba(167, 215, 96, 0)',
    title: 'Realized financials',
  },
  combined: {
    color: 'rgba(61, 76, 178, 0.3)',
    pointColor: 'rgba(61, 76, 178, 1)',
    backgroundColor: 'rgba(61, 76, 178, 0.2)',
    borderColor: 'rgba(61, 76, 178, 0)',
    title: 'Combined with projected',
  },
  projection: {
    color: 'rgba(231, 152, 83, 0.6)',
    pointColor: 'rgba(231, 152, 83, 1)',
    backgroundColor: 'rgba(231, 152, 83, 0.6)',
    borderColor: 'rgba(231, 152, 83, 0)',
    title: 'Projections only',
  },
};

export default scales;
export type { Scale, Scales };
