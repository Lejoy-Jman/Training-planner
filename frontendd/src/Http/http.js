import axios from 'axios'


const Localhost =axios.create({
    baseURL:`http://localhost:${process.env.REACT_APP_PORTSERVER}/`
})

export default Localhost;