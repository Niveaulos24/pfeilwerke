import { Application, Router } from "https://deno.land/x/oak@v10.2.0/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/_site`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

const router = new Router();

function sendJoinRequest(username: string) {
  console.log(username)
  return new Promise((resolve, reject) => {
    if (username.length <= 0) {
      reject(null)
    }
    
    resolve(null)
  })
}

router.get("/join/:username", async(ctx, next) => {
  try {
    await sendJoinRequest(ctx.params.username)
    ctx.response.body = { success: true, msg: "Join request successfully sent!" };
  } catch (err) {
    ctx.response.status = 500
    ctx.response.body = { success: false, msg: err };
  }

  next()
});

// After creating the router, we can add it to the app.
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
