import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Over from './Over'
import User from './User'

export default class Ball extends BaseModel {
  public serializeExtras = true;
  @column({ isPrimary: true })
  public id: number

  @column()
  public overId: number
  
  @column()
  public userId: number
  @column()
  public bowlerId: number
  @column()
  public run: number
  @column()
  public extra: number
  @column()
  public speed: number
  @column()
  public run_type: string
  @column()
  public ball_type: string
  @column()
  public boundary: number
  @column()
  public out_type: string
  @column()
  public helper_id: number
  @column()
  public out_player_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Over)
  public over:BelongsTo<typeof Over>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
