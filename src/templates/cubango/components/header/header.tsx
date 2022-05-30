import './header.scss'

const Header = (props: { title?: string }) => {
    return (
        <section className={'header'}>
            <div className={'header__container'}>
                <div className={'header__heading'}>
                    <span className={'header__category'}>Science</span>
                    <h1 className={'header__title'}></h1>
                </div>

                <div className={'header__info'}>
                    <div className={'header__image-container'}>
                        <img className={'header__image'} src="" alt=""/>
                    </div>
                    <div className={'header__labels'}>
                        <span>Author</span>
                        Di Vincenzo Venuto

                        <span>Contacts</span>
                        Di Vincenzo Venuto

                        <span>Social</span>
                        Ciao
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header;