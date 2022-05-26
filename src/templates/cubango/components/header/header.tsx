import './header.scss'

const Header = (props: { title?: string }) => {
    return (
        <section className={'header'}>
            <div className={'header__container'}>
                <div className={'header__heading'}>
                    <span className={'header__category'}>Lifestyle</span>
                    <h1>{props.title}</h1>
                </div>
            </div>
        </section>
    )
}

export default Header;