function Footer() {
    const year = new Date().getFullYear();
    const footerStyle = {
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100px'
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; {year} Ecommerce Mern | Author: Manthan Bhardwaj</p>
        </footer>
    );
}

export default Footer;