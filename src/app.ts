import express, { Application, Request, Response } from 'express';
import cors from 'cors';


import router from './app/routes/index';
import notFound from './app/middlewares/notFound';

const app: Application = express();
// const port = 3000;

//parser--
app.use(express.json());
app.use(cors());

// application routes
app.use('', router);


const getAController = (req: Request, res: Response) => {
 
  try {
    res.status(200).json({
      success: true,
      message: 'server is running'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'server stop'
    })
  }

  
};

app.get('/', getAController);
app.use(notFound);

export default app;