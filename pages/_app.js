import '../styles/globals.css';
import '../app/Header/header.css';
import '../pages/login/login.css';
import '../pages/register/register.css';
import '../pages/session/session.css';
import '../pages/media/media.css';
import '../pages/article/article.css';
import '../pages/myInformation/myInformation.css';
import '../pages/mediaCreate/mediaCreate.css';
import '../app/AppBar/appbar.css';
import '../app/Wrapper/wrapper.css';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
