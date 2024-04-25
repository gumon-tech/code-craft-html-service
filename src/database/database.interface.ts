import { Document, PaginateModel, Schema } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';

export interface PluginConfig {
  plugin: PluginMongoose;
  options?: any;
}

export type CombinedPluginModel<T extends Document> = SoftDeleteModel<T> &
  PaginateModel<T>;

export type PluginMongoose<S extends Schema = Schema> = (
  schema: S,
  opts?: any,
) => void;
