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
  fetchOneCat(uuid: String): Promise<Cat | null>;

  searchCats(
    queryString: String,
    limit: number,
    after: number | null
  ): Promise<Cat[]>;
}
