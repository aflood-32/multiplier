import Head from 'next/head'


const Layout = (props) => (
    <>
        <Head>
            <title>Multiplier</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link href="css/bootstrap.min.css" rel="stylesheet"/>
            <link href="css/scrolling-nav.css" rel="stylesheet"/>
            <link rel="stylesheet" href="css/style.css"/>
        </Head>
        <>
            {props.children}
        </>
        <script src="js/jquery-1.9.1.min.js" type="text/javascript"/>
        <script src="js/jquery-ui.min.js" type="text/javascript"/>
        <script src="js/bootstrap.min.js"/>
        <script src="js/jquery.easing.min.js"/>
        <script src="js/scrolling-nav.js"/>
        <script src="js/jquery.validate.min.js"/>
        <script src="js/script.js" type="text/javascript"/>
        <script src="js/custom.js" type="text/javascript"/>

    </>
);

export default Layout
