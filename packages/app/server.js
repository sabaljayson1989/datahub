const express = require('express');
const compression = require('compression');
const LRUCache = require('lru-cache');
const path = require('path');
const next = require('next');
const countriesData = require('./private/components/organisms/CountrySearchInput/data.js');
const ugData = require('./private/components/organisms/CountrySearchInput/uganda-data.js');
const keData = require('./private/components/organisms/CountrySearchInput/kenya-data.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 300,
  maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
});

const renderAndCache = (req, res, pagePath, queryParams) => {
  const key = req.url;
  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key) && process.env.NODE_ENV === 'production') {
    console.log(`CACHE HIT: ${key}`);
    return res.send(ssrCache.get(key));
  }
  // If not let's render the page into HTML
  return app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      console.log(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);
      res.send(html);
    })
    .catch((err) => {
      console.error('ssr render issue: ', err);
      app.renderError(err, req, res, pagePath, queryParams);
    });
};


app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));

  server.use('/public', express.static(path.resolve(__dirname, '/public'), {
    maxAge: '365d'
  }));

  // serve service worker // currently not working
  // server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));
  [
    '/unbundling-aid',
    '/unbundling-other-flows',
    '/country-profiles',
    '/where-are-the-poor',
    '/multilaterals',
    '/methodology',
    '/oda-donor',
    '/poverty'
  ].forEach(link => {
    server.get(link, (req, res) => {
      renderAndCache(req, res, link);
    });
  });

  ['/', '/spotlight-on-uganda', '/spotlight-on-kenya'].forEach(link => {
    server.get(link, (req, res) => {
      const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
      const queryParams = { state };
      renderAndCache(req, res, link, queryParams);
    });
  });

  server.get('/uganda/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state};
    const isValidCountry = ugData.districts
      .some(distict => distict.name.toLowerCase() === req.params.id);
    return isValidCountry ? renderAndCache(req, res, '/uganda', queryParams) :
      renderAndCache(req, res, '/spotlight-on-uganda');
  });
  server.get('/kenya/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state};
    const isValidCountry = keData.districts
      .some(distict => distict.name.toLowerCase() === req.params.id);
    return isValidCountry ? renderAndCache(req, res, '/kenya', queryParams) :
      renderAndCache(req, res, '/spotlight-on-kenya');
  });
  server.get('/multilateral/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state};
    const isValid = ['oda', 'ida', 'EU', 'afdb', 'undp']
      .some(multilateral => multilateral === req.params.id);
    return isValid ? renderAndCache(req, res, '/multilateral', queryParams) :
      renderAndCache(req, res, '/multilaterals');
  });
  server.get('/country/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const isValidCountry = countriesData.countries.some(country => country.slug === req.params.id);
    const queryParams = { id: req.params.id, state};
    return isValidCountry ? renderAndCache(req, res, '/country', queryParams) :
      renderAndCache(req, res, '/country-profiles');
  });

  server.get('/_next/*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) console.error('app server error: ', err);
    console.log(`> App running on http://localhost:${PORT}`);
  });
});