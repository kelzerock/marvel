import spinnerImg from '../../resources/img/1496.gif'

const Spinner = () => {
  return  (
    <div style={{width: '100%', display: "flex", justifyContent: "center", alignItems: "center"}}>
    
    <img src={spinnerImg} style={{margin: "10px auto"}} alt='spinner image'/>
    </div>
  )
}

export default Spinner;