import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Ball from "./Ball";

export default class Over extends BaseModel {
  public serializeExtras = true;
  @column({ isPrimary: true })
  public id: number;
  @column()
  public over_number: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Ball)
  public balls: HasMany<typeof Ball>;
}
