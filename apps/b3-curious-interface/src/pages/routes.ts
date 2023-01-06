export const ROUTES = {
  landing: {
    path: '/',
    relative: () => '/'
  },
  connect4: {
    path: 'connect4',
    relative: () => '/connect4'
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