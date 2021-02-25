const mongoose = require("mongoose")
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');
const app = new Koa();
const router = new Router();
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    await next()
  })

const movie = require("./schema/date")
const dayjs = require("dayjs")
mongoose.connect("mongodb://localhost:30001/movie", { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("Database connection successful")
    app.listen(1234, () => console.log("Monitoring port 1234"))
})
const movies = mongoose.model("movies", movie)

router.post('/movie',async (ctx) => {
    let { body } = ctx.request; 
    let {appkey}=body
    if (appkey == "") {
        ctx.body={
            code: 33,
            msg: "appkey cannot be empty!"
        }
    } else if (appkey != "94b19a105fce9aa5d2e3270cc428e808538ef548") {
        ctx.body={
            code: 0,
            msg: "Incorrect key!"
        }
    } else {
      await  movies.find({}, (err, movie) => {
            ctx.body={
                code: 1,
                msg: "Request successful!",
                result: movie
            }
        })
    }
})
app.use(koaBody())
app.use(cors())   
app.use(json({pretty:false, param:'pretty'}));
app.use(router.routes()).use(router.allowedMethods())   