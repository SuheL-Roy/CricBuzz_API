import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
//import Database from '@ioc:Adonis/Lucid/Database'
//import Ball from 'App/Models/Ball'
import Over from 'App/Models/Over'

export default class OversController {

    public async index({request}:HttpContextContract){
        //return request.all()
        const id = request.input("id")

      //  const  overdetails =  await Over.query().where('id', id).first() 
        //return overdetails;
        //const overballdeatils =  await Database.from('balls').select().where('over_id', '=' , id) 
        
        //return {overballdeatils};

        return Over.query().preload('balls').where('id', id).firstOrFail()
      
      }

    public async store({ request }:HttpContextContract){
       
        const UserSchema = schema.create({
            over_number: schema.number(),
        })

        const payload = await request.validate({

            schema: UserSchema,
            messages: {
                'over_number.required': 'over_number is Required',
            },
        })

        let obj = {
            over_number:payload.over_number
        }
        return Over.create(obj)

    }
}

