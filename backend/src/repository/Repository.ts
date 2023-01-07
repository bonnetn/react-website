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

// First n elements.
type First = {
  state: "first";
  value: number;
};

// Last n elements.
type Last = {
  state: "last";
  value: number;
};
export type Limit = First | Last;

export interface Repository {
  fetchCat(uuid: String): Promise<Cat | null>;

  searchCats(
    queryString: String,
    limit: Limit,
    after: number | null,
    before: number | null
  ): Promise<Cat[]>;
}
