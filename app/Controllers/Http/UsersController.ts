import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Application from "@ioc:Adonis/Core/Application";
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";
import Ball from "App/Models/Ball";
import Over from "App/Models/Over";
//import Over from 'App/Models/Over'
//import Schema from '@ioc:Adonis/Lucid/Schema'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    //const bowler_id = request.input("bowler_id");

    const id = request.input("id");

    const batingDetails = await User.query()
      .where("id", id)
      .withCount("ball", (query) => {
        query.sum("run").as("total_run");
      })
      .withCount("ball", (query) => {
        query.avg("run").as("avg_run");
      })
      .withCount("ball", (query) => {
        query.count("id").as("total_ball_faced");
      })
      .withCount("ball", (query) => {
        query.where("run", "=", 4).count("id").as("total_Boundery_four");
      })
      .withCount("ball", (query) => {
        query.where("run", "=", 6).count("id").as("total_boundery_six");
      }).firstOrFail();
    //  const strikerate = batsmanDetails.meta.avg_run * 1000
     const strikerate = batingDetails.$extras.avg_run * 100;

       /* bowler_details*/
  const bowlerDetails = await Database
  .from('balls')
  .select()
  .sum('run as total_run')
  .sum('extra as total_extra_run')
  .avg('run as avg_run')
  .avg('speed as avg_speed')
  .count('id as total_faced_ball')
  .count('out_type as total_wicket')
  .where('bowler_id', '=',id).first()

       /* user_wicket_details*/
  const wicketDetails =  await User.query()
  .where('id',id)
  .withCount('ball',(query) => {
    query.where("out_type", "=", "stamping" ).count("id").as("total_stamping_wicket");
  }).withCount('ball',(query)=> {
    query.where("out_type", "=", "bold" ).count("id").as("total_bold_wicket");
  }).withCount('ball',(query)=> {
    query.where("out_type", "=", "catch" ).count("id").as("total_catch_wicket");
  })

    /*Over_Wicket Details*/
  const OverWicketDetails = await Over.query()
  .where('id',id)
  .withCount('balls',(query)=> {
     query.where("out_type", "=", "stamping" ).count("id").as("total_stamping_wicket");
    }).withCount('balls',(query)=> {
      query.where("out_type", "=", "bold" ).count("id").as("total_bold_wicket");
    }).withCount('balls',(query)=> {
      query.where("out_type", "=", "catch" ).count("id").as("total_catch_wicket");
    })

   // return { batingDetails,bowlerDetails,strikerate,wicketDetails };
      return OverWicketDetails;
  }
  public async store({ request }: HttpContextContract) {
    //  return request.all();
    const newUserSchema = schema.create({
      sure_name: schema.string({ escape: true, trim: true }),
      middle_name: schema.string({ escape: true, trim: true }),
      last_name: schema.string({ escape: true, trim: true }),
      player_type: schema.string({ escape: true, trim: true }),
      idcard: schema.string({ escape: true, trim: true }),
      play_role: schema.string({ escape: true, trim: true }),
      batting_style: schema.string({ escape: true, trim: true }),
      bowling_style: schema.string({ escape: true, trim: true }),
      address: schema.string({ escape: true, trim: true }),
      dob: schema.string({ escape: true, trim: true }),
      height: schema.string({ escape: true, trim: true }),
      weight: schema.number(),
      gender: schema.string({ escape: true, trim: true }),
      hair_style: schema.string({ escape: true, trim: true }),
      password: schema.string({ escape: true, trim: true }),
      email: schema.string({}, [
        rules.email({
          sanitize: true,
          ignoreMaxLength: false,
        }),
        rules.unique({ table: "users", column: "email" }),
      ]),
      phone: schema.string({ escape: true, trim: true }),
      country: schema.string({ escape: true, trim: true }),
      city: schema.string({ escape: true, trim: true }),
    });
    const payload = await request.validate({
      schema: newUserSchema,
      messages: {
        "email.required": "Email is Required",
        "email.unique": "Email has to be unique",
        "password.required": "password is Required",
        "sure_name.required": "sure_name is Required",
        "middle_name.required": "middle_name is Required",
        "last_name.required": "last_name is Required",
        "player_type.required": "player_type is Required",
        "idcard.required": "idcard is Required",
        "play_role.required": "play_role is Required",
        "batting_style.required": "batting_style is Required",
        "bowling_style.required": "bowling_style is Required",
        "address.required": "address is Required",
        "dob.required": "dob is Required",
        "hight.required": "hight is Required",
        "weight.required": "weight is Required",
        "gender.required": "gender is Required",
        "hair_style.required": "hair_style is Required",
        "phone.required": "phone is Required",
        "country.required": "country is Required",
        "city.required": "city is Required",
      },
    });
    const profileImage = request.file("files");

    // return profileImage;

    var imageName = "";

    if (!profileImage) {
      imageName = "";
    } else {
      // return profileImage
      imageName = Math.random().toString() + "." + profileImage.extname;
      await profileImage.move(Application.publicPath("uploads/userPictures"), {
        name: imageName,
      });
    }

    let obj = {
      email: payload.email,
      password: payload.password,
      sure_name: payload.sure_name,
      middle_name: payload.middle_name,
      last_name: payload.last_name,
      player_type: payload.player_type,
      idcard: payload.idcard,
      play_role: payload.play_role,
      batting_style: payload.batting_style,
      bowling_style: payload.bowling_style,
      address: payload.address,
      dob: payload.dob,
      height: payload.height,
      weight: payload.weight,
      gender: payload.gender,
      hair_style: payload.hair_style,
      phone: payload.phone,
      country: payload.country,
      city: payload.city,
      pic: "userPictures/" + imageName,
    };
    return User.create(obj);
  }
}
