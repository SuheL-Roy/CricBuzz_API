import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Balls extends BaseSchema {
  protected tableName = 'balls'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('over_id')
        .unsigned()
        .references('overs.id')
        .onDelete('CASCADE') 
        .notNullable()
      table
        .integer('user_id') //batsman id
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
        .notNullable()
        
      table
        .integer('bowler_id') //bowler id
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
        .notNullable()
      table.integer('run').notNullable()
      table.integer('extra').nullable()
      table.float('speed').notNullable()
      table.string('run_type', 191).nullable()
      table.string('ball_type', 191).notNullable()
      table.integer('boundary').nullable()
      table.string('out_type', 191).nullable()
      table
        .integer('helper_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') // delete post when user is deleted
        .nullable()
      table
        .integer('out_player_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') // delete post when user is deleted
        .nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
