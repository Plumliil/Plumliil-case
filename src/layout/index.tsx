import { Outlet } from 'react-router-dom';
import './styles.less'
const Layout = () => {
    return <>
        <section id="container">
            <header>Header</header>
            <main><Outlet /></main>
            <footer>Footer</footer>
        </section>
    </>
};

export default Layout;
