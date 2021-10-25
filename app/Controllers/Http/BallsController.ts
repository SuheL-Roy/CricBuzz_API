import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import { schema } from "@ioc:Adonis/Core/Validator";
//import Database from "@ioc:Adonis/Lucid/Database";
import Ball from "App/Models/Ball";

export default class BallsController {
    public async index({request}:HttpContextContract){
        const id = request.input("id")

       const Balldeatils = await Ball.query().where('id', id).first()
       return Balldeatils;

    }
  public async store({ request }: HttpContextContract) {
    // return request.all();
    const ballsSchema = schema.create({
      over_id: schema.number(),
      user_id: schema.number(),
      bowler_id: schema.number(),
      run: schema.number(),
      speed: schema.number(),
      ball_type: schema.string({
        escape: true,
        trim: true,
      }),
    });
    const payload = await request.validate({
      schema: ballsSchema,
      messages: {
        "user_id.required": "user_id is Required",
        "bowler_id.required": "bowler_id is Required",
        "over_id.required": "over_id is Required",
        "run.required": "run is Required",
        "speed.required": "speed is Required",
        "ball_type.required": "ball_type is Required",
      },
    })
    let obj = {
        overId:payload.over_id,
        userId:payload.user_id,
        bowlerId:payload.bowler_id,
        run:payload.run,
        extra:request.all().extra,
        ball_type:payload.ball_type,
        speed:payload.speed,
        out_type:request.all().out_type,
        boundary:request.all().boundary,
        run_type:request.all().run_type,
        helper_id:request.input("helper_id"),
        out_player_id:request.input("out_player_id")
    }
    return Ball.create(obj)
  }
}
