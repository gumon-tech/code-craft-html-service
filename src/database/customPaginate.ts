import {
  Document,
  FilterQuery,
  PaginateOptions,
  PaginateResult,
} from 'mongoose';
import { CombinedPluginModel } from './database.interface';

interface ICustomPaginate<TModel extends Document> {
  model: CombinedPluginModel<TModel>;
  query: FilterQuery<TModel>;
  options: PaginateOptions;
}
interface IPaginateResult<TModel> {
  data: TModel[];
  pagination: IPaginatedType;
}

interface IPaginatedType {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

interface ISortBuilder {
  sortBy?: string;
  sortOrder?: string;
}

interface IQueryBuilder<TModel> {
  query?: FilterQuery<TModel>;
  filter?: FilterQuery<TModel>;
  search?: object;
}

interface IObject {
  [key: string]: string;
}
interface IRegex {
  $regex: string;
  $options: string;
}
interface IObjectRegex {
  [key: string]: IRegex;
}

export function queryBuilder<TModel extends Document>({
  query,
  filter,
  search,
}: IQueryBuilder<TModel>): FilterQuery<TModel> {
  let oneQuery: FilterQuery<TModel> = {};
  const andQuery: FilterQuery<TModel>[] = [];
  if (query) {
    andQuery.push(query);
  }
  if (filter) {
    andQuery.push(filter);
  }
  if (search) {
    const searchRegex = searchRegexObject(search as IObject) as Array<
      FilterQuery<TModel>
    >;
    if (searchRegex.length > 0) {
      andQuery.push({
        $or: searchRegex,
      });
    }
  }
  if (andQuery.length > 0) {
    oneQuery = {
      $and: andQuery,
    };
  }

  return oneQuery;
}

export function sortBuilder({
  sortBy = 'createdAt',
  sortOrder = 'ASC',
}: ISortBuilder): object {
  let sort: object = {
    createdAt: 'ASC',
  };
  if (sortBy && sortOrder) {
    sort = {
      [sortBy]: sortOrder,
    };
  }

  return sort;
}

export async function customPaginate<TModel extends Document>({
  model,
  query = {},
  options = {
    sort: {
      createdAt: 1,
    },
    page: 1,
    limit: 9999,
  },
}: ICustomPaginate<TModel>): Promise<IPaginateResult<TModel>> {
  if (!options.sort) options.sort = { createdAt: 1 };
  if (typeof options.sort === 'object' && isEmpty(options.sort)) {
    options.sort = { createdAt: 1 };
  }

  const result: PaginateResult<TModel> = await model.paginate(query, options);
  const dataResult: IPaginateResult<TModel> = {
    data: result.docs,
    pagination: {
      limit: result.limit,
      page: result.page,
      totalItems: result.totalDocs,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    },
  };
  return dataResult;
}
function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

function searchRegexObject(obj: IObject): Array<IObjectRegex> {
  const result: Array<IObjectRegex> = [];

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (obj[key]) {
        result.push({
          [key]: {
            $regex: obj[key],
            $options: 'i', // i เป็นตัวเลือกที่ทำให้เป็น case-insensitive
          },
        });
      }
    }
  }

  return result;
}
