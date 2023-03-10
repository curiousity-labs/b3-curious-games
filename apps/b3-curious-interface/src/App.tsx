import { Grid, GridItem } from '@chakra-ui/react'
import { Pages } from './pages'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Grid templateRows="4rem minmax(calc(100vh - 7rem), 1fr) 3rem" maxW="6xl" mx="auto">
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <Pages />
      </GridItem>
      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  )
}

export default App
