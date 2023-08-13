// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Explore Gyms'
    },
    {
      title: 'Explore Clubs',
      icon: AccountPlusOutline,
      path: '/near-gyms'
    },
    {
      sectionTitle: 'Subscriptions Mgmt'
    },
    {
      title: 'My Subscriptions',
      icon: AlertCircleOutline,
      path: '/user-subscriptions',
    },
    {
      title: 'Trade Subscriptions',
      icon: AlertCircleOutline,
      path: '#',
    },
    {
      sectionTitle: 'Help & Support'
    },
    {
      title: 'Contact Us',
      icon: FormatLetterCase,
      path: '#'
    },
    {
      title: 'Developer',
      path: '#',
      icon: GoogleCirclesExtended
    },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
