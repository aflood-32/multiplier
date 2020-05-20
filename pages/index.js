import Layout from "../components/Layout";
import BASE_API_PATH from "../utils/api";
import ReactHtmlParser from 'react-html-parser'
import {useState} from 'react'


export default function Home({data}) {

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        submitting: false,
        submitted: false,
        errors: {
            name: false,
            email: false,
            message: false
        }
    });

    const submitForm = e => {
        e.preventDefault();
        if(!formState.name.trim()){
            setFormState(prevState => {
                const prevErrors = prevState.errors;
                console.log(prevErrors);
                return{
                    ...prevState,
                    errors: {...prevErrors, name: data.contact.contact_form.name_error}
                }
            });
        }
        if(!formState.email.trim()){
            setFormState(prevState => {
                const prevErrors = prevState.errors;
                return{
                    ...prevState,
                    errors: {...prevErrors, email: data.contact.contact_form.email_empty}
                }
            });
        }
        if(!formState.message.trim()){
            setFormState(prevState => {
                const prevErrors = prevState.errors;
                return{
                    ...prevState,
                    errors: {...prevErrors, message: data.contact.contact_form.message_error}
                }
            });
        }

        if(formState.message.trim() && formState.email.trim() && formState.name.trim()){
            setFormState(prevState => ({
                ...prevState,
                submitting: true,
                errors: {
                    name: false,
                    email: false,
                    message: false
                }
            }));
            fetch(`${BASE_API_PATH}/main-page`,{
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                })
            })
                .then(res => {
                    console.log('done', res);
                    if(res.status === 200){
                       setFormState(prevState => ({
                           ...prevState,
                           submitting: false,
                           submitted: false
                       }))
                    }
                })
                .catch(err => {
                    console.error('error', err)
                })
        }

    };

    const handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    };


    return (
        <Layout>
            <header>
                <div className="main-header">
                    <a className="logo" href="#">
                        <img src={data.header_icon ? `${BASE_API_PATH}${data.header_icon.url}` : ''}
                             alt={data.header_icon ? data.header_icon.alternativeText : 'logo'}/>
                    </a>
                    <a className="logo-blue" href="#">
                        <img src={data.header_icon ? `${BASE_API_PATH}${data.header_icon.url}` : ''}
                             alt={data.header_icon ? data.header_icon.alternativeText : 'logo'}/></a>
                    <div className="nav">
                        <ul>
                            {
                                data.header_links.length > 0 &&
                                data.header_links.map(elem => (
                                    <li key={elem.id}><a className="page-scroll" href={`#${elem.link}`}>{elem.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="mob-menu">
                    <a className="logo" href="http://eblix.com.au/">
                        <img src="img/eBlix_logo_blue.svg" alt="eBlix technologies"/></a>
                    <div className="nav">
                        <ul>
                            {
                                data.header_links.length > 0 &&
                                data.header_links.map(elem => (
                                    <li key={elem.id}><a className="page-scroll" href={`/${elem.link}`}>{elem.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <a className="mob-menu-icon"><i className="fa fa-bars fa-5x" aria-hidden="true"/></a>
            </header>
            {/*First Section*/}
            {data.first_section &&
            <div className="section-one container-fluid no-padding">
                <div className="banner-img-wrapper">
                    <div className="banner-image"/>
                    <img className="dashbord-img img-responsive" src={`${BASE_API_PATH}${data.first_section.img.url}`}
                         alt={data.first_section.img.alternativeText}/>
                </div>
                <div className="banner-content-wrapper">
                    <div className="banner-content">
                        <h1>{data.first_section.main_title}</h1>
                        <div className="btn-set">
                            <ul>
                                <li><a id="btn_learn" className="btn-learn">{data.first_section.left_btn}</a></li>
                                <li><span>{data.first_section.btn_separator}</span></li>
                                <li><a className="btn-quote">{data.first_section.right_btn}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="banner-bottom-line">
                    <img className="img-responsive" src="img/yellow_line.svg" alt="eBlix technologies"/>
                </div>
                <a id="btn_learn_more" className="scroll-down"/>
            </div>}
            {/*Second Section*/}
            {data.solutions &&
            <div id="solutions" className="section-tow container no-padding">
                <div className="solutions-wrapper" style={{'float': 'none'}}>
                    <h2>{data.solutions.title}</h2>
                    {
                        data.solutions.items.length > 0 &&
                        data.solutions.items.map(elem => (
                            <div
                                key={elem.id}
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-12 solutions">
                                <i className={`fa ${elem.icon}`} aria-hidden="true"/>
                                <h3>{elem.title}</h3>
                                <p>{elem.body}</p>
                            </div>
                        ))
                    }
                </div>
            </div>}
            {/*Third Section*/}
            {data.features &&
            <div id="features" className="section-three container-fluid no-padding">
                <div className="features-wrapper">
                    <div className="container no-padding">
                        <h2>{data.features.title}</h2>
                        <div className="features-box">
                            <div className="features-img">
                                <img src={`${BASE_API_PATH}${data.features.img.url}`} className="img-responsive"/>
                                {
                                    data.features.items.length > 0 &&
                                    data.features.items.map((elem, idx) => (
                                        <p
                                            key={elem.id}
                                            className={`featur0${idx + 1}`}>
                                            <img className="img-responsive" src="img/radar_dot.svg"
                                                 alt="Used best UX design methodologies"/>
                                            <span>{elem.text}</span>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <img className="line" src="img/orange_line_opacity.svg" alt="eBlix technologies"/>
                </div>
            </div>}
            {/*Fourth Section*/}
            {data.support &&
            <div id="support" className="section-four container-fluid no-padding">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding support-image"
                     style={{'backgroundImage': `url(${BASE_API_PATH}${data.support.img.url})`}}/>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding support-content">
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 no-padding support-content-box">
                        <h2>{data.support.first_title}</h2>
                        <p>{data.support.text}</p>
                        <h2>{data.support.second_title}</h2>
                        <p className="support-subtitle">{data.support.subtitle}</p>
                        {data.support.accordion_items.length > 0 &&
                        <div className="panel-group help-center" id="accordion" role="tablist"
                             aria-multiselectable="true">
                            {data.support.accordion_items.map(elem => (
                                <div
                                    key={elem.id}
                                    className="panel panel-default">
                                    <div className="panel-heading" role="tab" id="headingThree">
                                        <a className="collapsed" role="button" data-toggle="collapse"
                                           data-parent="#accordion" href="index.html#collapseThree"
                                           aria-expanded="false"
                                           aria-controls="collapseThree">
                                            <i className="fa fa-plus-circle" aria-hidden="true"/>
                                            {elem.title}
                                        </a>
                                    </div>
                                    <div id="collapseThree" className="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="headingThree">
                                        <p>
                                            {elem.text}
                                        </p>
                                    </div>
                                </div>))}
                        </div>
                        }
                    </div>
                </div>
            </div>}
            {/*Fifth Section*/}
            {data.feedback &&
            <div id="clients" className="section-five container-fluid no-padding">
                <div className="feedback-wrapper">
                    <h2>{data.feedback.title}</h2>
                    {data.feedback.slider_items.length > 0 &&
                    <>
                        <div className="avatar-wrapper">
                            <img className="line" src="img/blue_line_opacity.svg" alt="eBlix technologies"/>
                            <div className="avatar">
                                <img
                                    src={data.feedback.slider_items[0].img ? `${BASE_API_PATH}${data.feedback.slider_items[0].img.url}` : 'https://cdn.onlinewebfonts.com/svg/img_131793.png'}
                                    alt=""/>
                            </div>
                        </div>
                        <div className="container no-padding">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 feedback-slider">
                                <div id="myCarousel" className="carousel slide" data-ride="carousel"
                                     data-interval="false"
                                     data-wrap="false">
                                    <div className="carousel-inner" role="listbox">
                                        {
                                            data.feedback.slider_items.map((elem, idx) => (
                                                <div key={elem.id}
                                                     data-img={elem.img ? `${BASE_API_PATH}${elem.img.url}` : 'https://cdn.onlinewebfonts.com/svg/img_131793.png'}
                                                     className={idx === 0 ? 'item active' : 'item'}>
                                                    <p className="name">{elem.name}</p>
                                                    <p className="job">{elem.job}</p>
                                                    <p>{elem.text}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <a id="left" className="left carousel-control" href="index.html#myCarousel"
                                       role="button" data-slide="prev">
                                        <i className="fa fa-angle-double-left" aria-hidden="true"/>
                                    </a>
                                    <a id="right" className="right carousel-control" href="index.html#myCarousel"
                                       role="button" data-slide="next">
                                        <i className="fa fa-angle-double-right" aria-hidden="true"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>}
                    {data.feedback.logo_items.length > 0 &&
                    <div className="container no-padding">
                        <div className="logo-slider">
                            <ul>
                                {data.feedback.logo_items.map(elem => (
                                    <li key={elem.id}><img src={`${BASE_API_PATH}${elem.image.url}`}
                                                           alt={elem.image.alternativeText}/></li>
                                ))}
                            </ul>
                        </div>
                    </div>}
                </div>
            </div>}
            {/*Sixth Section*/}
            {data.sixth &&
            <div className="section-six container-fluid no-padding">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding solutions-content">
                    <div className="content-inner-box">
                        <h2>{data.sixth.title}</h2>
                        <p>{data.sixth.text}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding solutions-img"
                     style={{'backgroundImage': `url(${BASE_API_PATH}${data.sixth.image.url})`}}/>
            </div>}
            {/*Eight Section*/}
            {data.contact &&
            <div id="contact_us" className="section-eighth container">
                <div className="contact-wrapper">
                    <h2>{data.contact.title}</h2>
                    {data.contact.contacts.length > 0 &&
                    data.contact.contacts.map(elem => (
                        <div key={elem.id}
                             className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                            {elem.title && <h4>{elem.title}</h4>}
                            {elem.list &&
                            <ul className="address-block">
                                {ReactHtmlParser(elem.list)}
                            </ul>}
                        </div>
                    ))}
                    {data.contact.contact_form &&
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 contact-form-wrapper">
                            <h4>{data.contact.contact_form.title}</h4>
                            <ul className="contact-form">
                                <form onSubmit={(e) => submitForm(e)}>
                                    <li>
                                        <input type="text"
                                               name="name"
                                               onChange={(e) => handleChange(e)}
                                               value={formState.name}
                                               placeholder={data.contact.contact_form.name}/>
                                        {formState.errors.name &&
                                            <label id="contact_name_msg"
                                                   className="error">
                                                {formState.errors.name}
                                            </label>}
                                    </li>
                                    <li>
                                        <input type="text"
                                               name="email"
                                               onChange={(e) => handleChange(e)}
                                               value={formState.email}
                                               placeholder={data.contact.contact_form.email}/>
                                        {/*<label id="contact_email_msg1" className="error">*/}
                                        {/*    {data.contact.contact_form.email_empty}*/}
                                        {/*</label>*/}
                                        {formState.errors.email &&
                                        <label id="contact_email_msg" className="error">
                                            {formState.errors.email}
                                        </label>}
                                    </li>
                                    <li>
                                    <textarea id="contact_message" name="message"
                                              onChange={(e) => handleChange(e)}
                                              value={formState.message}
                                              placeholder={data.contact.contact_form.text}/>
                                        {formState.errors.message &&
                                        <label id="contact_message_msg" className="error">
                                            {formState.errors.message}
                                        </label>}
                                    </li>
                                    <li>
                                        {formState.submitted ?
                                            <p id="contact_done" className="mail-done">
                                                <i className="fa fa-check-circle" aria-hidden="true"/>
                                                {data.contact.contact_form.submit_success}
                                            </p>
                                            :
                                            <button type="submit" disabled={formState.submitting}>{data.contact.contact_form.button}</button>}
                                    </li>
                                </form>
                            </ul>
                        </div>
                    }
                </div>
            </div>}

            <footer className="container-fluid no-padding">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 footer-left">
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-right no-padding">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="http://eblix.com.au/about.php">About Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 footer-right">
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-left no-padding icon-box">
                        <h4>Stay Connected</h4>
                        <ul>
                            <li><a href="https://www.facebook.com/eblix.tech/" target="_blank">
                                <i className="fa fa-facebook" aria-hidden="true"/></a></li>
                            <li><a href="https://twitter.com/eBlix?lang=en" target="_blank">
                                <i className="fa fa-twitter" aria-hidden="true"/></a>
                            </li>
                            <li><a href="https://www.linkedin.com/company/eblix-technologies" target="_blank">
                                <i className="fa fa-linkedin" aria-hidden="true"/></a></li>
                            <li><a href="https://www.youtube.com/user/eBlixTech" target="_blank">
                                <i className="fa fa-youtube-play" aria-hidden="true"/></a></li>
                            <li><a href="https://www.behance.net/eblix" target="_blank">
                                <i className="fa fa-behance" aria-hidden="true"/></a>
                            </li>
                        </ul>
                    </div>
                    <p>
                        <i className="fa fa-copyright" aria-hidden="true"/> 2016 eBlix Technologies.</p>
                </div>
            </footer>
            <div className="footer-bottom">
                <img className="footer-lines" src="img/footer_lines.svg" alt=""/>
                <a className="top-scroll"><i className="fa fa-angle-double-up" aria-hidden="true"/></a>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${BASE_API_PATH}/main-page`);
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}
