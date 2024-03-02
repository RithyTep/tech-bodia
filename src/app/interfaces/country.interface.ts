export interface ICountry {
  name: {
    common: string;
    nativeName?: {
      fra?: {
        common: string;
      };
    };
  };
  flags: {
    svg: string;
  };
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: {
    root: string;
  };
  area: number;
  capital: string[];
  region: string;
  subregion: string;
  borders: string[];
  population: number;
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[];
}
