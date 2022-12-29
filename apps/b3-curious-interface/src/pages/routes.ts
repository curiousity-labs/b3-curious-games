export const ROUTES = {
  landing: {
    path: '/',
    relative: () => '/'
  },
  battleshipLanding: {
    path: 'battleship',
    relative: () => '/battleship'
  },
  battleshipNew: {
    path: 'new',
    relative: () => '/battleship/new'
  },
  battleshipGame: {
    path: 'game/:gameAddress',
    relative: (gameAddress: string) => `/battleship/game/${gameAddress}`
  }
}