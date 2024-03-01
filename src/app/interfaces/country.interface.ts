export interface ICountry {
  idd: any;
  name: ICountryName;
  cca2: string;
  cca3: string;
  altSpellings: string[];
}

export interface ICountryName {
  official: string;
  nativeName: Ifra;
}

export interface Ifra {
  fra: common;
}

export interface common {
  common: string;
}
