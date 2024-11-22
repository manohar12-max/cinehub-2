"use client"
import { Search } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const router=useRouter()
  const [search, setSearch] = useState<string>("");
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [isScrolled,setIsScrolled] = useState<boolean>(false)
  const handleScroll=()=>{
    if(window.scrollY>10){
        setIsScrolled(true)
    }else{
        setIsScrolled(false)
    }
  }
  
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])
const handleLogout=()=>{
  signOut({callbackUrl:"/login"})
}
  return (
    <div className={`navbar ${isScrolled && "bg-black-1"}`} >
      <Link href="/">
        <img src="/images/logo.png" alt="logo" className="logo" />
      </Link>
      <div className="nav-links">
        <Link className="nav-link" href="/">
          Home
        </Link>
        <Link className="nav-link" href="/my-list">
          My List
        </Link>
      </div>
      <div className="nav-right">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="input-search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button disabled={search==""} >
          <Search className="icon" onClick={()=>{router.push(`/search/${search}`)}} />
          </button>
        </div>
        <img
          src="/images/profile_icon.jpg"
          className="profile"
          alt="profile"
          onClick={() => {
            setDropdownMenu(!dropdownMenu);
          }}
        />
        {
            dropdownMenu && (
              <div className="dropdown-menu">
                <Link className="" href="/">
                  Home
                </Link>
                <Link className="" href="/my-list">
                  My List
                </Link>
                <a onClick={handleLogout} className="" >
                  Logout
                </a>
              </div>
            )

  
        }
      </div>
    </div>
  );
};

export default Navbar;
