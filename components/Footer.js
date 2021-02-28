import Link from 'next/link';
import style from '../styles/Footer.module.scss';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <p>Made with ❤️ by <Link href='https://matiasracedo.github.io/'>Matías Racedo</Link></p>
        </footer>
    )
}

export default Footer;