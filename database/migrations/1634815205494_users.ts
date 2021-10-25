import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('sure_name', 191).notNullable()
      table.string('middle_name', 191).notNullable()
      table.string('last_name', 191).notNullable()
      table.string('player_type', 191).notNullable()
      table.string('idcard', 191).notNullable()
      table.string('play_role', 191).notNullable()
      table.string('batting_style', 191).notNullable()
      table.string('bowling_style', 191).notNullable()
      table.text('address').notNullable()
      table.text('dob').notNullable()
      table.string('height', 191).notNullable()
      table.float('weight', 191).notNullable()
      table.string('gender', 191).notNullable()
      table.string('hair_style', 191).notNullable()
      table.string('password', 191).notNullable()
      table.string('email', 191).unique().notNullable()
      table.string('phone', 191).notNullable()
      table.string('country', 191).notNullable()
      table.string('city', 191).notNullable()
      table.string('pic', 191).notNullable()
      
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
