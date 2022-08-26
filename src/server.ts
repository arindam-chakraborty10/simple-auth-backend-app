import app from './app';
import { envs } from './config/env';

app.listen(envs.port, () => {
  console.log(`server is running on port ${envs.port}`);
});
