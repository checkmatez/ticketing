import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps }) => <Component {...pageProps} />;

App;

export async function getServerSideProps(appCtx) {
  console.log('getServerSideProps -> appCtx', appCtx);

  const { data } = await buildClient(appCtx.ctx).get('/api/users/currentuser');
  console.log('getServerSideProps -> data', data);

  return { props: data };
}

export default AppComponent;
