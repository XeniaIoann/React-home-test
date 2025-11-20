export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type TableFilter = {
  value: string;
  name: string;
};

export const tableFilters: TableFilter[] = [
  { value: 'nameAsc', name: 'Name Asc' },
  { value: 'nameDesc', name: 'Name Desc' },
  { value: 'cityAsc', name: 'City Asc' },
  { value: 'cityDesc', name: 'City Desc' },
];
