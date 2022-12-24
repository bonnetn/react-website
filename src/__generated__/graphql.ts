/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** An object with globally unique ID */
export type Node = {
  /** A globally unique identifier */
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Table containing cats */
export type Cats = Node & {
  __typename?: 'cats';
  age: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  id: Scalars['ID'];
  name: Scalars['String'];
  /** An object relationship */
  owner: Owners;
  owner_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
  uuid: Scalars['uuid'];
};

/** A Relay connection object on "cats" */
export type CatsConnection = {
  __typename?: 'catsConnection';
  edges: Array<CatsEdge>;
  pageInfo: PageInfo;
};

export type CatsEdge = {
  __typename?: 'catsEdge';
  cursor: Scalars['String'];
  node: Cats;
};

/** aggregated selection of "cats" */
export type Cats_Aggregate = {
  __typename?: 'cats_aggregate';
  aggregate?: Maybe<Cats_Aggregate_Fields>;
  nodes: Array<Cats>;
};

export type Cats_Aggregate_Bool_Exp = {
  count?: InputMaybe<Cats_Aggregate_Bool_Exp_Count>;
};

export type Cats_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Cats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Cats_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "cats" */
export type Cats_Aggregate_Fields = {
  __typename?: 'cats_aggregate_fields';
  avg?: Maybe<Cats_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Cats_Max_Fields>;
  min?: Maybe<Cats_Min_Fields>;
  stddev?: Maybe<Cats_Stddev_Fields>;
  stddev_pop?: Maybe<Cats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Cats_Stddev_Samp_Fields>;
  sum?: Maybe<Cats_Sum_Fields>;
  var_pop?: Maybe<Cats_Var_Pop_Fields>;
  var_samp?: Maybe<Cats_Var_Samp_Fields>;
  variance?: Maybe<Cats_Variance_Fields>;
};


/** aggregate fields of "cats" */
export type Cats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "cats" */
export type Cats_Aggregate_Order_By = {
  avg?: InputMaybe<Cats_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Cats_Max_Order_By>;
  min?: InputMaybe<Cats_Min_Order_By>;
  stddev?: InputMaybe<Cats_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Cats_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Cats_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Cats_Sum_Order_By>;
  var_pop?: InputMaybe<Cats_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Cats_Var_Samp_Order_By>;
  variance?: InputMaybe<Cats_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "cats" */
export type Cats_Arr_Rel_Insert_Input = {
  data: Array<Cats_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Cats_On_Conflict>;
};

/** aggregate avg on columns */
export type Cats_Avg_Fields = {
  __typename?: 'cats_avg_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "cats" */
export type Cats_Avg_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "cats". All fields are combined with a logical 'AND'. */
export type Cats_Bool_Exp = {
  _and?: InputMaybe<Array<Cats_Bool_Exp>>;
  _not?: InputMaybe<Cats_Bool_Exp>;
  _or?: InputMaybe<Array<Cats_Bool_Exp>>;
  age?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<Owners_Bool_Exp>;
  owner_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "cats" */
export enum Cats_Constraint {
  /** unique or primary key constraint on columns "id" */
  CatsPkey = 'cats_pkey',
  /** unique or primary key constraint on columns "uuid" */
  CatsUuidKey = 'cats_uuid_key'
}

/** input type for incrementing numeric columns in table "cats" */
export type Cats_Inc_Input = {
  age?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  owner_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "cats" */
export type Cats_Insert_Input = {
  age?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Owners_Obj_Rel_Insert_Input>;
  owner_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  uuid?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Cats_Max_Fields = {
  __typename?: 'cats_max_fields';
  age?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  uuid?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "cats" */
export type Cats_Max_Order_By = {
  age?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Cats_Min_Fields = {
  __typename?: 'cats_min_fields';
  age?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  uuid?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "cats" */
export type Cats_Min_Order_By = {
  age?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "cats" */
export type Cats_Mutation_Response = {
  __typename?: 'cats_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Cats>;
};

/** on_conflict condition type for table "cats" */
export type Cats_On_Conflict = {
  constraint: Cats_Constraint;
  update_columns?: Array<Cats_Update_Column>;
  where?: InputMaybe<Cats_Bool_Exp>;
};

/** Ordering options when selecting data from "cats". */
export type Cats_Order_By = {
  age?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<Owners_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cats */
export type Cats_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "cats" */
export enum Cats_Select_Column {
  /** column name */
  Age = 'age',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Uuid = 'uuid'
}

/** input type for updating data in table "cats" */
export type Cats_Set_Input = {
  age?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  uuid?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Cats_Stddev_Fields = {
  __typename?: 'cats_stddev_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "cats" */
export type Cats_Stddev_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Cats_Stddev_Pop_Fields = {
  __typename?: 'cats_stddev_pop_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "cats" */
export type Cats_Stddev_Pop_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Cats_Stddev_Samp_Fields = {
  __typename?: 'cats_stddev_samp_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "cats" */
export type Cats_Stddev_Samp_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Cats_Sum_Fields = {
  __typename?: 'cats_sum_fields';
  age?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  owner_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "cats" */
export type Cats_Sum_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** update columns of table "cats" */
export enum Cats_Update_Column {
  /** column name */
  Age = 'age',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Uuid = 'uuid'
}

export type Cats_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Cats_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Cats_Set_Input>;
  where: Cats_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Cats_Var_Pop_Fields = {
  __typename?: 'cats_var_pop_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "cats" */
export type Cats_Var_Pop_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Cats_Var_Samp_Fields = {
  __typename?: 'cats_var_samp_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "cats" */
export type Cats_Var_Samp_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Cats_Variance_Fields = {
  __typename?: 'cats_variance_fields';
  age?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  owner_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "cats" */
export type Cats_Variance_Order_By = {
  age?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "cats" */
  delete_cats?: Maybe<Cats_Mutation_Response>;
  /** delete single row from the table: "cats" */
  delete_cats_by_pk?: Maybe<Cats>;
  /** delete data from the table: "owners" */
  delete_owners?: Maybe<Owners_Mutation_Response>;
  /** delete single row from the table: "owners" */
  delete_owners_by_pk?: Maybe<Owners>;
  /** insert data into the table: "cats" */
  insert_cats?: Maybe<Cats_Mutation_Response>;
  /** insert a single row into the table: "cats" */
  insert_cats_one?: Maybe<Cats>;
  /** insert data into the table: "owners" */
  insert_owners?: Maybe<Owners_Mutation_Response>;
  /** insert a single row into the table: "owners" */
  insert_owners_one?: Maybe<Owners>;
  /** update data of the table: "cats" */
  update_cats?: Maybe<Cats_Mutation_Response>;
  /** update single row of the table: "cats" */
  update_cats_by_pk?: Maybe<Cats>;
  /** update multiples rows of table: "cats" */
  update_cats_many?: Maybe<Array<Maybe<Cats_Mutation_Response>>>;
  /** update data of the table: "owners" */
  update_owners?: Maybe<Owners_Mutation_Response>;
  /** update single row of the table: "owners" */
  update_owners_by_pk?: Maybe<Owners>;
  /** update multiples rows of table: "owners" */
  update_owners_many?: Maybe<Array<Maybe<Owners_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CatsArgs = {
  where: Cats_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cats_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_OwnersArgs = {
  where: Owners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Owners_By_PkArgs = {
  uuid: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_CatsArgs = {
  objects: Array<Cats_Insert_Input>;
  on_conflict?: InputMaybe<Cats_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cats_OneArgs = {
  object: Cats_Insert_Input;
  on_conflict?: InputMaybe<Cats_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OwnersArgs = {
  objects: Array<Owners_Insert_Input>;
  on_conflict?: InputMaybe<Owners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Owners_OneArgs = {
  object: Owners_Insert_Input;
  on_conflict?: InputMaybe<Owners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CatsArgs = {
  _inc?: InputMaybe<Cats_Inc_Input>;
  _set?: InputMaybe<Cats_Set_Input>;
  where: Cats_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cats_By_PkArgs = {
  _inc?: InputMaybe<Cats_Inc_Input>;
  _set?: InputMaybe<Cats_Set_Input>;
  pk_columns: Cats_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Cats_ManyArgs = {
  updates: Array<Cats_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OwnersArgs = {
  _inc?: InputMaybe<Owners_Inc_Input>;
  _set?: InputMaybe<Owners_Set_Input>;
  where: Owners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Owners_By_PkArgs = {
  _inc?: InputMaybe<Owners_Inc_Input>;
  _set?: InputMaybe<Owners_Set_Input>;
  pk_columns: Owners_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Owners_ManyArgs = {
  updates: Array<Owners_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** Table of owners */
export type Owners = Node & {
  __typename?: 'owners';
  /** An array relationship */
  cats: Array<Cats>;
  /** An aggregate relationship */
  cats_aggregate: Cats_Aggregate;
  /** An array relationship connection */
  cats_connection: CatsConnection;
  created_at: Scalars['timestamptz'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  uuid: Scalars['uuid'];
};


/** Table of owners */
export type OwnersCatsArgs = {
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};


/** Table of owners */
export type OwnersCats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};


/** Table of owners */
export type OwnersCats_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};

/** A Relay connection object on "owners" */
export type OwnersConnection = {
  __typename?: 'ownersConnection';
  edges: Array<OwnersEdge>;
  pageInfo: PageInfo;
};

export type OwnersEdge = {
  __typename?: 'ownersEdge';
  cursor: Scalars['String'];
  node: Owners;
};

/** Boolean expression to filter rows from the table "owners". All fields are combined with a logical 'AND'. */
export type Owners_Bool_Exp = {
  _and?: InputMaybe<Array<Owners_Bool_Exp>>;
  _not?: InputMaybe<Owners_Bool_Exp>;
  _or?: InputMaybe<Array<Owners_Bool_Exp>>;
  cats?: InputMaybe<Cats_Bool_Exp>;
  cats_aggregate?: InputMaybe<Cats_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "owners" */
export enum Owners_Constraint {
  /** unique or primary key constraint on columns "id" */
  OwnersIdKey = 'owners_id_key',
  /** unique or primary key constraint on columns "uuid" */
  OwnersPkey = 'owners_pkey'
}

/** input type for incrementing numeric columns in table "owners" */
export type Owners_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "owners" */
export type Owners_Insert_Input = {
  cats?: InputMaybe<Cats_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  uuid?: InputMaybe<Scalars['uuid']>;
};

/** response of any mutation on the table "owners" */
export type Owners_Mutation_Response = {
  __typename?: 'owners_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Owners>;
};

/** input type for inserting object relation for remote table "owners" */
export type Owners_Obj_Rel_Insert_Input = {
  data: Owners_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Owners_On_Conflict>;
};

/** on_conflict condition type for table "owners" */
export type Owners_On_Conflict = {
  constraint: Owners_Constraint;
  update_columns?: Array<Owners_Update_Column>;
  where?: InputMaybe<Owners_Bool_Exp>;
};

/** Ordering options when selecting data from "owners". */
export type Owners_Order_By = {
  cats_aggregate?: InputMaybe<Cats_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: owners */
export type Owners_Pk_Columns_Input = {
  uuid: Scalars['uuid'];
};

/** select columns of table "owners" */
export enum Owners_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Uuid = 'uuid'
}

/** input type for updating data in table "owners" */
export type Owners_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  uuid?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "owners" */
export enum Owners_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Uuid = 'uuid'
}

export type Owners_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Owners_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Owners_Set_Input>;
  where: Owners_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship connection */
  cats_connection: CatsConnection;
  node?: Maybe<Node>;
  /** fetch data from the table: "owners" */
  owners_connection: OwnersConnection;
  /** execute function "search_cats" which returns "cats" */
  search_cats_connection: CatsConnection;
};


export type Query_RootCats_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};


export type Query_RootNodeArgs = {
  id: Scalars['ID'];
};


export type Query_RootOwners_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Owners_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Owners_Order_By>>;
  where?: InputMaybe<Owners_Bool_Exp>;
};


export type Query_RootSearch_Cats_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  args: Search_Cats_Args;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};

export type Search_Cats_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship connection */
  cats_connection: CatsConnection;
  node?: Maybe<Node>;
  /** fetch data from the table: "owners" */
  owners_connection: OwnersConnection;
  /** execute function "search_cats" which returns "cats" */
  search_cats_connection: CatsConnection;
};


export type Subscription_RootCats_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};


export type Subscription_RootNodeArgs = {
  id: Scalars['ID'];
};


export type Subscription_RootOwners_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Owners_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Owners_Order_By>>;
  where?: InputMaybe<Owners_Bool_Exp>;
};


export type Subscription_RootSearch_Cats_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  args: Search_Cats_Args;
  before?: InputMaybe<Scalars['String']>;
  distinct_on?: InputMaybe<Array<Cats_Select_Column>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cats_Order_By>>;
  where?: InputMaybe<Cats_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type SearchCatsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  search: Scalars['String'];
}>;


export type SearchCatsQuery = { __typename?: 'query_root', search_cats_connection: { __typename?: 'catsConnection', edges: Array<{ __typename?: 'catsEdge', node: { __typename?: 'cats', id: string, age: number, name: string, owner: { __typename?: 'owners', name: string } } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } };


export const SearchCatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search_cats_connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<SearchCatsQuery, SearchCatsQueryVariables>;