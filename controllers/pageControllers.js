const getIndexPage = (req, res) => {
    res.status(200).render('index');
}

const getAboutPage = (req, res) => {
    res.status(200).render('about');
}

module.exports = {getIndexPage, getAboutPage}