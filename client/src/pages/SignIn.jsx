import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formdata, setFormData]=useState({});
  const {loading, error:errorMessage}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setFormData({...formdata, [e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return dispatch(signInFailure('Email and password are required.'));
    }
    if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      return dispatch(signInFailure('Please enter a valid email.'));
    }   
    dispatch(signInStart());   
    try{
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(formdata),
      })
      const data=await res.json();
      // console.log('Response Status:', res.status); // Check HTTP status code
      // console.log('Response Data:', data); 
      // console.log(data.success)
      if (!res.ok) {
        if (res.status === 401 || res.status === 400) {
          return dispatch(signInFailure(data?.message || 'Invalid email or password.'));
        }
        return dispatch(signInFailure('Enter correct email or password'));
      }      
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch(error){
      dispatch(signInFailure(error?.message || 'An unexpected error occurred!'));
    }
  }
  return (
    <div className='min-h-screen mt-50'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*left side of signIn page*/}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600
              rounded-lg text-white'>Campus
            </span>
            Connect
          </Link>
          <p className='text-sm mt-5'>Hello. Welcome to CampusConnect!!!</p>
          <p className='text-sm'>You can sign in with your email and password.</p>
        </div>
        {/*right side of signIn page*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
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
              placeholder='**********'
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
                ) : 'Sign In'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>
              Don't have an account?
            </span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
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
