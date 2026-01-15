const axios = require('axios');
let { users } = require('../users.json');

require('dotenv').config()

// Helper function to fetch news from external API based on user preferences
async function fetchNewsFromAPI(preferences) {
    try {
        let query = '';
        query = query + preferences.map((p) => {return `q=${p}&`});
        let response = await axios.get(`https://newsapi.org/v2/everything?${query}sortBy=popularity&apiKey=${process.env.API_TOKEN}`);
        return response.data;
    } catch (error) {
        res.status(500).json({ message: 'External API error' });
    }
}


async function getNews(req, res){
    try {
    const email = req.email;
    const user = findUserByEmail(email);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const preferences = user[0].preferences;
    const response = await fetchNewsFromAPI(preferences);
    if(!response){
        return res.status(500).json({ message: 'Failed to fetch news' });
    }

    if(response.articles.length === 0){
        return res.status(200).json({ message: 'No news articles found for the given preferences', news: [] });
    }

    res.status(200).json({
        news: response.articles,
        totalNews: response.totalResults
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Helper function to find user by email
function findUserByEmail(email) {
    return users.filter(user => user.email === email) ?? [];
}

module.exports = {getNews};