import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPass:''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  const {name, email, password, confirmPass} = formData
  
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset)
  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  
  const onSubmit = (e)=>{
    e.preventDefault()
    if (password !== confirmPass){
      toast.error('Passwords do not match')
    }else{
      const userData = {
        name, email, password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }
  return <> 

    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>Create Account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="name" name="name" value={name} placeholder="enter name" onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="email" name="email" value={email} placeholder="enter email" onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="password" name="password" value={password} placeholder="enter password" onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="confirmPass" name="confirmPass" value={confirmPass} placeholder="confirm password" onChange={onChange}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="button" >Register</button>
        </div>
        
      </form>
    </section>
  
  </>
}

export default Register