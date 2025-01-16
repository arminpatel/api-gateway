const routeInfo = {
  '/api/session': {
    permissions: ['AUTHENTICATED'],
  },
  '/api/route1': {
    permissions: ['ADMIN', 'CUSTOMER', 'RESTAURANT_MANAGER', 'RIDER'],
    serviceAddress: 'https://localhost:3001'
  },
  '/api/route2': {
    permissions: ['ANY'],
    serviceAddress: 'https://localhost:3001'
  },
  '/api/route3': {
    permissions: ['AUTHENTICATED'],
    serviceAddress: 'https://localhost:3001'
  }
}

export default routeInfo;
