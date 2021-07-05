import express, { Response, Request } from 'express'; 

const app = express();

app.get('/upload/dog/image', (req: Request, res: Response) => {
  res.send("works")
})


app.listen(8080, () => {
  console.log("listening on port 8080 ...")
})
