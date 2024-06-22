import { Link } from 'react-router-dom';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './index.css';
import { useAuth } from './hooks/useAuth.tsx'; // useAuth 훅 import
import { User } from 'firebase/auth';

const navigation = [
  { name: '진헹중인 베팅', href: '/bettinglist', current: false },
  { name: '종료된 베팅', href: '/bettinglist?sort=ended', current: false },
  { name: '베팅 만들기', href: '/create', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const { user, signIn, signOutUser } = useAuth(); // useAuth 훅 사용
  
  console.log(user);

  return (
    <Disclosure as="nav" className="bg-background-black-950 relative">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-primary-green-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="font-['Music-Vibes'] text-2xl tracking-tight text-primary-green-300">
                    Go-or-Ani
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                            item.name === '베팅 만들기'
                            ? 'text-primary-purple-600 hover:bg-gray-700 hover:text-white'
                            : 'text-primary-green-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        reloadDocument
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <>
                    <Link to={`/profile/${(user as User).uid}`} className="text-primary-green-300 hover:text-green-500 mr-4">
                      초치 님
                    </Link>
                    <button
                      onClick={signOutUser}
                      className="text-primary-green-300 hover:text-green-500"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button
                    onClick={signIn}
                    className="text-primary-green-300 hover:text-green-500"
                  >
                    구글로 로그인하기
                  </button>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.name === '베팅 만들기'
                    ? 'text-primary-purple-600 hover:bg-gray-700 hover:text-white'
                    : 'text-primary-green-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <div className="mt-3">
              {user ? (
                <>
                  <Link
                    to={`/profile/${(user as User).uid}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-green-300 hover:text-white hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={signOutUser}
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-green-300 hover:text-white hover:bg-gray-700 w-full text-left"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <button
                  onClick={signIn}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-green-300 hover:text-white hover:bg-gray-700 w-full text-left"
                >
                  구글로 로그인하기
                </button>
              )}
            </div>
            </div>
          </DisclosurePanel>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-line" />
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;