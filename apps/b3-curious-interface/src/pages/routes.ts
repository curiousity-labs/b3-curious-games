export const ROUTES = {
  landing: {
    path: '/',
    relative: () => '/'
  },
  battleshipLanding: {
    path: 'battleship/*',
    relative: () => 'battleship'
  },
  battleshipNew: {
    path: 'battleship/new',
    relative: () => 'battleship/new'
  },
  battleshipGame: {
    path: 'battleship/game/:gameAddress',
    relative: (gameAddress: string) => `battleship/game/${gameAddress}`
  }
}