export type Cat = {
  id: number;
  uuid: string;
  name: string;
  age: number;
  owner: Owner;
};

export type Owner = {
  uuid: string;
  name: string;
};

export interface Repository {
  fetchCat(uuid: String): Promise<Cat | null>;

  searchCats(
    queryString: String,
    first: number | null,
    after: number | null,
    last: number | null,
    before: number | null
  ): Promise<Cat[]>;
}
