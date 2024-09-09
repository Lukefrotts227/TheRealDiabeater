"use client"; 

import { signOut } from 'next-auth/react'; 



const SignOut: React.FC = () =>{
    return(
        <button onClick={() => signOut({ callbackUrl: '/' })}>
            Sign Out
        </button> 
    ); 
}
export default SignOut