import app from './app';

const port = 5000;
app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique http://localhost:${port}`);
});
