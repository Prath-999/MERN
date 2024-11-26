import React from 'react'
import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsVoicemail } from 'react-icons/bs'
export default function FooterCom() {
  return (
    <Footer container className='border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-3 mb-5'>
                <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl
                font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-lg text-white'>
                        Campus
                    </span>
                    Connect
                </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:mb-4 sm:grid-cols-3 sm:gap-4'>
              <div>
              <Footer.Title title='About'></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link
                </Footer.Link>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link
                </Footer.Link>
              </Footer.LinkGroup> 
              </div>
              <div>
              <Footer.Title title='Follow us'></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link
                </Footer.Link>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link
                </Footer.Link>
              </Footer.LinkGroup> 
              </div>
              <div>
              <Footer.Title title='Legal'></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link
                </Footer.Link>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link
                </Footer.Link>
              </Footer.LinkGroup> 
              </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by='Prathmesh Abhang' year={new Date().getFullYear()}/>
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='#' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsVoicemail}/>
          </div>
        </div>
      </div>
    </Footer>
  )
}
