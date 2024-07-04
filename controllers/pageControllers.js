const getIndexPage = (req, res) => {
    res.status(200).render('index', {
        link: "index"
    });
}

const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        link: "index"
    });
}

const getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        link: "register"
    });
}

const getLoginPage = (req, res) => {
    res.status(200).render('login', {
        link: "login"
    });
}

module.exports = {getIndexPage, getAboutPage, getRegisterPage, getLoginPage}