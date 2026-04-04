function buildTextPage(text, level = 'h1') {
  const pageElement = document.createElement(level);
  pageElement.textContent = text;
  return pageElement;
}

function buildProductDetailPage(params) {
  const pageElement = document.createElement('h2');
  pageElement.textContent = 'Product detail page: ' + String(params.id);
  pageElement.dataset.productId = params.id;
  return pageElement;
}

const routes = [
  { path: '/', createView: () => document.createElement('menu-page') },
  { path: '/products', createView: () => document.createElement('menu-page') },
  { path: '/restaurants', createView: () => buildTextPage('Restaurants Page') },
  { path: '/order', createView: () => document.createElement('order-page') },
  {
    path: '/products/:id',
    createView: (params) => buildProductDetailPage(params),
  },
];

function getRouteSegments(path) {
  return path.split('/').filter(Boolean);
}

function matchRoute(routePath, candidatePath) {
  const routeSegments = getRouteSegments(routePath);
  const candidateSegments = getRouteSegments(candidatePath);

  if (routeSegments.length !== candidateSegments.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routeSegments.length; i += 1) {
    const routeSegment = routeSegments[i];
    const candidateSegment = candidateSegments[i];

    if (routeSegment.startsWith(':')) {
      params[routeSegment.slice(1)] = candidateSegment;
      continue;
    }

    if (routeSegment !== candidateSegment) {
      return null;
    }
  }

  return params;
}

function resolveRoute(pathname) {
  for (const route of routes) {
    const params = matchRoute(route.path, pathname);
    if (params) {
      return route.createView(params);
    }
  }

  return buildTextPage('Page not found', 'h2');
}

const Router = {
  init: () => {
    document.querySelectorAll('a.nav__link').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const href = a.getAttribute('href');
        Router.go(href);
      });
    });

    window.addEventListener('popstate', (event) => {
      Router.go(event.state?.route ?? location.pathname, false);
    });

    Router.go(location.pathname, false);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    const pageElement = resolveRoute(route);
    const main = document.querySelector('main');
    const currentPage = main.firstElementChild;

    if (currentPage) {
      currentPage.remove();
    }

    main.appendChild(pageElement);
    window.scrollTo(0, 0);
  },
};

export default Router;
