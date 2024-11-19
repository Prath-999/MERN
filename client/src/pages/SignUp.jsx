import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formdata, setFormData]=useState({});
  const [errorMessage, setErrorMessage]=useState(null);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setFormData({...formdata, [e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formdata.username || !formdata.email || !formdata.password){
      return setErrorMessage("Please fill out all fields!")
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(formdata),
      })
      const data=await res.json();
      if(data.success === false){
        setLoading(false)
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/sign-in');
      }
    } catch(error){
      setErrorMessage(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen mt-50'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*left side of signup page*/}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600
              rounded-lg text-white'>Campus
            </span>
            Connect
          </Link>
          <p className='text-sm mt-5'>Hello. Welcome to CampusConnect!!!</p>
          <p className='text-sm'>You can sign up with your email and password.</p>
        </div>
        {/*right side of signup page*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label className='font-bold' value='Your username'></Label>
              <TextInput type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              />
            </div>
            <div>
              <Label className='font-bold' value='Your email'></Label>
              <TextInput type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              />
            </div>
            <div>
              <Label className='font-bold' value='Your password'></Label>
              <TextInput type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'></Spinner>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>
              Have an account?
            </span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
